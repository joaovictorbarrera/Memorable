using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Extensions;
using Server.Models;
using Server.Services.Data.Mockup;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FollowController(ILogger<FollowController> _logger, IUserService _userService) : ControllerBase
    {
        private readonly ILogger<FollowController> _logger = _logger;
        private readonly IUserService _userService = _userService;

        [HttpPost("FollowCreate")]
        public async Task<IActionResult> Follow([FromQuery] Guid userId)
        {
            if (userId == Guid.Empty) return BadRequest("Invalid UserId");

            Guid authUserId = HttpContext.GetUserId();

            if (await _userService.IsFollowing(userId, authUserId)) return BadRequest("User is already followed by logged-in user");

            Follow? follow = await _userService.FollowUser(authUserId, userId);

            if (follow == null) return BadRequest("User could not be followed");

            return Ok(follow);
        }

        [HttpDelete("FollowDelete")]
        public async Task<IActionResult> Unfollow([FromQuery] Guid userId)
        {
            if (userId == Guid.Empty) return BadRequest("Invalid UserId");

            Guid authUserId = HttpContext.GetUserId();

            if (!await _userService.IsFollowing(userId, authUserId)) return BadRequest("You already not following this user");

            Follow? follow = await _userService.UnfollowUser(authUserId, userId);

            if (follow == null)
                return NotFound("User could not be unfollowed");

            return Ok(follow);
        }
    }
}
