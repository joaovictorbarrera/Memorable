using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Helpers;
using Server.Models;

namespace Server.Services.MockupData
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext context, UserManager<ApplicationUser> _userManager)
        {
            // Users
            foreach (var user in Mockdata._users)
            {
                if (await _userManager.FindByIdAsync(user.UserId.ToString()) == null &&
                    await _userManager.FindByEmailAsync(user.UserEmail) == null)
                {
                    var applicationUser = UserHelper.LegacyUserToApplicationUser(user);

                    if (string.IsNullOrEmpty(applicationUser.SecurityStamp))
                        applicationUser.SecurityStamp = Guid.NewGuid().ToString();

                    await _userManager.CreateAsync(applicationUser);
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