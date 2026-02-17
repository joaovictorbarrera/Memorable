namespace Server.Dtos
{
    public class UserDto
    {
        public Guid UserId { get; set; }
        public required string DisplayName { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string ProfileImageUrl { get; set; }
        public required string Username { get; set; }
        public required string UserEmail { get; set; }
        public required DateTime CreatedAt { get; set; }
    }
}
