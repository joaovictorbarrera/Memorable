using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Server.Dtos;
using Server.Extensions;
using Server.Models;
using Server.Services.Data.Mockup;
using Server.Services.ImageUpload;
using Server.Services.Interfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostController(ILogger<PostController> logger, IPostService _postService) : Controller
    {
        private readonly ILogger<PostController> _logger = logger;
        private readonly IPostService _postService = _postService;

        [HttpPost("PostCreate")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create(
            [FromForm] PostCreateDto body,
            [FromServices] IImageUploadService imgBb)
        {
            
            if (body.Image == null && string.IsNullOrWhiteSpace(body.TextContent))
            {
                return BadRequest("Post content is required");
            }

            if (body.TextContent?.Length > 500)
            {
                return BadRequest("Text content exceeds maximum length of 500 characters");
            }

            string? imageUrl = null;

            if (body.Image != null)
            {
                imageUrl = await imgBb.UploadAsync(body.Image);
            }

            Guid authUserId = HttpContext.GetUserId();

            Post? post = await _postService.CreatePost(body, authUserId, imageUrl);

            if (post == null) return BadRequest("Post could not be created");

            PostDto? postDto = await _postService.GetPostDtoById(post.PostId, authUserId);

            if (postDto == null) return BadRequest("Could not get new post details");

            return Ok(postDto);
        }

        [HttpGet("PostGetFeed")]
        public async Task<IActionResult> GetFeed([FromQuery] int pageSize, [FromQuery] int pageNumber)
        {
            if (pageSize <= 0 || pageNumber <= 0)
                return BadRequest("Invalid pagination parameters");

            Guid authUserId = HttpContext.GetUserId();

            List<PostDto> feed = await _postService.GetFeed(pageSize, pageNumber, authUserId);

            return Ok(feed);
        }

        [HttpGet("PostGetById")]
        public async Task<IActionResult> GetById([FromQuery] Guid postId)
        {
            if (postId == Guid.Empty) return BadRequest("Invalid PostId");

            Guid authUserId = HttpContext.GetUserId();

            PostDto? postDto = await _postService.GetPostDtoById(postId, authUserId);

            if (postDto == null) return BadRequest("Post Not Found");

            return Ok(postDto);
        }

        [HttpDelete("PostDelete")]
        public async Task<IActionResult> Delete([FromQuery] Guid postId)
        {
            if (postId == Guid.Empty) return BadRequest("Invalid PostId");

            if (!await _postService.PostExists(postId))
            {
                return NotFound("Post not found");
            }

            Guid authUserId = HttpContext.GetUserId();

            if (!await _postService.PostBelongsToUser(postId, authUserId))
            {
                return Forbid("You can only delete your own posts");
            }

            Post? postRemoved = await _postService.RemovePost(postId);
            if (postRemoved == null) return BadRequest("Post could not be removed");

            return Ok(postRemoved);
        }

        [HttpPut("PostUpdate")]
        public async Task<IActionResult> Update([FromBody] PostDto updatedPostDetails)
        {
            if (updatedPostDetails == null)
            {
                return BadRequest("Invalid Input. Try again");
            }

            if (!await _postService.PostExists(updatedPostDetails.PostId))
            {
                return NotFound("Post not found");
            }

            Guid authUserId = HttpContext.GetUserId();

            if (!await _postService.PostBelongsToUser(updatedPostDetails.PostId, authUserId))
            {
                return Forbid("You can only update your own posts");
            }

            Post? updatedPost = await _postService.UpdatePost(updatedPostDetails);

            if (updatedPost == null) return BadRequest("Post could not be updated");

            PostDto? updatedPostDto = await _postService.GetPostDtoById(updatedPost.PostId, authUserId);

            if (updatedPostDto == null) return BadRequest("Could not get post details");

            return Ok(updatedPostDto);
        }

        [HttpGet("PostGetForProfile")]
        public async Task<IActionResult> GetForProfile(
            [FromQuery] Guid userId,
            [FromQuery] int pageSize,
            [FromQuery] int pageNumber)
        {
            if (userId == Guid.Empty)
                return BadRequest("Invalid userId");

            if (pageSize <= 0 || pageNumber <= 0)
                return BadRequest("Invalid pagination parameters");

            List<PostDto> postDtos = await _postService.GetProfilePosts(pageSize, pageNumber, userId);

            return Ok(postDtos);
        }

    }
}
