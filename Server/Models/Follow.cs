namespace Server.Models
{
    public class Follow
    {
        public Guid FollowId { get; set; } = Guid.NewGuid();
        public required Guid FollowerId { get; set; }
        public required Guid FollowingId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
