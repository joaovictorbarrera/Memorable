using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Models;
using Server.Services.Interfaces;

namespace Server.Services
{
    public class InteractionService : IInteractionService
    {
        private readonly AppDbContext _context;

        public InteractionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CommentDto?> GetCommentDtoById(Guid commentId)
        {
            CommentDto? comment = await _context.Comments
                .Where(c => c.CommentId == commentId)
                .Join(_context.Users,
                    c => c.UserId,
                    u => u.Id,
                    (c, u) => new CommentDto
                    {
                        CommentId = c.CommentId,
                        PostId = c.PostId,
                        UserId = c.UserId,
                        Username = u.UserName ?? "Unknown",
                        TextContent = c.TextContent,
                        CreatedAt = c.CreatedAt,
                        DisplayName = u.DisplayName,
                        UserProfileImageUrl = u.ProfileImageUrl
                    })
                .FirstOrDefaultAsync();

            return comment;
        }

        public async Task<List<CommentDto>> GetCommentDtosByIds(List<Guid> commentIds)
        {
            if (commentIds == null || commentIds.Count == 0)
                return [];

            List<CommentDto> comments = await _context.Comments
                .Where(c => commentIds.Contains(c.CommentId))
                .Join(
                    _context.Users,
                    c => c.UserId,
                    u => u.Id,
                    (c, u) => new CommentDto
                    {
                        CommentId = c.CommentId,
                        PostId = c.PostId,
                        UserId = c.UserId,
                        Username = u.UserName ?? "Unknown",
                        TextContent = c.TextContent,
                        CreatedAt = c.CreatedAt,
                        DisplayName = u.DisplayName,
                        UserProfileImageUrl = u.ProfileImageUrl
                    })
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();

            return comments;
        }

        public async Task<Comment?> AddNewComment(CommentCreateDto body, Guid userId)
        {
            Comment? comment = new Comment
            {
                CommentId = Guid.NewGuid(),
                UserId = userId,
                PostId = body.PostId,
                TextContent = body.TextContent,
                CreatedAt = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment?> DeleteComment(Guid commentId)
        {
            Comment? comment = await _context.Comments
                .FirstOrDefaultAsync(c => c.CommentId == commentId);

            if (comment == null) return null;

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<bool> IsLiking(Guid userId, Guid postId)
        {
            return await _context.Likes
                .AnyAsync(l => l.PostId == postId && l.UserId == userId);
        }

        public async Task<Like?> AddNewLike(Guid userId, Guid postId)
        {
            bool exists = await IsLiking(userId, postId);
            if (exists) return null;

            Like like = new()
            {
                PostId = postId,
                UserId = userId
            };

            _context.Likes.Add(like);
            await _context.SaveChangesAsync();

            return like;
        }

        public async Task<Like?> RemoveLike(Guid userId, Guid postId)
        {
            Like? like = await _context.Likes
                .FirstOrDefaultAsync(l =>
                    l.PostId == postId &&
                    l.UserId == userId);

            if (like == null) return null;

            _context.Likes.Remove(like);
            await _context.SaveChangesAsync();

            return like;
        }

        public async Task<bool> CommentExists(Guid commentId)
        {
            return await _context.Comments
                .AnyAsync(c => c.CommentId == commentId);
        }

        public async Task<bool> CommentBelongsToUser(Guid commentId, Guid userId)
        {
            return await _context.Comments
                .AnyAsync(c => c.CommentId == commentId && c.UserId == userId);
        }
    }
}