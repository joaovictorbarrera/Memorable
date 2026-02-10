using Microsoft.AspNetCore.Mvc;
using Server.Extensions;
using Server.Models;
using Server.Services;
using Server.Dtos;

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly ILogger<LikeController> _logger;

        public LikeController(ILogger<LikeController> logger)
        {
            _logger = logger;
        }

        [HttpPost("LikeCreate")]
        public IActionResult CreateLike([FromBody] LikeCreateDto postLiked)
        {
            if (postLiked.PostId == Guid.Empty) return BadRequest("Invalid PostId");

            Guid userId = HttpContext.GetUserId();

            // Check if like already exists
            bool alreadyLiked = Mockdata._likes.Any(l =>
                l.PostId == postLiked.PostId &&
                l.UserId == userId
            );

            if (alreadyLiked)
                return BadRequest("User has already liked this post");

            Like like = new()
            {
                PostId = postLiked.PostId,
                UserId = userId
            };

            Mockdata._likes.Add(like);

            return Ok(like);
        }

        [HttpDelete("LikeDelete")]
        public IActionResult DeleteLike([FromQuery] Guid postId)
        {
            if (postId == Guid.Empty) return BadRequest("Invalid PostId");

            Guid userId = HttpContext.GetUserId();

            Like? like = Mockdata._likes.FirstOrDefault(l =>
                l.PostId == postId &&
                l.UserId == userId
            );

            if (like == null)
                return NotFound("Like not found");

            Mockdata._likes.Remove(like);

            return Ok(like);
        }
    }
}
