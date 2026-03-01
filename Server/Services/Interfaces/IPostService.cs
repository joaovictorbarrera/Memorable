using Server.Dtos;
using Server.Models;

namespace Server.Services.Interfaces
{
    public interface IPostService
    {
        Task<PostDto?> GetPostDtoById(Guid postId, Guid currentUserId);

        Task<List<PostDto>> GetPostDtosByIds(List<Guid> postIds, Guid currentUserId);

        Task<List<CommentDto>> GetPostComments(Guid postId, int skipFirst, int pageSize, int pageNumber);

        Task<Post?> CreatePost(PostCreateDto body, Guid userId, string? imageUrl);

        Task<Post?> RemovePost(Guid postId);

        Task<Post?> UpdatePost(PostDto updatedPost);

        Task<List<PostDto>> GetFeed(int pageSize, int pageNumber, Guid userId);

        Task<List<PostDto>> GetProfilePosts(int pageSize, int pageNumber, Guid userId);

        Task<bool> PostExists(Guid postId);

        Task<bool> PostBelongsToUser(Guid postId, Guid userId);

        Task<Post?> GetPostById(Guid postId);
    }
}