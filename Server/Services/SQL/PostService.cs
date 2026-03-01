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
    public class PostService : IPostService
    {
        private readonly AppDbContext _context;
        private readonly IInteractionService _interactionService;
        private readonly IUserService _userService;

        public PostService(
            AppDbContext context,
            IUserService userService,
            IInteractionService interactionService)
        {
            _context = context;
            _userService = userService;
            _interactionService = interactionService;
        }

        public async Task<PostDto?> GetPostDtoById(Guid postId, Guid currentUserId)
        {
            Tuple<Post, User>? postTuple = await _context.Posts
                .Where(p => p.PostId == postId)
                .Join(_context.Users,
                    p => p.UserId,
                    u => u.UserId,
                    (p, u) => Tuple.Create(p, u))
                .FirstOrDefaultAsync();

            if (postTuple == null) return null;

            int likeCount = await _context.Likes
                .CountAsync(l => l.PostId == postId);

            bool isLiked = await _context.Likes
                .AnyAsync(l => l.PostId == postId && l.UserId == currentUserId);

            int commentCount = await _context.Comments
                .CountAsync(c => c.PostId == postId);

            List<CommentDto> initialComments = await GetPostComments(postId, 0, 5, 1);

            return new PostDto
            {
                PostId = postTuple.Item1.PostId,
                TextContent = postTuple.Item1.TextContent,
                CreatedAt = postTuple.Item1.CreatedAt,
                UserId = postTuple.Item1.UserId,
                ImageUrl = postTuple.Item1.ImageUrl,
                DisplayName = postTuple.Item2.DisplayName,
                UserProfileImageUrl = postTuple.Item2.ProfileImageUrl,
                Username = postTuple.Item2.Username,
                LikeCount = likeCount,
                IsLikedByCurrentUser = isLiked,
                InitialComments = initialComments,
                CommentCount = commentCount
            };
        }

        public async Task<List<PostDto>> GetPostDtosByIds(
            List<Guid> postIds,
            Guid currentUserId)
        {
            if (postIds == null || postIds.Count == 0)
                return new List<PostDto>();

            List<Post> posts = await _context.Posts
                .Where(p => postIds.Contains(p.PostId))
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            List<Guid> userIds = posts.Select(p => p.UserId).Distinct().ToList();

            List<User> users = await _context.Users
                .Where(u => userIds.Contains(u.UserId))
                .ToListAsync();

            List<Like> likes = await _context.Likes
                .Where(l => postIds.Contains(l.PostId))
                .ToListAsync();

            // Load comment counts per post
            var commentCounts = await _context.Comments
                .Where(c => postIds.Contains(c.PostId))
                .GroupBy(c => c.PostId)
                .Select(g => new { PostId = g.Key, Count = g.Count() })
                .ToDictionaryAsync(x => x.PostId, x => x.Count);

            var postDtos = new List<PostDto>();

            foreach (var post in posts)
            {
                var user = users.FirstOrDefault(u => u.UserId == post.UserId);
                var postLikes = likes.Where(l => l.PostId == post.PostId).ToList();

                var initialComments = await GetPostComments(post.PostId, 0, 5, 1);

                var dto = new PostDto
                {
                    PostId = post.PostId,
                    UserId = post.UserId,
                    TextContent = post.TextContent,
                    ImageUrl = post.ImageUrl,
                    CreatedAt = post.CreatedAt,

                    Username = user?.Username ?? "Unknown",
                    DisplayName = user?.DisplayName ?? "Unknown",
                    UserProfileImageUrl = user?.ProfileImageUrl ?? "",

                    LikeCount = postLikes.Count,
                    IsLikedByCurrentUser = postLikes.Any(l => l.UserId == currentUserId),

                    InitialComments = initialComments,
                    CommentCount = commentCounts.ContainsKey(post.PostId) ? commentCounts[post.PostId] : 0
                };

                postDtos.Add(dto);
            }

            return postDtos;
        }

        public async Task<List<CommentDto>> GetPostComments(
            Guid postId,
            int skipFirst,
            int pageSize,
            int pageNumber)
        {
            List<Guid> commentIds = await _context.Comments
                .Where(c => c.PostId == postId)
                .OrderByDescending(c => c.CreatedAt)
                .Skip(skipFirst)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(c => c.CommentId)
                .ToListAsync();

            if (commentIds.Count == 0)
                return new List<CommentDto>();

            List<CommentDto> commentDtos = await _interactionService.GetCommentDtosByIds(commentIds);

            return commentDtos;
        }

        public async Task<Post?> CreatePost(PostCreateDto body, Guid userId, string? imageUrl)
        {
            Post post = new Post
            {
                PostId = Guid.NewGuid(),
                UserId = userId,
                TextContent = body.TextContent,
                CreatedAt = DateTime.UtcNow,
                ImageUrl = imageUrl
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<Post?> RemovePost(Guid postId)
        {
            Post? post = await _context.Posts
                .FirstOrDefaultAsync(p => p.PostId == postId);

            if (post == null) return null;

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<Post?> UpdatePost(PostDto updatedPost)
        {
            Post? post = await _context.Posts
                .FirstOrDefaultAsync(p => p.PostId == updatedPost.PostId);

            if (post == null) return null;

            post.TextContent = updatedPost.TextContent;
            post.ImageUrl = updatedPost.ImageUrl;

            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<List<PostDto>> GetFeed(
            int pageSize,
            int pageNumber,
            Guid userId)
        {
            List<Guid> followingIds = await _userService.GetFollowingList(userId);

            List<Guid> postIds = await _context.Posts
            .Where(p => followingIds.Contains(p.UserId) || p.UserId == userId)
            .OrderByDescending(p => p.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(p => p.PostId)
            .ToListAsync();

            List<PostDto> postDtos = await GetPostDtosByIds(postIds, userId);

            return postDtos;
        }

        public async Task<List<PostDto>> GetProfilePosts(
            int pageSize,
            int pageNumber,
            Guid userId)
        {
            List<Post> posts = await _context.Posts
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            List<PostDto> result = new List<PostDto>();

            foreach (Post post in posts)
            {
                PostDto? dto = await GetPostDtoById(post.PostId, userId);
                if (dto != null)
                    result.Add(dto);
            }

            return result;
        }

        public async Task<bool> PostExists(Guid postId)
        {
            bool exists = await _context.Posts
                .AnyAsync(p => p.PostId == postId);
            return exists;
        }

        public async Task<bool> PostBelongsToUser(Guid postId, Guid userId)
        {
            bool belongs = await _context.Posts
                .AnyAsync(p => p.PostId == postId && p.UserId == userId);
            return belongs;
        }

        public async Task<Post?> GetPostById(Guid postId)
        {
            Post? post = await _context.Posts
                .FirstOrDefaultAsync(p => p.PostId == postId);
            return post;
        }
    }
}