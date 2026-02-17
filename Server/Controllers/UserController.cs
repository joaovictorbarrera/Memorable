using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Extensions;
using Server.Models;
using Server.Services;
using Server.Services.Posts;
using System.Security.Cryptography;

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

            Guid currentUserId = HttpContext.GetUserId();

            UserDto userDto = Service.GetUserDto(userId, currentUserId);

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

            Guid currentUserId = HttpContext.GetUserId();

            UserDto userDto = Service.GetUserDto(user.UserId, currentUserId);

            return Ok(userDto);
        }

        [HttpGet("UserGetByUsernameQuery")]
        public IActionResult GetByUsernameQuery([FromQuery] String query)
        {
            List<User> userSuggestions = Mockdata._users
                .OrderBy(p => p.Username.Length)
                .Where(p => p.Username.ToLower().Contains(query.ToLower()))
                .Take(5)
                .ToList();

            Guid currentUserId = HttpContext.GetUserId();

            List<UserDto> userDtos = userSuggestions
                .Select(u => Service.GetUserDto(u.UserId, currentUserId))
                .ToList();

            return Ok(userDtos);
        }

        [HttpGet("UserGetRandom")]
        public IActionResult GetRandom()
        {
            if (Mockdata._users == null || !Mockdata._users.Any())
                return NotFound("No users available.");

            Guid currentUserId = HttpContext.GetUserId();

            Guid randomUserId = Guid.Empty;

            do
            {
                var random = new Random();
                int index = random.Next(Mockdata._users.Count);

                randomUserId = Mockdata._users.ElementAt(index).UserId;
            } while (randomUserId == currentUserId);

            UserDto randomUserDto = Service.GetUserDto(randomUserId, currentUserId);

            return Ok(randomUserDto);
        }
    }
}