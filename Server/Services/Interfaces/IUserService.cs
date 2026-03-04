using Server.Dtos;
using Server.Models;

namespace Server.Services.Interfaces
{
    public interface IUserService
    {
        Task<int> GetFollowerCount(Guid userId);
        Task<int> GetFollowingCount(Guid userId);
        Task<int> GetPostCount(Guid userId);
        Task<bool> IsFollowing(Guid profileUserId, Guid authUserId);
        Task<List<Guid>> GetFollowingList(Guid userId);
        Task<UserDto?> GetUserDto(Guid userId, Guid? authUserId);
        Task<Follow?> FollowUser(Guid authUserId, Guid userId);
        Task<Follow?> UnfollowUser(Guid authUserId, Guid userId);
        Task<bool> UserExists(Guid userId);
        Task<ApplicationUser?> GetUserByUsername(string username);
        Task<List<UserDto>> GetByUsernameQuery(string query);
        Task<UserDto?> GetStranger(Guid userId);
    }
}