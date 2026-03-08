using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Helpers;
using Server.Models;
using Server.Models.Server.Models;
using Server.Services;
using Server.Services.ImageUpload;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController(
        IUserService _userService,
        UserManager<ApplicationUser> _userManager,
        SignInManager<ApplicationUser> _signInManager,
        TokenService _tokenService,
        IImageUploadService _imgBb)
        : Controller
    {

        [Authorize]
        [HttpGet("AuthUserGet")]
        public async Task<IActionResult> GetForAuth()
        {
            ApplicationUser? user = await _userManager.GetUserAsync(User);
            Console.WriteLine(user);

            if (user == null) return BadRequest(ModelState);

            UserDto? userDto = await _userService.GetUserDto(user.Id, null);
            if (userDto == null) return BadRequest("Could not get user details");

            return Ok(userDto);
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
            var user = await _userManager.GetUserAsync(User);
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] LoginDto loginInfo)
        {
            ApplicationUser? user = await _userManager.FindByEmailAsync(loginInfo.Username);

            if (user == null)
                user = await _userManager.FindByNameAsync(loginInfo.Username);

            if (user == null)
                return Unauthorized();

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginInfo.Password, false);

            if (!result.Succeeded)
                return Unauthorized();

            IList<string> roles = await _userManager.GetRolesAsync(user);

            string accessToken = _tokenService.CreateToken(user, roles);

            var refreshToken = _tokenService.GenerateRefreshToken(Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown");

            user.RefreshTokens.Add(refreshToken);

            await _userManager.UpdateAsync(user);

            return Ok(new
            {
                accessToken,
                refreshToken = refreshToken.Token
            });
        }

        [HttpPost("register")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Register([FromForm] RegisterDto registerDto)
        {
            ApplicationUser? existingEmail = await _userManager.FindByEmailAsync(registerDto.Email);
            if (existingEmail != null)
                return BadRequest(new { errors = new[] { "Email is already taken." } });

            ApplicationUser? existingUsername = await _userManager.FindByNameAsync(registerDto.Username);
            if (existingUsername != null)
                return BadRequest(new { errors = new[] { "Username is already taken." } });

            string profileImageUrl = await _imgBb.UploadAsync(registerDto.ProfileImage);

            List<string> validationErrors = AuthHelper.ValidateRegistration(registerDto);
            if (validationErrors.Count != 0) return BadRequest(new { errors = validationErrors });

            ApplicationUser user = new()
            {
                Email = registerDto.Email,
                UserName = registerDto.Username,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                ProfileImageUrl = profileImageUrl,
                DisplayName = $"{registerDto.FirstName} {registerDto.LastName}"
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            // add default role
            await _userManager.AddToRoleAsync(user, "User");

            return Ok();
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequestDto request)
        {
            ApplicationUser? user = _tokenService.GetUserFromRefreshToken(request.RefreshToken);

            if (user == null)
                return Unauthorized();

            RefreshToken refreshToken = user.RefreshTokens.Single(x => x.Token == request.RefreshToken);

            if (!refreshToken.IsActive)
                return Unauthorized();

            RefreshToken newRefreshToken = _tokenService.GenerateRefreshToken(
                Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown"
            );

            user.RefreshTokens.Add(newRefreshToken);

            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = HttpContext.Connection.RemoteIpAddress?.ToString();
            refreshToken.ReplacedByToken = newRefreshToken.Token;

            await _userManager.UpdateAsync(user);

            IList<string> roles = await _userManager.GetRolesAsync(user);

            string newAccessToken = _tokenService.CreateToken(user, roles);

            return Ok(new
            {
                accessToken = newAccessToken,
                refreshToken = newRefreshToken.Token
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            // Do not reveal if email exists
            if (user == null)
                return Ok(new { message = "Password reset link generated." });

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var encodedToken = Uri.EscapeDataString(token);

            var resetLink =
                $"http://localhost:4200/reset-password?email={dto.Email}&resetToken={encodedToken}";

            // TODO: Send Email
            Console.WriteLine(resetLink);

            return Ok(new { message = "Password reset link generated." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromForm] ResetPasswordRequestDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
                return BadRequest("Invalid request");

            var decodedToken = Uri.UnescapeDataString(dto.Token);

            var result = await _userManager.ResetPasswordAsync(
                user,
                decodedToken,
                dto.Password
            );

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            user.RefreshTokens.ToList().ForEach(t => t.Revoked = DateTime.UtcNow);
            await _userManager.UpdateAsync(user);

            return Ok(new { message = "Password reset successful" });
        }
    }
}