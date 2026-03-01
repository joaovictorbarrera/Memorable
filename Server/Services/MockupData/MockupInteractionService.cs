using Server.Dtos;
using Server.Models;
using Server.Services.Interfaces;
using Server.Services.MockupData;

namespace Server.Services.Data.Mockup
{
    public class MockupInteractionService : IInteractionService
    {
        public async Task<CommentDto?> GetCommentDtoById(Guid commentId)
        {
            await Task.CompletedTask;

            Comment? comment = Mockdata._comments
                .FirstOrDefault(c => c.CommentId == commentId);

            if (comment == null) return null;

            User? user = Mockdata._users
                .FirstOrDefault(u => u.UserId == comment.UserId);

            if (user == null) return null;

            return new CommentDto
            {
                CommentId = comment.CommentId,
                PostId = comment.PostId,
                UserId = comment.UserId,
                Username = user.Username,
                TextContent = comment.TextContent,
                CreatedAt = comment.CreatedAt,
                DisplayName = user.DisplayName,
                UserProfileImageUrl = user.ProfileImageUrl
            };
        }

        public async Task<Comment?> AddNewComment(CommentCreateDto body, Guid userId)
        {
            await Task.CompletedTask;

            Comment comment = new()
            {
                CommentId = Guid.NewGuid(),
                UserId = userId,
                PostId = body.PostId,
                TextContent = body.TextContent,
                CreatedAt = DateTime.UtcNow
            };

            Mockdata._comments.Add(comment);

            return comment;
        }

        public async Task<Comment?> DeleteComment(Guid commentId)
        {
            await Task.CompletedTask;

            Comment? c = Mockdata._comments
                .FirstOrDefault(c => c.CommentId == commentId);

            if (c == null) return null;

            Mockdata._comments.Remove(c);
            return c;
        }

        public async Task<Comment?> GetCommentById(Guid commentId)
        {
            await Task.CompletedTask;

            return Mockdata._comments
                .FirstOrDefault(c => c.CommentId == commentId);
        }

        public async Task<bool> IsLiking(Guid userId, Guid postId)
        {
            await Task.CompletedTask;

            return Mockdata._likes.Any(l =>
                l.PostId == postId &&
                l.UserId == userId
            );
        }

        public async Task<Like?> AddNewLike(Guid userId, Guid postId)
        {
            await Task.CompletedTask;

            Like like = new()
            {
                PostId = postId,
                UserId = userId
            };

            Mockdata._likes.Add(like);

            return like;
        }

        public async Task<Like?> RemoveLike(Guid userId, Guid postId)
        {
            await Task.CompletedTask;

            Like? like = Mockdata._likes.FirstOrDefault(l =>
                l.PostId == postId &&
                l.UserId == userId
            );

            if (like == null) return null;

            Mockdata._likes.Remove(like);
            return like;
        }

        public async Task<bool> CommentExists(Guid commentId)
        {
            await Task.CompletedTask;

            return Mockdata._comments
                .Any(c => c.CommentId == commentId);
        }

        public async Task<bool> CommentBelongsToUser(Guid commentId, Guid userId)
        {
            await Task.CompletedTask;

            return Mockdata._comments
                .Any(c => c.CommentId == commentId && c.UserId == userId);
        }

        public Task<List<CommentDto>> GetCommentDtosByIds(List<Guid> commentId)
        {
            throw new NotImplementedException();
        }
    }
}