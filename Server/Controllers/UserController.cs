using Microsoft.AspNetCore.Mvc;
using Server.Extensions;
using Server.Models;
using Server.Services;

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

        [HttpGet("AuthUserGet")]
        public IActionResult GetByAuth()
        {
            Guid userId = HttpContext.GetUserId();
            User? user = Mockdata._users.FirstOrDefault(p => p.UserId.Equals(userId));
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }
            return Ok(user);
        }

        [HttpGet("UserGetById")]
        public IActionResult GetById([FromQuery] Guid userId)
        {
            User? user = Mockdata._users.FirstOrDefault(p => p.UserId.Equals(userId));
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }
    }
}