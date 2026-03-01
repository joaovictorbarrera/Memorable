using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Extensions;
using Server.Models;
using Server.Services.Data.Mockup;
using Server.Services.Interfaces;
using System.Security.Cryptography;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(ILogger<UserController> _logger, IUserService _userService) : Controller
    {
        private readonly ILogger<UserController> _logger = _logger;
        private readonly IUserService _userService = _userService;

        [HttpGet("UserGetById")]
        public async Task<IActionResult> GetById([FromQuery] Guid userId)
        {
            if (!await _userService.UserExists(userId))
            {
                return NotFound("User not found");
            }

            Guid authUserId = HttpContext.GetUserId();

            UserDto? userDto = await _userService.GetUserDto(userId, authUserId);

            if (userDto == null) return BadRequest("Could not get user details");

            return Ok(userDto);
        }

        [HttpGet("UserGetByUsername")]
        public async Task<IActionResult> GetByUsername([FromQuery] String username)
        {
            User? user = await _userService.GetUserByUsername(username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            Guid authUserId = HttpContext.GetUserId();

            UserDto? userDto = await _userService.GetUserDto(user.UserId, authUserId);

            if (userDto == null) return BadRequest("Could not get user details");

            return Ok(userDto);
        }

        [HttpGet("UserGetByUsernameQuery")]
        public async Task<IActionResult> GetByUsernameQuery([FromQuery] String query)
        {
            List<UserDto> userDtos = await _userService.GetByUsernameQuery(query);

            return Ok(userDtos);
        }

        [HttpGet("UserGetStranger")]
        public async Task<IActionResult> GetRandom()
        {
            Guid authUserId = HttpContext.GetUserId();

            UserDto? strangerDto = await _userService.GetStranger(authUserId);
            if (strangerDto == null) return NotFound("None available");

            return Ok(strangerDto);
        }
    }
}