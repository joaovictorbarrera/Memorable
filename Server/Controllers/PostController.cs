using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Server.Dtos;
using Server.Extensions;
using Server.Models;
using Server.Services;
using Server.Services.ImageUpload;
using Server.Services.Posts;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController : Controller
    {
        private readonly ILogger<PostController> _logger;
        public PostController(ILogger<PostController> logger)
        {
            _logger = logger;
        }

        [HttpPost("PostCreate")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create(
            [FromForm] PostCreateDto body,
            [FromServices] IImageUploadService imgBb)
        {
            try
            {
                if (body.Image == null && string.IsNullOrWhiteSpace(body.TextContent))
                {
                    return BadRequest("Post content is required");
                }

                string? imageUrl = null;

                if (body.Image != null)
                {
                    imageUrl = await imgBb.UploadAsync(body.Image);
                }

                Guid userId = HttpContext.GetUserId();

                Post post = new()
                {
                    UserId = userId,
                    TextContent = body.TextContent,
                    CreatedAt = DateTime.UtcNow,
                    ImageUrl = imageUrl
                };

                Mockdata._posts.Add(post);

                PostDto postDto = PostService.GetPostDto(post.PostId);

                return Ok(postDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating post");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("PostGetFeed")]
        public IActionResult GetFeed([FromQuery] int pageSize, [FromQuery] int pageNumber)
        {
            if (pageSize <= 0) return BadRequest();

            List<Post> pagedPosts = Mockdata._posts
                .OrderByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            List<PostDto> postDtos = pagedPosts.Select(p => PostService.GetPostDto(p.PostId)).ToList();

            return Ok(postDtos);
        }

        [HttpGet("PostGetById")]
        public IActionResult GetById([FromQuery] Guid postId)
        {
            Post? post = Mockdata._posts.FirstOrDefault(p => p.PostId == postId);
            if (post == null)
            {
                return NotFound("Post not found");
            }

            PostDto postDto = PostService.GetPostDto(post.PostId);

            return Ok(postDto);
        }

        [HttpDelete("PostDelete")]
        public IActionResult Delete([FromQuery] Guid postId)
        {
            var post = Mockdata._posts.FirstOrDefault(p => p.PostId == postId);
            if (post == null)
            {
                return NotFound("Post not found");
            }
            Mockdata._posts.Remove(post);
            Mockdata._comments.RemoveAll(c => c.PostId == postId);
            Mockdata._likes.RemoveAll(l => l.PostId == postId);

            return Ok(new
            {
                message = "Post deleted successfully"
            });
        }

        [HttpPut("PostUpdate")]
        public IActionResult Update([FromBody] PostDto updatedPost)
        {
            if (updatedPost == null)
            {
                return BadRequest("Invalid Input. Try again");
            }
            var existingPost = Mockdata._posts.FirstOrDefault(p => p.PostId == updatedPost.PostId);
            if (existingPost == null)
            {
                return NotFound("Post not found");
            }
            existingPost.TextContent = updatedPost.TextContent;
            existingPost.ImageUrl = updatedPost.ImageUrl;

            PostDto postDto = PostService.GetPostDto(existingPost.PostId);

            return Ok(postDto);
            
        }
    }
}
