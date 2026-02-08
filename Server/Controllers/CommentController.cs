using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Extensions;
using Server.Models;
using Server.Services;
using Server.Services.Posts;

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        [HttpPost("CommentCreate")]
        public IActionResult CreateComment([FromBody] CommentCreateDto body)
        {
            if (body.TextContent.Trim().Length <= 0) return BadRequest("Cannot post empty comment");

            Guid userId = HttpContext.GetUserId();

            Comment comment = new Comment
            {
                UserId = userId,
                PostId = body.PostId,
                TextContent = body.TextContent,
                CreatedAt = DateTime.UtcNow
            };

            Mockdata._comments.Add(comment);

            CommentDto commentDto = PostService.GetCommentDto(comment.CommentId);

            return Ok(commentDto);
        }

        [HttpDelete("CommentDelete")]
        public IActionResult DeleteComment([FromQuery] Guid commentId)
        {
            Comment? comment = Mockdata._comments.FirstOrDefault(c => c.CommentId == commentId);

            if (comment == null) return NotFound("Comment Not Found");

            Guid userId = HttpContext.GetUserId();

            if (comment.CommentId != userId)
            {
                return Unauthorized("You can only delete your own comments");
            }

            Mockdata._comments.Remove(comment);

            return Ok(comment);
        }
    }
}
