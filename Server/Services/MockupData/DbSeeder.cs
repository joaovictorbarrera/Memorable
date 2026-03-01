using Server.Data;
using Microsoft.EntityFrameworkCore;

namespace Server.Services.MockupData
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            // Users
            foreach (var user in Mockdata._users)
            {
                if (!await context.Users.AnyAsync(u => u.UserId == user.UserId || u.UserEmail == user.UserEmail))
                {
                    context.Users.Add(user);
                }
            }

            await context.SaveChangesAsync();

            // Posts
            foreach (var post in Mockdata._posts)
            {
                if (!await context.Posts.AnyAsync(p => p.PostId == post.PostId))
                {
                    context.Posts.Add(post);
                }
            }

            await context.SaveChangesAsync();

            // Comments
            foreach (var comment in Mockdata._comments)
            {
                if (!await context.Comments.AnyAsync(c => c.CommentId == comment.CommentId))
                {
                    context.Comments.Add(comment);
                }
            }

            await context.SaveChangesAsync();

            // Likes
            foreach (var like in Mockdata._likes)
            {
                if (!await context.Likes.AnyAsync(l => l.UserId == like.UserId && l.PostId == like.PostId))
                {
                    context.Likes.Add(like);
                }
            }

            await context.SaveChangesAsync();

            // Follows
            foreach (var follow in Mockdata._follows)
            {
                if (!await context.Follows.AnyAsync(f => f.FollowerId == follow.FollowerId && f.FollowingId == follow.FollowingId))
                {
                    context.Follows.Add(follow);
                }
            }

            await context.SaveChangesAsync();
        }
    }
}