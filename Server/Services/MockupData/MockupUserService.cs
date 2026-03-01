using Server.Dtos;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services.MockupData
{
    public class MockupUserService : IUserService
    {
        public async Task<int> GetFollowerCount(Guid userId)
        {
            return await Task.FromResult(Mockdata._follows.Count(f => f.FollowingId == userId));
        }

        public async Task<int> GetFollowingCount(Guid userId)
        {
            return await Task.FromResult(Mockdata._follows.Count(f => f.FollowerId == userId));
        }

        public async Task<int> GetPostCount(Guid userId)
        {
            return await Task.FromResult(Mockdata._posts.Count(p => p.UserId == userId));
        }

        public async Task<bool> IsFollowing(Guid profileUserId, Guid authUserId)
        {
            return await Task.FromResult(Mockdata._follows.Any(f => f.FollowerId == authUserId && f.FollowingId == profileUserId));
        }

        public async Task<List<Guid>> GetFollowingList(Guid userId)
        {
            List<Guid> followingList = Mockdata._follows
                .Where(f => f.FollowerId == userId)
                .Select(f => f.FollowingId)
                .ToList();

            return await Task.FromResult(followingList);
        }

        public async Task<UserDto?> GetUserDto(Guid userId, Guid? authUserId)
        {
            User? user = Mockdata._users.FirstOrDefault(u => u.UserId.Equals(userId));
            if (user == null) return await Task.FromResult<UserDto?>(null);

            string displayName = $"{user.FirstName} {user.LastName}";

            UserDto userDto = new UserDto
            {
                UserId = user.UserId,
                DisplayName = displayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfileImageUrl = user.ProfileImageUrl,
                Username = user.Username,
                UserEmail = user.UserEmail,
                CreatedAt = user.CreatedAt,
                PostCount = await GetPostCount(user.UserId),
                FollowerCount = await GetFollowerCount(user.UserId),
                FollowingCount = await GetFollowingCount(user.UserId),
                IsFollowedByCurrentUser = authUserId.HasValue
                    ? await IsFollowing(user.UserId, authUserId.Value)
                    : false
            };

            return await Task.FromResult(userDto);
        }

        public async Task<Follow?> FollowUser(Guid authUserId, Guid userId)
        {
            Follow follow = new Follow
            {
                FollowerId = authUserId,
                FollowingId = userId
            };

            Mockdata._follows.Add(follow);
            return await Task.FromResult(follow);
        }

        public async Task<Follow?> UnfollowUser(Guid authUserId, Guid userId)
        {
            Follow? follow = Mockdata._follows
                .FirstOrDefault(f => f.FollowerId == authUserId && f.FollowingId == userId);

            if (follow == null) return await Task.FromResult<Follow?>(null);

            Mockdata._follows.Remove(follow);
            return await Task.FromResult(follow);
        }

        public async Task<bool> UserExists(Guid userId)
        {
            return await Task.FromResult(Mockdata._users.Any(u => u.UserId.Equals(userId)));
        }

        public async Task<User?> GetUserByUsername(string username)
        {
            User? user = Mockdata._users.FirstOrDefault(u => u.Username.Equals(username));
            return await Task.FromResult(user);
        }

        public async Task<List<UserDto>> GetByUsernameQuery(string query)
        {
            List<User> users = Mockdata._users
                .Where(u => u.Username.ToLower().Contains(query.ToLower()))
                .OrderBy(u => u.Username.Length)
                .Take(5)
                .ToList();

            List<UserDto> result = new List<UserDto>();
            foreach (User user in users)
            {
                UserDto? dto = await GetUserDto(user.UserId, null);
                if (dto != null) result.Add(dto);
            }

            return await Task.FromResult(result);
        }

        public async Task<UserDto?> GetStranger(Guid userId)
        {
            HashSet<Guid> followingSet = new HashSet<Guid>(await GetFollowingList(userId));

            List<Guid> candidates = Mockdata._users
                .Where(u => u.UserId != userId && !followingSet.Contains(u.UserId))
                .Select(u => u.UserId)
                .ToList();

            if (candidates.Count == 0) return await Task.FromResult<UserDto?>(null);

            Guid randomUserId = candidates[Random.Shared.Next(candidates.Count)];

            return await GetUserDto(randomUserId, userId);
        }
    }
}