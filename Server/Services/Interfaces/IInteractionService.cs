using Server.Dtos;
using Server.Models;

namespace Server.Services.Interfaces
{
    public interface IInteractionService
    {
        Task<CommentDto?> GetCommentDtoById(Guid commentId);
        Task<List<CommentDto>> GetCommentDtosByIds(List<Guid> commentId);
        Task<Comment?> AddNewComment(CommentCreateDto body, Guid userId);
        Task<Comment?> DeleteComment(Guid commentId);
        Task<bool> IsLiking(Guid userId, Guid postId);
        Task<Like?> AddNewLike(Guid userId, Guid postId);
        Task<Like?> RemoveLike(Guid userId, Guid postId);
        Task<bool> CommentExists(Guid commentId);
        Task<bool> CommentBelongsToUser(Guid commentId, Guid userId);
    }
}
