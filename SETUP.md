# Prakriti Setup Guide

Welcome to Prakriti, a Pinterest-style professional web application! This guide will help you set up the development environment and get the application running.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Redis** (v6 or higher) - [Download here](https://redis.io/download)
- **Git** - [Download here](https://git-scm.com/)
- **Docker** (optional, for containerized setup) - [Download here](https://www.docker.com/)

## 🚀 Quick Start

### Option 1: Local Development Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd prakriti
```

2. **Install dependencies:**
```bash
npm run install:all
```

3. **Set up environment variables:**
```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment
cp frontend/.env.example frontend/.env
```

4. **Configure your environment variables:**

Edit `backend/.env` with your actual values:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/prakriti
REDIS_URL=redis://localhost:6379

# JWT Secrets (generate strong secrets for production)
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# Cloudinary (for image/video storage)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# Email (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_SOCKET_URL=http://localhost:3001
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_FACEBOOK_APP_ID=your-facebook-app-id
```

5. **Start the databases:**
```bash
# Start MongoDB
mongod

# Start Redis (in another terminal)
redis-server
```

6. **Start the development servers:**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- API Documentation: http://localhost:3001/api-docs

### Option 2: Docker Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd prakriti
```

2. **Create environment file:**
```bash
cp .env.example .env
```

3. **Configure environment variables in `.env`**

4. **Start with Docker Compose:**
```bash
docker-compose up -d
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MongoDB: localhost:27017
- Redis: localhost:6379

## 🛠️ Development Commands

### Root Commands
```bash
npm run dev              # Start both frontend and backend
npm run build            # Build both applications
npm run test             # Run all tests
npm run lint             # Lint all code
npm run docker:up        # Start Docker containers
npm run docker:down      # Stop Docker containers
```

### Frontend Commands
```bash
cd frontend
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run test             # Run tests
npm run lint             # Lint code
npm run typecheck        # Type checking
```

### Backend Commands
```bash
cd backend
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run test             # Run tests
npm run lint             # Lint code
npm run typecheck        # Type checking
```

## 🔧 Configuration

### Database Setup

**MongoDB:**
- Default connection: `mongodb://localhost:27017/prakriti`
- The application will create collections automatically
- For production, use MongoDB Atlas or a managed instance

**Redis:**
- Default connection: `redis://localhost:6379`
- Used for caching and session management
- For production, use Redis Cloud or a managed instance

### External Services

**Cloudinary (Required for image/video uploads):**
1. Create account at [cloudinary.com](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret
3. Add them to your environment variables

**OAuth (Optional):**
- **Google:** Create project in [Google Cloud Console](https://console.cloud.google.com/)
- **Facebook:** Create app in [Facebook Developers](https://developers.facebook.com/)

**Email Service (Optional):**
- Configure SMTP settings for email notifications
- Gmail example provided in environment template

## 📁 Project Structure

```
prakriti/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand state management
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── dist/               # Build output
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic
│   │   ├── config/         # Configuration files
│   │   └── utils/          # Utility functions
│   ├── logs/               # Application logs
│   └── dist/               # Build output
├── shared/                   # Shared types and utilities
│   └── types/              # TypeScript type definitions
├── docker-compose.yml        # Docker configuration
└── README.md
```

## 🌟 Features

### Core Features
- ✅ **Authentication**: JWT with OAuth support (Google, Facebook)
- ✅ **Home Feed**: Personalized content with infinite scrolling
- ✅ **Explore**: Trending content with advanced filters
- ✅ **Upload**: Image/video upload with metadata
- ✅ **Real-time Features**: WebSocket-based notifications and messaging
- ✅ **User Profiles**: Customizable profiles with analytics
- ✅ **Boards & Collections**: Organize content with drag-and-drop
- ✅ **Search**: Advanced search with autocomplete
- ✅ **Admin Dashboard**: Content moderation and analytics
- ✅ **Responsive Design**: Mobile-first approach

### Technical Features
- ✅ **TypeScript**: Full type safety across frontend and backend
- ✅ **Modern React**: Hooks, Context, Suspense
- ✅ **State Management**: Zustand for client state
- ✅ **Data Fetching**: React Query for server state
- ✅ **Styling**: Tailwind CSS with custom design system
- ✅ **Animations**: Framer Motion for smooth interactions
- ✅ **Real-time**: Socket.IO for live features
- ✅ **File Upload**: Cloudinary integration
- ✅ **Caching**: Redis for performance
- ✅ **Security**: Helmet, CORS, rate limiting
- ✅ **Testing**: Jest and Vitest setup
- ✅ **Docker**: Containerized deployment
- ✅ **API Documentation**: Swagger/OpenAPI

## 🚦 Getting Started

1. **First Time Setup:**
   - Follow the setup instructions above
   - Create a Cloudinary account for image uploads
   - Set up OAuth apps if needed

2. **Development Workflow:**
   - Make changes to the code
   - The development servers will auto-reload
   - Check the browser console and terminal for errors
   - Use the API documentation at `/api-docs`

3. **Testing:**
   - Write tests for new features
   - Run `npm run test` to execute all tests
   - Check coverage reports

4. **Deployment:**
   - Build the applications: `npm run build`
   - Deploy using Docker or your preferred method
   - Set up environment variables for production

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill processes on ports 3001 and 5173
lsof -ti:3001 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

**Database connection issues:**
- Ensure MongoDB and Redis are running
- Check connection strings in environment variables
- Verify firewall settings

**Build errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run typecheck`
- Verify environment variables are set

**Image upload not working:**
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper CORS configuration

### Getting Help

- Check the [API documentation](http://localhost:3001/api-docs)
- Review the application logs in `backend/logs/`
- Check browser developer tools for frontend issues
- Refer to the individual README files in frontend and backend directories

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Redis Documentation](https://redis.io/documentation)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy coding! 🎉