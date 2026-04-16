using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Extensions;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [Authorize]
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

        [HttpGet("FollowersGetByUserId")]
        public async Task<IActionResult> FollowersGetByUserId([FromQuery] Guid userId)
        {
            if (userId == Guid.Empty) return BadRequest("Invalid UserId");

            if (!await _userService.UserExists(userId))
                return NotFound("User not found");

            Guid authUserId = HttpContext.GetUserId();

            List<UserDto> followers = await _userService.GetFollowersByUserId(userId, authUserId);

            return Ok(followers);
        }

        [HttpGet("FollowingGetByUserId")]
        public async Task<IActionResult> FollowingGetByUserId([FromQuery] Guid userId)
        {
            if (userId == Guid.Empty) return BadRequest("Invalid UserId");

            if (!await _userService.UserExists(userId))
                return NotFound("User not found");

            Guid authUserId = HttpContext.GetUserId();

            List<UserDto> following = await _userService.GetFollowingByUserId(userId, authUserId);

            return Ok(following);
        }
    }
}
