using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Extensions;
using Server.Models;
using Server.Services;
using Server.Services.Posts;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly ILogger<AuthController> _logger;
        public AuthController(ILogger<AuthController> logger)
        {
            _logger = logger;
        }

        [HttpGet("AuthUserGet")]
        public IActionResult GetByAuth()
        {
            Guid userId = HttpContext.GetUserId();
            User? user = Mockdata._users.FirstOrDefault(p => p.UserId.Equals(userId));
            if (user == null)
            {
                return NotFound("User not found");
            }

            UserDto userDto = Service.GetUserDto(userId);

            return Ok(userDto);
        }
    }
}