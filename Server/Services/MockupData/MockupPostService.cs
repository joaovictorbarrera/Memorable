using Server.Dtos;
using Server.Models;
using Server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services.MockupData
{
    public class MockupPostService : IPostService
    {
        private readonly IUserService _userService;
        private readonly IInteractionService _interactionService;

        public MockupPostService(IUserService userService, IInteractionService interactionService)
        {
            _userService = userService;
            _interactionService = interactionService;
        }

        public async Task<PostDto?> GetPostDtoById(Guid postId, Guid currentUserId)
        {
            Post? post = Mockdata._posts.FirstOrDefault(p => p.PostId == postId);
            if (post == null)
            {
                return await Task.FromResult<PostDto?>(null);
            }

            User? user = Mockdata._users.FirstOrDefault(u => u.UserId == post.UserId);
            if (user == null)
            {
                return await Task.FromResult<PostDto?>(null);
            }

            int commentCount = Mockdata._comments.Count(c => c.PostId == postId);

            List<CommentDto> initialComments = await GetPostComments(postId, 0, 5, 1);

            PostDto postDto = new PostDto
            {
                PostId = post.PostId,
                TextContent = post.TextContent,
                CreatedAt = post.CreatedAt,
                UserId = post.UserId,
                ImageUrl = post.ImageUrl,
                DisplayName = user.DisplayName,
                UserProfileImageUrl = user.ProfileImageUrl,
                Username = user.Username,
                LikeCount = Mockdata._likes.Count(l => l.PostId == postId),
                IsLikedByCurrentUser = Mockdata._likes.Any(l => l.PostId == postId && l.UserId == currentUserId),
                InitialComments = initialComments,
                CommentCount = commentCount
            };

            return await Task.FromResult(postDto);
        }

        public async Task<List<CommentDto>> GetPostComments(
            Guid postId,
            int skipFirst,
            int pageSize,
            int pageNumber)
        {
            List<Comment> commentsSlice = Mockdata._comments
                .Where(c => c.PostId == postId)
                .OrderBy(c => c.CreatedAt)
                .Skip(skipFirst)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            List<Task<CommentDto?>> commentTasks = commentsSlice
                .Select(c => _interactionService.GetCommentDtoById(c.CommentId))
                .ToList();

            CommentDto?[] commentDtosArray = await Task.WhenAll(commentTasks);

            List<CommentDto> commentDtos = commentDtosArray
                .Where(dto => dto != null)
                .Select(dto => dto!)
                .ToList();

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

            Mockdata._posts.Add(post);
            return await Task.FromResult(post);
        }

        public async Task<Post?> RemovePost(Guid postId)
        {
            Post? post = await GetPostById(postId);
            if (post == null) return null;

            Mockdata._posts.Remove(post);
            Mockdata._comments.RemoveAll(c => c.PostId == postId);
            Mockdata._likes.RemoveAll(l => l.PostId == postId);

            return await Task.FromResult(post);
        }

        public async Task<Post?> UpdatePost(PostDto updatedPost)
        {
            Post? existingPost = await GetPostById(updatedPost.PostId);
            if (existingPost == null) return null;

            existingPost.TextContent = updatedPost.TextContent;
            existingPost.ImageUrl = updatedPost.ImageUrl;

            return await Task.FromResult(existingPost);
        }

        public async Task<List<PostDto>> GetFeed(int pageSize, int pageNumber, Guid userId)
        {
            List<Guid> usersFollowing = await _userService.GetFollowingList(userId);

            List<PostDto> feed = Mockdata._posts
                .Where(p => usersFollowing.Contains(p.UserId) || p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(p => GetPostDtoById(p.PostId, userId).Result)
                .OfType<PostDto>()
                .ToList();

            return await Task.FromResult(feed);
        }

        public async Task<List<PostDto>> GetProfilePosts(int pageSize, int pageNumber, Guid userId)
        {
            List<PostDto> profilePosts = Mockdata._posts
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(p => GetPostDtoById(p.PostId, userId).Result)
                .OfType<PostDto>()
                .ToList();

            return await Task.FromResult(profilePosts);
        }

        public async Task<bool> PostExists(Guid postId)
        {
            bool exists = Mockdata._posts.Any(p => p.PostId == postId);
            return await Task.FromResult(exists);
        }

        public async Task<bool> PostBelongsToUser(Guid postId, Guid userId)
        {
            bool belongs = Mockdata._posts.Any(p => p.PostId == postId && p.UserId == userId);
            return await Task.FromResult(belongs);
        }

        public async Task<Post?> GetPostById(Guid postId)
        {
            Post? post = Mockdata._posts.FirstOrDefault(p => p.PostId == postId);
            return await Task.FromResult(post);
        }

        public Task<List<PostDto>> GetPostDtosByIds(List<Guid> postIds, Guid currentUserId)
        {
            throw new NotImplementedException();
        }
    }
}