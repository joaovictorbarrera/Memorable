using Server.Models;

namespace Server.Helpers
{
    public class UserHelper
    {
        public static ApplicationUser LegacyUserToApplicationUser(User user)
        {
            return new ApplicationUser
            {
                UserName = user.Username,
                Email = user.UserEmail,
                PasswordHash = Guid.NewGuid().ToString(),
                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfileImageUrl = user.ProfileImageUrl,
                CreatedAt = user.CreatedAt,
                EmailConfirmed = true,
                Id = user.UserId
            };
        }
    }
}
