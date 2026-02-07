using Server.Services;

namespace Server.Models
{
    public class Post
    {
        public Guid PostId { get; set; } = Guid.NewGuid();
        public String? TextContent { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid UserId { get; set; }
        public string? ImageUrl { get; set; }
    }
}