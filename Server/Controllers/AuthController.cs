using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Extensions;
using Server.Models;
using Server.Services.Data.Mockup;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController(ILogger<AuthController> _logger, IUserService _userService) : Controller
    {
        private readonly ILogger<AuthController> _logger = _logger;
        private readonly IUserService _userService= _userService;

        [HttpGet("AuthUserGet")]
        public async Task<IActionResult> GetForAuth()
        {
            Guid authUserId = HttpContext.GetUserId();

            Console.WriteLine(authUserId);

            if (!await _userService.UserExists(authUserId))
            {
                return Unauthorized("User not found");
            }

            UserDto? userDto = await _userService.GetUserDto(authUserId, null);
            if (userDto == null) return BadRequest("Could not get user details");

            return Ok(userDto);
        }
    }
}