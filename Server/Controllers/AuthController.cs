using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Models;
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

            if (user == null) user = await _userManager.FindByNameAsync(loginInfo.Username);

            if (user == null)
                return Unauthorized();

            var result = await _signInManager
                    .CheckPasswordSignInAsync(user, loginInfo.Password, false);

            if (!result.Succeeded)
                return Unauthorized();

            IList<string> roles = await _userManager.GetRolesAsync(user);

            string token = _tokenService.CreateToken(user, roles);

            return Ok(new { token });
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
    }
}