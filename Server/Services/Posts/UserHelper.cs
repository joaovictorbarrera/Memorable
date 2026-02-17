namespace Server.Services.Posts
{
    public class UserHelper
    {
        public static int GetFollowerCount(Guid userId)
        {
            return Mockdata._follows.Count(f => f.FollowingId == userId);
        }

        public static int GetFollowingCount(Guid userId)
        {
            return Mockdata._follows.Count(f => f.FollowerId == userId);
        }

        public static int GetPostCount(Guid userId)
        {
            return Mockdata._posts.Count(p => p.UserId == userId);
        }

        public static bool IsFollowing(Guid profileUserId, Guid currentUserId)
        {
            return Mockdata._follows.Any(f => f.FollowerId == currentUserId && f.FollowingId == profileUserId);
        }
    }
}
