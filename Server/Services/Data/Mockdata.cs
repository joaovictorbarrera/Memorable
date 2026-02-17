using Server.Models;

namespace Server.Services
{
    public class Mockdata
    {
        public static List<Post> _posts { get; set; } = [];

        public static List<Comment> _comments { get; set; } = [];

        public static List<User> _users { get; set; } = [];

        public static List<Like> _likes { get; set; } = [];

        public static List<Follow> _follows { get; set; } = [];

        public static Guid _currentUserId { get; set; } = Guid.NewGuid();

        static Mockdata()
        {
            // Simulate logged-in user
            const int LOGGED_IN_USER = 1;
            
            //_currentUserId = new Guid("f8b78691-d0eb-4e11-85eb-a81f4b028356");
            SeedUsers();
            _currentUserId = _users[LOGGED_IN_USER-1].UserId;

            SeedPosts();
            SeedComments();
            SeedLikes();
        }

        private static void SeedUsers()
        {
            _users = [
                new User {
                    FirstName = "John",
                    LastName = "Barrera",
                    ProfileImageUrl = "https://www.pigstarcraft.com/wp-content/uploads/2020/11/logo_pig_400.jpg",
                    Username = "john.barrera",
                    UserEmail = "test@test.com",
                    Password = "Password123"
                },
                new User {
                    FirstName = "Artanis",
                    LastName = "Tal'Daarim",
                    ProfileImageUrl = "https://www.giantbomb.com/a/uploads/scale_super/3/33745/1681250-artanis.jpg",
                    Username = "artanis.taldaarim",
                    UserEmail = "test@test.com",
                    Password = "Password123"
                },
                new User {
                    FirstName = "Jim",
                    LastName = "Raynor",
                    ProfileImageUrl = "https://alchetron.com/cdn/jim-raynor-386f452a-8282-4f87-a6d7-f9c4a9a7f46-resize-750.jpeg",
                    Username = "jim.raynorrr",
                    UserEmail = "test@test.com",
                    Password = "Password123"
                },
                new User {
                    FirstName = "Sarah",
                    LastName = "Kerrigan",
                    ProfileImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefLAeMA3-ij1r9nf6b4aeRHkS6V1uOV7t8Q&s",
                    Username = "sarah.kerrigan",
                    UserEmail = "test@test.com",
                    Password = "Password123"
                }
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

            _posts.Add(new Post
            {
                UserId = _users[1].UserId,
                TextContent = "Baking some cookies today 🍪 Anyone else into baking?",
                CreatedAt = DateTime.UtcNow.AddHours(-1.5),
                ImageUrl = "https://cookiesandcups.com/wp-content/uploads/2013/03/The-Perfect-Cookie-Base-2-scaled.jpg"
            });

            _posts.Add(new Post
            {
                UserId = _users[2].UserId,
                TextContent = "Late night coding session... fueled by pizza 🍕",
                CreatedAt = DateTime.UtcNow.AddMinutes(-90),
                ImageUrl = null
            });

            _posts.Add(new Post
            {
                UserId = _users[3].UserId,
                TextContent = "Just watched an amazing documentary on AI 🤯",
                CreatedAt = DateTime.UtcNow.AddMinutes(-80),
                ImageUrl = "https://i.ytimg.com/vi/-sB12gk9ESA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAIbQUSDjeewuXlwswqbGorwFhl8Q"
            });

            _posts.Add(new Post
            {
                UserId = _users[0].UserId,
                TextContent = "Feeling grateful for small wins today ✨",
                CreatedAt = DateTime.UtcNow.AddMinutes(-60),
                ImageUrl = null
            });

            _posts.Add(new Post
            {
                UserId = _users[2].UserId,
                TextContent = "Nature hike yesterday was refreshing 🌲🍃",
                CreatedAt = DateTime.UtcNow.AddMinutes(-30),
                ImageUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
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

            _comments.Add(new Comment
            {
                PostId = _posts[5].PostId,
                UserId = _users[0].UserId,
                TextContent = "Cookies sound amazing! Save me some 😋",
                CreatedAt = DateTime.UtcNow.AddMinutes(-85)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[6].PostId,
                UserId = _users[1].UserId,
                TextContent = "Pizza is essential for late night coding 🍕🔥",
                CreatedAt = DateTime.UtcNow.AddMinutes(-70)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[7].PostId,
                UserId = _users[2].UserId,
                TextContent = "AI is fascinating, right? Mind-blowing stuff 🤖",
                CreatedAt = DateTime.UtcNow.AddMinutes(-65)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[8].PostId,
                UserId = _users[3].UserId,
                TextContent = "Small wins add up! Keep it up 🙌",
                CreatedAt = DateTime.UtcNow.AddMinutes(-50)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[9].PostId,
                UserId = _users[1].UserId,
                TextContent = "That hike looks epic! Nature always recharges the soul 🌿",
                CreatedAt = DateTime.UtcNow.AddMinutes(-20)
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
                new Like { PostId = _posts[4].PostId, UserId = _posts[3].UserId },
                new Like { PostId = _posts[5].PostId, UserId = _users[2].UserId },
                new Like { PostId = _posts[5].PostId, UserId = _users[3].UserId },
                new Like { PostId = _posts[6].PostId, UserId = _users[0].UserId },
                new Like { PostId = _posts[6].PostId, UserId = _users[3].UserId },
                new Like { PostId = _posts[7].PostId, UserId = _users[0].UserId },
                new Like { PostId = _posts[7].PostId, UserId = _users[1].UserId },
                new Like { PostId = _posts[8].PostId, UserId = _users[1].UserId },
                new Like { PostId = _posts[8].PostId, UserId = _users[2].UserId },
                new Like { PostId = _posts[9].PostId, UserId = _users[0].UserId },
                new Like { PostId = _posts[9].PostId, UserId = _users[3].UserId }
            ];
        }
    }
}
