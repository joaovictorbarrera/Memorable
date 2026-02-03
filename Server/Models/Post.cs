using Server.Services;

namespace Server.Models
{
    public class Post
    {
        public int PostId { get; set; } = Mockdata._posts.Count + 1;
        public string TextContent { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; } = 1;
        public string? ImageUrl { get; set; }
    }
}