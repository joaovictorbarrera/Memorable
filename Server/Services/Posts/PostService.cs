using Server.Dtos;
using Server.Models;

namespace Server.Services.Posts
{
    public class PostService
    {
        public static PostDto GetPostDto(int postId)
        {
            Post post = Mockdata._posts.First(p => p.PostId == postId);

            if (post == null)
            {
                throw new Exception("Post not found");
            }

            User user = Mockdata._users.First(u => u.UserId == post.UserId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            List<CommentDto> commentDtos = GetPostComments(postId);

            return new PostDto
            {
                PostId = post.PostId,
                TextContent = post.TextContent,
                CreatedAt = post.CreatedAt,
                UserId = post.UserId,
                ImageUrl = post.ImageUrl,
                Username = user.Username,
                UserProfileImageUrl = user.ProfileImageUrl,
                LikeCount = Mockdata._likes.Count(l => l.PostId == postId),
                IsLikedByCurrentUser = Mockdata._likes.Any(l => l.PostId == postId && l.UserId == Mockdata._currentUserId),
                Comments = commentDtos
            };
        }

        private static List<CommentDto> GetPostComments(int postId)
        {
            List<Comment> comments = Mockdata._comments.Where(c => c.PostId == postId).ToList();
            List<CommentDto> commentDtos = comments.Select(c => GetCommentDto(c.CommentId)).ToList();
            return commentDtos;
        }

        private static CommentDto GetCommentDto(int commentId)
        {
            Comment comment = Mockdata._comments.First(c => c.CommentId == commentId);
            if (comment == null)
            {
                throw new Exception("Comment not found");
            }
            User user = Mockdata._users.First(u => u.UserId == comment.UserId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return new CommentDto
            {
                CommentId = comment.CommentId,
                PostId = comment.PostId,
                UserId = comment.UserId,
                TextContent = comment.TextContent,
                CreatedAt = comment.CreatedAt,
                Username = user.Username,
                UserProfileImageUrl = user.ProfileImageUrl
            };
        }
    }
}
