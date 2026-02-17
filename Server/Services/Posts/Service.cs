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

            int commentCount = Mockdata._comments.Count(c => c.PostId == postId);

            List<CommentDto> initialComments = GetPostComments(postId, 0, pageSize: 5, pageNumber: 1);

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
                InitialComments = initialComments,
                CommentCount = commentCount
            };
        }

        public static List<CommentDto> GetPostComments(Guid postId, int skip, int pageSize, int pageNumber)
        {
            List<Comment> pagedComments = Mockdata._comments
                .Where(c => c.PostId == postId)
                .OrderBy(c => c.CreatedAt) // oldest first
                .Skip(skip)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            List<CommentDto> commentDtos = pagedComments
                .Select(c => Service.GetCommentDto(c.CommentId))
                .ToList();

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
                UserEmail = user.UserEmail,
                CreatedAt = user.CreatedAt
            };

            return userDto;
        }
    }
}
