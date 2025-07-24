# Prakriti - Pinterest-Style Professional Web Application

A professional-grade platform where users can upload, view, and interact with image/video content in a Pinterest-style interface.

## 🎯 Project Overview

Prakriti is a comprehensive social media platform for creators and users to share and explore visual content. It features user profiles, real-time messaging, notifications, boards, intelligent content discovery, and AI-powered features.

## 🛠️ Tech Stack

### Frontend
- **React.js** with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Framer Motion** for animations
- **React Query** for data fetching
- **Socket.IO Client** for real-time features

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Socket.IO** for real-time communication
- **JWT** for authentication
- **Multer** for file uploads
- **Rate limiting** and security middleware

### Database
- **MongoDB** with Mongoose ODM
- **Redis** for caching and sessions
- **Cloudinary** for image/video storage

### Development Tools
- **Vite** for fast development
- **ESLint** and **Prettier** for code quality
- **Jest** for unit testing
- **Docker** for containerization

## 🚀 Features

- **Authentication**: JWT, OAuth (Google, Facebook), 2FA
- **Home Feed**: Personalized content with infinite scrolling
- **Explore**: Trending content with advanced filters
- **Upload**: Image/video upload with metadata
- **Real-time Notifications**: WebSocket-based alerts
- **Messaging**: Real-time chat with media support
- **User Profiles**: Customizable profiles with analytics
- **Boards & Collections**: Organize content with drag-and-drop
- **Search**: Advanced search with autocomplete
- **AI Features**: Tag suggestions, content moderation
- **Admin Dashboard**: Content moderation and analytics
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
prakriti/
├── frontend/                 # React.js frontend application
├── backend/                  # Node.js backend API
├── shared/                   # Shared types and utilities
├── docker-compose.yml        # Docker configuration
└── README.md
```

## 🏗️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB
- Redis
- Docker (optional)

### Quick Start

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd prakriti
npm run install:all
```

2. **Set up environment variables:**
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. **Start development servers:**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- MongoDB: localhost:27017
- Redis: localhost:6379

### Docker Setup (Alternative)

```bash
docker-compose up -d
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run frontend tests
npm run test:frontend

# Run backend tests
npm run test:backend
```

## 📚 API Documentation

API documentation is available at `http://localhost:3001/api-docs` when running the backend server.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [API Documentation](http://localhost:3001/api-docs)