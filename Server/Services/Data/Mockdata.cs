using Server.Models;

namespace Server.Services
{
    public class Mockdata
    {
        public static List<Post> _posts { get; set; } = [];

        public static List<Comment> _comments { get; set; } = [];

        public static List<User> _users { get; set; } = [];

        public static List<Like> _likes { get; set; } = [];

        public static int _currentUserId { get; set; } = 1;

        static Mockdata()
        {
            SeedUsers();
            SeedPosts();
            SeedComments();
            SeedLikes();
        }

        private static void SeedUsers()
        {
            _users =
            [
                new User { UserId = 1, Username = "joao", ProfileImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFbBnDucTQkErvyNTrqFvqD4eSkm9UcFNYg&s" },
                new User { UserId = 2, Username = "mariah", ProfileImageUrl = "https://img.freepik.com/free-photo/head-shot-happy-beautiful-young-woman-posing-indoors-looking-camera-smiling_74855-10218.jpg?semt=ais_hybrid&w=740&q=80" },
                new User { UserId = 3, Username = "mike", ProfileImageUrl = "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" },
                new User { UserId = 4, Username = "sarah", ProfileImageUrl = "https://images.squarespace-cdn.com/content/v1/5e3ee1cd772e5208fa93bad8/1600276711411-FBREG2YYKZ5Z9JS5YAWK/image-asset.jpeg" }
            ];
        }

        private static void SeedPosts()
        {
            _posts.Add(new Post
            {
                UserId = 1,
                TextContent = "Just finished my first ASP.NET Core API 🚀",
                CreatedAt = DateTime.UtcNow.AddHours(-10),
                ImageUrl = null
            });

            _posts.Add(new Post
            {
                UserId = 2,
                TextContent = "Morning walks + coffee = perfect combo ☕🌿",
                CreatedAt = DateTime.UtcNow.AddHours(-8),
                ImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzwl1JFBR1Vu-1JnaZM74ioQIHqfbUrDykA&s"
            });

            _posts.Add(new Post
            {
                UserId = 3,
                TextContent = "Debugging at 2am hits different.",
                CreatedAt = DateTime.UtcNow.AddHours(-6),
                ImageUrl = null
            });

            _posts.Add(new Post
            {
                UserId = 4,
                TextContent = "Reading a new book on system design 📘",
                CreatedAt = DateTime.UtcNow.AddHours(-4),
                ImageUrl = "https://i.ytimg.com/vi/7gNxjvJqqKg/sddefault.jpg"
            });

            _posts.Add(new Post
            {
                UserId = 1,
                TextContent = "Consistency beats motivation. Gym day 💪",
                CreatedAt = DateTime.UtcNow.AddHours(-2),
                ImageUrl = "https://t3.ftcdn.net/jpg/02/14/59/60/360_F_214596042_QB9lDRVMmAr1mn9eFZFgjL9JONicmjn3.jpg"
            });
        }

        private static void SeedComments()
        {
            _comments.Add(new Comment
            {
                PostId = 1,
                UserId = 2,
                TextContent = "Nice! APIs are addictive 😄",
                CreatedAt = DateTime.UtcNow.AddHours(-9)
            });

            _comments.Add(new Comment
            {
                PostId = 1,
                UserId = 3,
                TextContent = "Congrats! Keep going.",
                CreatedAt = DateTime.UtcNow.AddHours(-9)
            });

            _comments.Add(new Comment
            {
                PostId = 2,
                UserId = 1,
                TextContent = "That sounds peaceful!",
                CreatedAt = DateTime.UtcNow.AddHours(-7)
            });

            _comments.Add(new Comment
            {
                PostId = 5,
                UserId = 4,
                TextContent = "Respect the grind 💯",
                CreatedAt = DateTime.UtcNow.AddHours(-1)
            });
        }

        private static void SeedLikes()
        {
            _likes =
            [
                new Like { LikeId = 1, PostId = 1, UserId = 2 },
                new Like { LikeId = 2, PostId = 1, UserId = 3 },
                new Like { LikeId = 3, PostId = 2, UserId = 1 },
                new Like { LikeId = 4, PostId = 2, UserId = 3 },
                new Like { LikeId = 5, PostId = 3, UserId = 2 },
                new Like { LikeId = 6, PostId = 5, UserId = 2 },
                new Like { LikeId = 7, PostId = 5, UserId = 3 },
                new Like { LikeId = 8, PostId = 5, UserId = 4 }
            ];
        }
    }
}
