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
    public class LikeController(ILogger<LikeController> _logger, IInteractionService _interactionService) : ControllerBase
    {
        private readonly ILogger<LikeController> _logger = _logger;
        private readonly IInteractionService _interactionService = _interactionService;

        [HttpPost("LikeCreate")]
        public async Task<IActionResult> CreateLike([FromBody] LikeCreateDto postLiked)
        {
            if (postLiked.PostId == Guid.Empty) return BadRequest("Invalid PostId");

            Guid authUserId = HttpContext.GetUserId();

            if (await _interactionService.IsLiking(authUserId, postLiked.PostId))
            {
                return BadRequest("User has already liked this post");
            }
   
            Like? like = await _interactionService.AddNewLike(authUserId, postLiked.PostId);
            
            if (like == null) return BadRequest("Like could not be created");

            return Ok(like);
        }

        [HttpDelete("LikeDelete")]
        public async Task<IActionResult> DeleteLike([FromQuery] Guid postId)
        {
            if (postId == Guid.Empty) return BadRequest("Invalid PostId");

            Guid authUserId = HttpContext.GetUserId();

            if (!await _interactionService.IsLiking(authUserId, postId))
            {
                return BadRequest("User has not liked this post");
            }

            Like? like = await _interactionService.RemoveLike(authUserId, postId);

            if (like == null)
                return NotFound("Like could not be deleted");

            return Ok(like);
        }
    }
}
