using Microsoft.AspNetCore.Mvc;
using Server.Extensions;
using Server.Models;
using Server.Services;
using Server.Dtos;

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FollowController : ControllerBase
    {
        private readonly ILogger<FollowController> _logger;

        public FollowController(ILogger<FollowController> logger)
        {
            _logger = logger;
        }

        [HttpPost("FollowCreate")]
        public IActionResult Follow([FromQuery] Guid userId)
        {
            if (userId == Guid.Empty) return BadRequest("Invalid PostId");

            Guid currentUserId = HttpContext.GetUserId();

            // Check if follow already exists
            bool alreadyFollows = Mockdata._follows.Any(l =>
                l.FollowerId == currentUserId &&
                l.FollowingId == userId
            );

            if (alreadyFollows) return BadRequest("User is already followed by logged-in user");

            Follow follow = new()
            {
                FollowerId = currentUserId,
                FollowingId = userId
            };

            Mockdata._follows.Add(follow);

            return Ok(follow);
        }

        [HttpDelete("FollowDelete")]
        public IActionResult Unfollow([FromQuery] Guid userId)
        {
            if (userId == Guid.Empty) return BadRequest("Invalid UserId");

            Guid currentUserId = HttpContext.GetUserId();

            // Check if follow exists
            Follow? follow = Mockdata._follows.FirstOrDefault(l =>
                l.FollowerId == currentUserId &&
                l.FollowingId == userId
            );

            if (follow == null)
                return NotFound("You are not following this user");

            Mockdata._follows.Remove(follow);

            return Ok(follow);
        }
    }
}
