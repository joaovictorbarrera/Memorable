using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Extensions;
using Server.Models;
using Server.Services.Data.Mockup;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class CommentController(
        ILogger<CommentController> _logger, 
        IPostService _postService,
        IInteractionService _interactionService
        ) : ControllerBase
    {
        private readonly ILogger<CommentController> _logger = _logger;
        private readonly IPostService _postService = _postService;
        private readonly IInteractionService _interactionService = _interactionService;


        [HttpPost("CommentCreate")]
        public async Task<IActionResult> CreateComment([FromBody] CommentCreateDto body)
        {
            if (body == null)
                return BadRequest("Invalid request body");

            if (string.IsNullOrWhiteSpace(body.TextContent))
                return BadRequest("Cannot post empty comment");

            if (body.TextContent.Length > 500)
                return BadRequest("Comment cannot exceed 500 characters");

            Guid authUserId = HttpContext.GetUserId();

            Comment? comment = await _interactionService.AddNewComment(body, authUserId);

            if (comment == null) return BadRequest("Comment could not be added");

            CommentDto? commentDto = await _interactionService.GetCommentDtoById(comment.CommentId);

            if (commentDto == null) return BadRequest("Could not get new comment details");

            return Ok(commentDto);
        }

        [HttpDelete("CommentDelete")]
        public async Task<IActionResult> DeleteComment([FromQuery] Guid commentId)
        {
            if (commentId == Guid.Empty) return BadRequest("Invalid CommentId");

            Guid authUserId = HttpContext.GetUserId();

            if (!await _interactionService.CommentExists(commentId))
            {
                return NotFound("Comment Not Found");
            }

            if (!await _interactionService.CommentBelongsToUser(commentId, authUserId))
            {
                return Forbid("You can only delete your own comments");
            }

            Comment? comment = await _interactionService.DeleteComment(commentId);

            if (comment == null) return BadRequest("Comment could not be deleted");

            return Ok(comment);
        }


        [HttpGet("CommentGetByPostId")]
        public async Task<IActionResult> GetByPostId(
        [FromQuery] Guid postId,
        [FromQuery] int skip,
        [FromQuery] int pageNumber,
        [FromQuery] int pageSize)
        {
            if (postId == Guid.Empty)
                return BadRequest("Invalid PostId");

            if (pageNumber <= 0 || pageSize <= 0)
                return BadRequest("Invalid pagination parameters");

            if (!await _postService.PostExists(postId))
                return NotFound("Post not found");

            List<CommentDto> commentDtos = await _postService.GetPostComments(postId, skip, pageSize, pageNumber);

            return Ok(commentDtos);
        }

    }
}
