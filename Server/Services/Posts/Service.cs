using Server.Dtos;
using Server.Models;

namespace Server.Services.Posts
{
    public class Service
    {
        public static PostDto GetPostDto(Guid postId)
        {
            Post post = Mockdata._posts.First(p => p.PostId == postId);

            if (post == null)
            {
                throw new Exception("Post not found");
            }

            UserDto userDto = GetUserDto(post.UserId);

            List<CommentDto> commentDtos = GetPostComments(postId);

            return new PostDto
            {
                PostId = post.PostId,
                TextContent = post.TextContent,
                CreatedAt = post.CreatedAt,
                UserId = post.UserId,
                ImageUrl = post.ImageUrl,
                DisplayName = userDto.DisplayName,
                UserProfileImageUrl = userDto.ProfileImageUrl,
                Username = userDto.Username,
                LikeCount = Mockdata._likes.Count(l => l.PostId == postId),
                IsLikedByCurrentUser = Mockdata._likes.Any(l => l.PostId == postId && l.UserId == Mockdata._currentUserId),
                Comments = commentDtos
            };
        }

        private static List<CommentDto> GetPostComments(Guid postId)
        {
            List<Comment> comments = Mockdata._comments.Where(c => c.PostId == postId).ToList();
            List<CommentDto> commentDtos = comments.Select(c => GetCommentDto(c.CommentId)).ToList();
            return commentDtos;
        }

        public static CommentDto GetCommentDto(Guid commentId)
        {
            Comment comment = Mockdata._comments.First(c => c.CommentId == commentId);
            if (comment == null)
            {
                throw new Exception("Comment not found");
            }

            UserDto userDto = GetUserDto(comment.UserId);

            return new CommentDto
            {
                CommentId = comment.CommentId,
                PostId = comment.PostId,
                UserId = comment.UserId,
                Username = userDto.Username,
                TextContent = comment.TextContent,
                CreatedAt = comment.CreatedAt,
                DisplayName = userDto.DisplayName,
                UserProfileImageUrl = userDto.ProfileImageUrl
            };
        }

        public static UserDto GetUserDto(Guid userId)
        {
            User? user = Mockdata._users.FirstOrDefault(p => p.UserId.Equals(userId)) ?? throw new Exception("User not found");

            string displayName = user.FirstName + " " + user.LastName;

            UserDto userDto = new() {
                UserId = user.UserId,
                DisplayName = displayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfileImageUrl = user.ProfileImageUrl,
                Username = user.Username,
                UserEmail = user.UserEmail
            };

            return userDto;
        }
    }
}
