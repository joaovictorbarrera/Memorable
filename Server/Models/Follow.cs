namespace Server.Models
{
    public class Follow
    {
        public required Guid FollowerId { get; set; }
        public required Guid FollowingId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
