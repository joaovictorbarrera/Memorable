using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Models;
using Server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetFollowerCount(Guid userId)
        {
            return await _context.Follows.CountAsync(f => f.FollowingId == userId);
        }

        public async Task<int> GetFollowingCount(Guid userId)
        {
            return await _context.Follows.CountAsync(f => f.FollowerId == userId);
        }

        public async Task<int> GetPostCount(Guid userId)
        {
            return await _context.Posts.CountAsync(p => p.UserId == userId);
        }

        public async Task<bool> IsFollowing(Guid profileUserId, Guid authUserId)
        {
            return await _context.Follows.AnyAsync(f => f.FollowerId == authUserId && f.FollowingId == profileUserId);
        }

        public async Task<List<Guid>> GetFollowingList(Guid userId)
        {
            return await _context.Follows
                .Where(f => f.FollowerId == userId)
                .Select(f => f.FollowingId)
                .ToListAsync();
        }

        public async Task<UserDto?> GetUserDto(Guid userId, Guid? authUserId)
        {
            ApplicationUser? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return null;

            string displayName = $"{user.FirstName} {user.LastName}";

            UserDto userDto = new UserDto
            {
                UserId = user.Id,
                DisplayName = displayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfileImageUrl = user.ProfileImageUrl,
                Username = user.UserName ?? "Unknown",
                UserEmail = user.Email ?? "Unknown",
                CreatedAt = user.CreatedAt,
                PostCount = await GetPostCount(user.Id),
                FollowerCount = await GetFollowerCount(user.Id),
                FollowingCount = await GetFollowingCount(user.Id),
                IsFollowedByCurrentUser = authUserId.HasValue
                    ? await IsFollowing(user.Id, authUserId.Value)
                    : false
            };

            return userDto;
        }

        public async Task<Follow?> FollowUser(Guid authUserId, Guid userId)
        {
            Follow follow = new Follow
            {
                FollowerId = authUserId,
                FollowingId = userId
            };

            _context.Follows.Add(follow);
            await _context.SaveChangesAsync();

            return follow;
        }

        public async Task<Follow?> UnfollowUser(Guid authUserId, Guid userId)
        {
            Follow? follow = await _context.Follows
                .FirstOrDefaultAsync(f => f.FollowerId == authUserId && f.FollowingId == userId);

            if (follow == null) return null;

            _context.Follows.Remove(follow);
            await _context.SaveChangesAsync();

            return follow;
        }

        public async Task<bool> UserExists(Guid userId)
        {
            return await _context.Users.AnyAsync(u => u.Id == userId);
        }

        public async Task<ApplicationUser?> GetUserByUsername(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
        }

        public async Task<List<UserDto>> GetByUsernameQuery(string query)
        {
            string lowerQuery = query.ToLower();
            List<ApplicationUser> users = await _context.Users
                .Where(u => 
                    (u.UserName != null && EF.Functions.Like(u.UserName.ToLower(), $"%{lowerQuery}%")) ||
                    (u.FirstName != null && EF.Functions.Like(u.FirstName.ToLower(), $"%{lowerQuery}%")) ||
                    (u.LastName != null && EF.Functions.Like(u.LastName.ToLower(), $"%{lowerQuery}%"))
                )
                .OrderBy(u => u.UserName != null ? u.UserName.Length : 0)
                .Take(5)
                .ToListAsync();

            List<UserDto> result = [];

            foreach (ApplicationUser user in users)
            {
                UserDto? dto = await GetUserDto(user.Id, null);
                if (dto != null) result.Add(dto);
            }

            return result;
        }

        public async Task<UserDto?> GetStranger(Guid userId)
        {
            List<Guid> followingIds = await GetFollowingList(userId);

            List<Guid> candidates = await _context.Users
                .Where(u => u.Id != userId && !followingIds.Contains(u.Id))
                .Select(u => u.Id)
                .ToListAsync();

            if (candidates.Count == 0) return null;

            Guid randomUserId = candidates[Random.Shared.Next(candidates.Count)];

            return await GetUserDto(randomUserId, userId);
        }

        public async Task<bool> UpdateProfileImage(Guid userId, string imageUrl)
        {
            ApplicationUser? user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return false;

            if (user.ProfileImageUrl == imageUrl) return true;

            user.ProfileImageUrl = imageUrl;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}