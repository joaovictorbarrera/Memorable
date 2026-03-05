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
                PasswordHash = "AQAAAAIAAYagAAAAELEzgOKjvnmOvPcKcwm1qALfhsE61+akiJbAM6dFFeBfD9+DPtqo87ghKdOwYxDa1Q==",
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
