namespace Server.Models
{
    public class User
    {
        public Guid UserId { get; set; } = Guid.NewGuid();
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string ProfileImageUrl { get; set; }
        public required string Username { get; set; }
        public required string UserEmail { get; set; }
        public required string Password { get; set; }

        public required string DisplayName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
