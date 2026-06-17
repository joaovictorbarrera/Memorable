# Memorable - Social Media Web Application

**Memorable** is a full-stack social media platform inspired by Facebook and Instagram, built with a focus on simplicity, intentional interaction, and a nostalgic visual aesthetic. Users can create posts, upload images, comment, like, follow others, and build a personalized feed.

🌐 **Live App:** [memorable-two.vercel.app](https://memorable-two.vercel.app)
🔌 **API:** [memorable-api.up.railway.app](https://memorable-api.up.railway.app)

---

<p align="center">
  <strong><font size="5">📸 Screenshots</font></strong>
</p>
<p align="center">
  <img src="https://i.imgur.com/5w4anOL.png" alt="Home Feed" width="500">
</p>
<p align="center"><em>Home Feed</em></p>

<p align="center">
  <img src="https://i.imgur.com/r6Lulr3.png" alt="Login Page" width="500">
</p>
<p align="center"><em>Login Page</em></p>

<p align="center">
  <img src="https://i.imgur.com/9OTxG12.png" alt="User Profile" width="500">
</p>
<p align="center"><em>User Profile</em></p>

<p align="center">
  <img src="https://i.imgur.com/4L548KI.png" alt="User Search" width="300">
  <img src="https://i.imgur.com/1A5J1aM.png" alt="Mobile View" width="300">
</p>
<p align="center">
  <strong>User Search</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <strong>Mobile View</strong>
</p>

---

## ✨ Features

- **Posts** — Create, edit, and delete text-based or image-based posts
- **Comments** — Add and delete comments on posts, with pagination
- **Likes** — Like and unlike any post
- **Follows** — Follow and unfollow users to personalize your feed
- **User Profiles** — View profile info, post history, and follower/following lists
- **User Search** — Discover and connect with other users
- **Shareable Links** — Direct links to posts and profiles
- **Random Discovery** — Explore users you don't already follow
- **Lazy Loading** — Home feed loads incrementally for better performance
- **Responsive Design** — Works on desktop and mobile
- **JWT Authentication** — Secure login with access tokens and refresh tokens

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Angular (TypeScript) | SPA framework, routing, component architecture |
| Tailwind CSS | Utility-first styling |
| SCSS | Custom styles and variables |
| Material Icons | UI iconography |
| Vercel | Production hosting + CI/CD |

### Backend
| Technology | Purpose |
|---|---|
| ASP.NET Core | REST API, controllers, service layer |
| PostgreSQL | Relational database |
| .NET Identity | User management, password hashing |
| JWT + Refresh Tokens | Stateless authentication |
| SendGrid | Password reset emails |
| ImgBB | External image hosting |
| Railway | Backend + database hosting + CI/CD |

---

## 🏗️ Architecture

```
Frontend (Angular) ──── REST API (ASP.NET Core) ──── PostgreSQL
       │                         │
    Vercel                    Railway
                               │
                             ImgBB (image uploads)
```

**Frontend** is organized around reusable components (Post, Comment, Card, ProfileIcon, etc.) and Angular services that handle all API communication and shared state.

**Backend** follows a controller → service → database context pattern, keeping business logic separate from request handling.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js & npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [.NET SDK](https://dotnet.microsoft.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Frontend

```bash
# Clone the repository
git clone https://github.com/joaovictorbarrera/Memorable.git
cd Memorable

# Navigate to the frontend directory
cd client

# Install dependencies
npm install

# Start the development server
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Backend

```bash
# Navigate to the server directory
cd server

# Set up your environment variables (see below)
# Then run the API
dotnet run
```

### Environment Variables

The backend requires the following environment variables (configure these in your Railway dashboard or a local `.env`/`appsettings` file):

| Variable | Description |
|---|---|
| `DB_HOST` | PostgreSQL host |
| `DB_NAME` | Database name |
| `DB_PASSWORD` | Database password |
| `DB_PORT` | Database port |
| `DB_USER` | Database user |
| `JWT__Key` | JWT signing key |
| `JWT__Issuer` | JWT issuer |
| `JWT__Audience` | JWT audience |
| `JWT__DurationInMinutes` | Access token lifetime |
| `ImgBB__ApiKey` | ImgBB API key |
| `EmailSettings__ApiKey` | SendGrid API key |
| `EmailSettings__SenderEmail` | Sender email address |
| `EmailSettings__SenderName` | Sender display name |

---

## 🔌 API Routes

| Controller | Routes |
|---|---|
| Auth | Login, register, refresh token, logout |
| User | Get profile, search users, update profile |
| Post | Create, read, update, delete posts |
| Like | Like / unlike a post |
| Comment | Create, read, delete comments |
| Follow | Follow / unfollow a user |
| Home | Get personalized feed |

---

## 📦 Deployment

| Layer | Platform | Trigger |
|---|---|---|
| Frontend | Vercel | Push to `main` branch |
| Backend + DB | Railway | Push to `main` branch |

Both services use CI/CD so every push to `main` automatically rebuilds and redeploys.

---

## 📄 License

This project was built as an academic project at Valencia Community College for CEN-4350C (Open-Source Web Technologies).
