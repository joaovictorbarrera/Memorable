using Server.Models;

namespace Server.Services
{
    public class Mockdata
    {
        public static List<Post> _posts { get; set; } = [];

        public static List<Comment> _comments { get; set; } = [];

        public static List<User> _users { get; set; } = [];

        public static List<Like> _likes { get; set; } = [];

        public static Guid _currentUserId { get; set; } = Guid.NewGuid();

        static Mockdata()
        {
            // Simulate logged-in user
            const int LOGGED_IN_USER = 3;
            
            //_currentUserId = new Guid("f8b78691-d0eb-4e11-85eb-a81f4b028356");
            SeedUsers();
            _currentUserId = _users[LOGGED_IN_USER-1].UserId;

            SeedPosts();
            SeedComments();
            SeedLikes();
        }

        private static void SeedUsers()
        {
            _users =
            [
                new User { Username = "John Barrera", ProfileImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFbBnDucTQkErvyNTrqFvqD4eSkm9UcFNYg&s" },
                new User { Username = "mariah", ProfileImageUrl = "https://img.freepik.com/free-photo/head-shot-happy-beautiful-young-woman-posing-indoors-looking-camera-smiling_74855-10218.jpg?semt=ais_hybrid&w=740&q=80" },
                new User { Username = "mike", ProfileImageUrl = "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" },
                new User { Username = "sarah", ProfileImageUrl = "https://images.squarespace-cdn.com/content/v1/5e3ee1cd772e5208fa93bad8/1600276711411-FBREG2YYKZ5Z9JS5YAWK/image-asset.jpeg" }
            ];
        }

        private static void SeedPosts()
        {
            _posts.Add(new Post
            {
                UserId = _users[0].UserId,
                TextContent = "Just finished my first ASP.NET Core API 🚀",
                CreatedAt = DateTime.UtcNow.AddHours(-10),
                ImageUrl = null
            });

            _posts.Add(new Post
            {
                UserId = _users[1].UserId,
                TextContent = "Morning walks + coffee = perfect combo ☕🌿",
                CreatedAt = DateTime.UtcNow.AddHours(-8),
                ImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzwl1JFBR1Vu-1JnaZM74ioQIHqfbUrDykA&s"
            });

            _posts.Add(new Post
            {
                UserId = _users[2].UserId,
                TextContent = "Debugging at 2am hits different.",
                CreatedAt = DateTime.UtcNow.AddHours(-6),
                ImageUrl = null
            });

            _posts.Add(new Post
            {
                UserId = _users[3].UserId,
                TextContent = "Reading a new book on system design 📘",
                CreatedAt = DateTime.UtcNow.AddHours(-4),
                ImageUrl = "https://i.ytimg.com/vi/7gNxjvJqqKg/sddefault.jpg"
            });

            _posts.Add(new Post
            {
                UserId = _users[0].UserId,
                TextContent = "Consistency beats motivation. Gym day 💪",
                CreatedAt = DateTime.UtcNow.AddHours(-2),
                ImageUrl = "https://t3.ftcdn.net/jpg/02/14/59/60/360_F_214596042_QB9lDRVMmAr1mn9eFZFgjL9JONicmjn3.jpg"
            });
        }

        private static void SeedComments()
        {
            _comments.Add(new Comment
            {
                PostId = _posts[0].PostId,
                UserId = _users[1].UserId,
                TextContent = "Nice! APIs are addictive 😄",
                CreatedAt = DateTime.UtcNow.AddHours(-9)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[0].PostId,
                UserId = _users[2].UserId,
                TextContent = "Congrats! Keep going.",
                CreatedAt = DateTime.UtcNow.AddHours(-9)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[1].UserId,
                UserId = _users[0].UserId,
                TextContent = "That sounds peaceful!",
                CreatedAt = DateTime.UtcNow.AddHours(-7)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[4].UserId,
                UserId = _users[3].UserId,
                TextContent = "Respect the grind 💯",
                CreatedAt = DateTime.UtcNow.AddHours(-1)
            });
        }

        private static void SeedLikes()
        {
            _likes =
            [
                new Like { PostId = _posts[0].PostId, UserId = _posts[1].UserId },
                new Like { PostId = _posts[0].PostId, UserId = _posts[2].UserId },
                new Like { PostId = _posts[1].PostId, UserId = _posts[0].UserId },
                new Like { PostId = _posts[1].PostId, UserId = _posts[2].UserId },
                new Like { PostId = _posts[2].PostId, UserId = _posts[1].UserId },
                new Like { PostId = _posts[4].PostId, UserId = _posts[1].UserId },
                new Like { PostId = _posts[4].PostId, UserId = _posts[2].UserId },
                new Like { PostId = _posts[4].PostId, UserId = _posts[3].UserId }
            ];
        }
    }
}
