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
            _currentUserId = _users[LOGGED_IN_USER - 1].UserId;

            SeedPosts();
            SeedComments();
            SeedLikes();
            SeedFollows();
        }

        private static void SeedUsers()
        {
            _users = [
                new User {
                    FirstName = "John",
                    LastName = "Barrera",
                    DisplayName = "John Barrera",
                    ProfileImageUrl = "https://www.pigstarcraft.com/wp-content/uploads/2020/11/logo_pig_400.jpg",
                    Username = "john.barrera",
                    UserEmail = "test@test.com",
                    Password = "Password123"
                },
                new User {
                    FirstName = "Artanis",
                    LastName = "Tal'Daarim",
                    DisplayName = "Artanis Tal'Daarim",
                    ProfileImageUrl = "https://www.giantbomb.com/a/uploads/scale_super/3/33745/1681250-artanis.jpg",
                    Username = "artanis.taldaarim",
                    UserEmail = "test@test.com",
                    Password = "Password123"
                },
                new User {
                    FirstName = "Jim",
                    LastName = "Raynor",
                    DisplayName = "Jim Raynor",
                    ProfileImageUrl = "https://alchetron.com/cdn/jim-raynor-386f452a-8282-4f87-a6d7-f9c4a9a7f46-resize-750.jpeg",
                    Username = "jim.raynorrr",
                    UserEmail = "test@test.com",
                    Password = "Password123"
                },
                new User {
                    FirstName = "Sarah",
                    LastName = "Kerrigan",
                    DisplayName = "Sarah Kerrigan",
                    ProfileImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefLAeMA3-ij1r9nf6b4aeRHkS6V1uOV7t8Q&s",
                    Username = "sarah.kerrigan",
                    UserEmail = "test@test.com",
                    Password = "Password123"
                },
                // User with 0 activity
                new User {
                    FirstName = "Nova",
                    LastName = "Silent",
                    DisplayName = "Nova Silent",
                    ProfileImageUrl = "https://randomuser.me/api/portraits/women/44.jpg",
                    Username = "nova.silent",
                    UserEmail = "nova@test.com",
                    Password = "Password123"
                },

                // User 1 (2 posts)
                new User {
                    FirstName = "Elon",
                    LastName = "Synth",
                    DisplayName = "Elon Synth",
                    ProfileImageUrl = "https://randomuser.me/api/portraits/men/32.jpg",
                    Username = "elon.synth",
                    UserEmail = "elon@test.com",
                    Password = "Password123"
                },

                // User 2 (2 posts)
                new User {
                    FirstName = "Mira",
                    LastName = "Vale",
                    DisplayName = "Mira Vale",
                    ProfileImageUrl = "https://randomuser.me/api/portraits/women/68.jpg",
                    Username = "mira.vale",
                    UserEmail = "mira@test.com",
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

            // Elon posts
            _posts.Add(new Post
            {
                UserId = _users[5].UserId,
                TextContent = "Exploring microservices architecture today ⚙️",
                CreatedAt = DateTime.UtcNow.AddMinutes(-25),
                ImageUrl = null
            });

            _posts.Add(new Post
            {
                UserId = _users[5].UserId,
                TextContent = "Dark mode > Light mode. Always.",
                CreatedAt = DateTime.UtcNow.AddMinutes(-20),
                ImageUrl = null
            });

            // Mira posts
            _posts.Add(new Post
            {
                UserId = _users[6].UserId,
                TextContent = "Sketching UI ideas in my notebook ✏️",
                CreatedAt = DateTime.UtcNow.AddMinutes(-15),
                ImageUrl = null
            });

            _posts.Add(new Post
            {
                UserId = _users[6].UserId,
                TextContent = "Weekend hiking trip was unreal 🌄",
                CreatedAt = DateTime.UtcNow.AddMinutes(-10),
                ImageUrl = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
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
                PostId = _posts[1].PostId,
                UserId = _users[0].UserId,
                TextContent = "That sounds peaceful!",
                CreatedAt = DateTime.UtcNow.AddHours(-7)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[4].PostId,
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

            _comments.Add(new Comment
            {
                PostId = _posts[10].PostId,
                UserId = _users[0].UserId,
                TextContent = "Microservices are powerful when done right!",
                CreatedAt = DateTime.UtcNow.AddMinutes(-24)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[10].PostId,
                UserId = _users[2].UserId,
                TextContent = "Are you using Docker?",
                CreatedAt = DateTime.UtcNow.AddMinutes(-23)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[11].PostId,
                UserId = _users[1].UserId,
                TextContent = "Dark mode supremacy 🔥",
                CreatedAt = DateTime.UtcNow.AddMinutes(-19)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[12].PostId,
                UserId = _users[3].UserId,
                TextContent = "UI sketching hits different on paper.",
                CreatedAt = DateTime.UtcNow.AddMinutes(-14)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[13].PostId,
                UserId = _users[5].UserId,
                TextContent = "That view looks insane!",
                CreatedAt = DateTime.UtcNow.AddMinutes(-9)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[2].PostId,
                UserId = _users[6].UserId,
                TextContent = "2am debugging builds character 😅",
                CreatedAt = DateTime.UtcNow.AddMinutes(-5)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[4].PostId,
                UserId = _users[6].UserId,
                TextContent = "Gym consistency is elite mindset 💪",
                CreatedAt = DateTime.UtcNow.AddMinutes(-4)
            });

            _comments.Add(new Comment
            {
                PostId = _posts[7].PostId,
                UserId = _users[5].UserId,
                TextContent = "AI documentaries are addictive!",
                CreatedAt = DateTime.UtcNow.AddMinutes(-3)
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
                new Like { PostId = _posts[9].PostId, UserId = _users[3].UserId },
                new Like { PostId = _posts[10].PostId, UserId = _users[0].UserId },
                new Like { PostId = _posts[10].PostId, UserId = _users[1].UserId },
                new Like { PostId = _posts[11].PostId, UserId = _users[2].UserId },
                new Like { PostId = _posts[12].PostId, UserId = _users[0].UserId },
                new Like { PostId = _posts[13].PostId, UserId = _users[3].UserId },
                new Like { PostId = _posts[0].PostId, UserId = _users[5].UserId },
                new Like { PostId = _posts[1].PostId, UserId = _users[6].UserId },
                new Like { PostId = _posts[3].PostId, UserId = _users[5].UserId },
                new Like { PostId = _posts[8].PostId, UserId = _users[6].UserId }
            ];
        }


        private static void SeedFollows()
        {
            _follows = new List<Follow>();

            var john = _users[0];     // logged in
            var artanis = _users[1];
            var raynor = _users[2];
            var kerrigan = _users[3];
            var nova = _users[4];     // 0 activity user
            var elon = _users[5];
            var mira = _users[6];

            // 🔥 Popular user (Kerrigan) - many followers
            _follows.AddRange(new[]
            {
                new Follow { FollowerId = john.UserId, FollowingId = kerrigan.UserId },
                new Follow { FollowerId = artanis.UserId, FollowingId = kerrigan.UserId },
                new Follow { FollowerId = raynor.UserId, FollowingId = kerrigan.UserId },
                new Follow { FollowerId = elon.UserId, FollowingId = kerrigan.UserId },
                new Follow { FollowerId = mira.UserId, FollowingId = kerrigan.UserId },
            });

            // 💪 John follows multiple people (active user behavior)
            _follows.AddRange(new[]
            {
                new Follow { FollowerId = john.UserId, FollowingId = artanis.UserId },
                new Follow { FollowerId = john.UserId, FollowingId = raynor.UserId },
                new Follow { FollowerId = john.UserId, FollowingId = elon.UserId },
                new Follow { FollowerId = john.UserId, FollowingId = mira.UserId }
            });

            // 🤝 Mutual friendships
            _follows.AddRange(new[]
            {
                new Follow { FollowerId = artanis.UserId, FollowingId = raynor.UserId },
                new Follow { FollowerId = raynor.UserId, FollowingId = artanis.UserId },

                new Follow { FollowerId = elon.UserId, FollowingId = mira.UserId },
                new Follow { FollowerId = mira.UserId, FollowingId = elon.UserId }
            });

            // 👀 Lurker behavior (Nova follows but nobody follows back)
            _follows.AddRange(new[]
            {
                new Follow { FollowerId = nova.UserId, FollowingId = john.UserId },
                new Follow { FollowerId = nova.UserId, FollowingId = kerrigan.UserId }
            });

            // 🧠 A few asymmetric follows (more realistic)
            _follows.AddRange(new[]
            {
                new Follow { FollowerId = mira.UserId, FollowingId = john.UserId },
                new Follow { FollowerId = elon.UserId, FollowingId = john.UserId }
            });
        }

    }
}
