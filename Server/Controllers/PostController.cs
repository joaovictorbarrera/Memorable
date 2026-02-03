using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Models;
using Server.Services;

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
        public IActionResult Create([FromBody] PostCreateDto body)
        {
            if (body.TextContent == null || string.IsNullOrWhiteSpace(body.TextContent))
            {
                return BadRequest("Post content is required");
            }

            int userId = 1; // Mocked user ID for demonstration

            Post post = new Post
            {
                UserId = userId,
                TextContent = body.TextContent,
                CreatedAt = DateTime.UtcNow,
                ImageUrl = body.ImageUrl
            };
         
            Mockdata._posts.Add(post);

            return Ok(new
            {
                message = "Post created successfully"
            });
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
        public IActionResult GetById([FromQuery] int postId)
        {
            if (postId <= 0) return BadRequest("PostId is required");

            Post? post = Mockdata._posts.FirstOrDefault(p => p.PostId == postId);
            if (post == null)
            {
                return NotFound("Post not found");
            }

            PostDto postDto = PostService.GetPostDto(post.PostId);

            return Ok(postDto);
        }

        [HttpDelete("PostDelete")]
        public IActionResult Delete([FromQuery] int postId)
        {
            if (postId <= 0) return BadRequest("PostId is required");
            var post = Mockdata._posts.FirstOrDefault(p => p.PostId == postId);
            if (post == null)
            {
                return NotFound("Post not found");
            }
            Mockdata._posts.Remove(post);
            return Ok(new
            {
                message = "Post deleted successfully"
            });
        }

        [HttpPut("PostUpdate")]
        public IActionResult Update([FromBody] Post updatedPost)
        {
            if (updatedPost == null || updatedPost.PostId <= 0)
            {
                return BadRequest("Valid PostId is required");
            }
            var existingPost = Mockdata._posts.FirstOrDefault(p => p.PostId == updatedPost.PostId);
            if (existingPost == null)
            {
                return NotFound("Post not found");
            }
            existingPost.TextContent = updatedPost.TextContent;
            existingPost.ImageUrl = updatedPost.ImageUrl;
            return Ok(new
            {
                message = "Post updated successfully"
            });
        }
    }
}
