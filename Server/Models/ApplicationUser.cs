using Microsoft.AspNetCore.Identity;

namespace Server.Models;

public class ApplicationUser : IdentityUser<Guid>
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string DisplayName { get; set; }
    public required string ProfileImageUrl { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}