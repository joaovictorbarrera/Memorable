using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Models;
using Server.Services;
using Server.Services.Posts;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;
        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet("UserGetById")]
        public IActionResult GetById([FromQuery] Guid userId)
        {
            User? user = Mockdata._users.FirstOrDefault(p => p.UserId.Equals(userId));
            if (user == null)
            {
                return NotFound("User not found");
            }

            UserDto userDto = Service.GetUserDto(userId);

            return Ok(userDto);
        }

        [HttpGet("UserGetByUsername")]
        public IActionResult GetByUsername([FromQuery] String username)
        {
            User? user = Mockdata._users.FirstOrDefault(p => p.Username.Equals(username));
            if (user == null)
            {
                return NotFound("User not found");
            }

            UserDto userDto = Service.GetUserDto(user.UserId);

            return Ok(userDto);
        }
    }
}