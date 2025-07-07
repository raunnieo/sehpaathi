# 🎓 Sehpaathi - Modern Engineering Education Platform

**Sehpaathi** is a comprehensive AI-powered educational platform designed specifically for engineering students at MITS Gwalior. It combines modern web technologies with artificial intelligence to provide an all-in-one learning experience featuring AI assistance, resource management, collaborative study materials, and an enhanced user experience with smooth animations and multi-language support.

## 🌟 Project Overview

Sehpaathi transforms the traditional learning experience by offering:
- **AI-Powered Study Assistant**: Intelligent chatbot powered by Groq's LLaMA model with multi-language support
- **Enhanced User Experience**: Smooth scrolling animations and interactive UI components
- **Resource Management**: Personal document organization and file storage
- **Materials Browser**: Centralized access to course materials across branches and semesters
- **Google Drive Integration**: Seamless file upload and sharing capabilities
- **Firebase Authentication**: Secure user management with Google OAuth
- **Interactive Demo**: Fixed-layout demo page with video tutorials and real-time chat

## 🏗️ Architecture

### Frontend (React + Vite) - Enhanced UX
- **Technology Stack**: React 18, Vite, TailwindCSS, Material-UI
- **Animations**: Intersection Observer API for smooth scroll animations
- **State Management**: Redux Toolkit + React Context for theme management
- **Routing**: React Router DOM with enhanced navigation guards
- **Authentication**: Firebase Auth with Google OAuth
- **Deployment**: Vercel with GitHub Pages support
- **UI Enhancements**: Custom scrollbars, hover animations, and transition effects

### Backend (Node.js + Express)
- **Technology Stack**: Node.js, Express.js, Firebase Admin SDK
- **AI Integration**: Groq SDK for LLaMA-3 70B model
- **File Storage**: Google Drive API integration
- **Security**: Helmet, CORS, rate limiting, compression
- **Documentation**: Swagger/OpenAPI

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Authentication enabled
- Google Cloud Console project with Drive API enabled
- Groq API key

### Environment Setup

**Backend (.env)**
```env
# Server Configuration
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5174

# Firebase Configuration
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}

# Google Drive API
GOOGLE_DRIVE_CREDENTIALS={"type":"service_account",...}

# AI Configuration
GROQ_API_KEY=your_groq_api_key_here

# Security
ALLOWED_ORIGINS=http://localhost:5174,https://your-frontend-domain.com
```

**Frontend (.env)**
```env
# Environment
VITE_ENVIRONMENT=local

# Backend URLs
VITE_BACKEND_URL=http://localhost:3000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### Installation & Running

**1. Clone the repository**
```bash
git clone <repository-url>
cd sehpaathi
```

**2. Backend Setup**
```bash
cd backend
npm install
npm start
```
*Backend runs on http://localhost:3000*

**3. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on http://localhost:5174*

## 🎯 Features & Functionality

### 🎨 Enhanced User Experience (NEW)
- **Smooth Scrolling**: Native smooth scrolling with intersection observer animations
- **Custom Scrollbars**: Gradient-styled scrollbars with hover effects
- **Section Animations**: Fade-in animations triggered by scroll position
- **Interactive Components**: Hover effects and micro-interactions throughout the UI
- **Multi-Language Demo**: Modular component showcasing AI capabilities in 7+ languages
- **Fixed Demo Layout**: Non-scrolling demo page with side-by-side video and chat

### 🤖 AI Assistant (Sehpaathi)
- **Intelligent Responses**: Context-aware answers using Groq's LLaMA-3 70B model
- **Multi-Language Support**: Responses in English, Hindi, Sanskrit, Spanish, French, German
- **Conversation History**: Maintains chat context with 1000-message memory
- **Markdown Support**: Rich text formatting with code syntax highlighting
- **Copy Functionality**: Easy copying of AI responses and code blocks
- **Real-time Typing Indicators**: Visual feedback during AI processing
- **Interactive Prompts**: Pre-configured question suggestions for quick queries

### 📚 Resource Management
- **File Upload**: Direct integration with Google Drive for secure storage
- **Resource Categories**: Notes, bookmarks, videos, files, and media
- **Personal Collections**: User-specific resource organization via Firestore
- **Quick Access**: Instant retrieval and management of study materials
- **Share Links**: Auto-generated shareable links for uploaded files
- **Animated Cards**: Interactive resource cards with hover animations

### 🗂️ Materials Browser
- **Branch-wise Organization**: Resources categorized by engineering branches
- **Semester Navigation**: Materials organized by academic semesters
- **Material Types**: Class notes, PPTs, previous papers, practical reports
- **Subject-wise Filtering**: Easy navigation through course subjects
- **Enhanced UI**: Improved visual hierarchy and navigation

### 🔐 Authentication & Security
- **Firebase Authentication**: Google OAuth integration
- **JWT Token Verification**: Secure API access with Firebase ID tokens
- **Rate Limiting**: Protection against API abuse (100 requests/15 minutes)
- **CORS Protection**: Configurable origin restrictions
- **Helmet Security**: Comprehensive security headers
- **Profile Guards**: Enhanced route protection based on profile completion

## 📁 Project Structure

```
sehpaathi/
├── backend/                    # Node.js Express Server
│   ├── config/                # Configuration files
│   │   ├── firebase.js        # Firebase Admin SDK setup
│   │   ├── googleDrive.js     # Google Drive API configuration
│   │   └── index.js           # Config exports
│   ├── controllers/           # Request handlers
│   │   └── chatController.js  # AI chat endpoint logic
│   ├── middleware/            # Express middleware
│   │   ├── auth.js           # Firebase token verification
│   │   ├── errorHandler.js   # Global error handling
│   │   └── validation.js     # Request validation
│   ├── routes/               # API endpoints
│   │   ├── chat.js          # AI chat routes
│   │   ├── docs.js          # API documentation
│   │   ├── files.js         # File management routes
│   │   └── health.js        # Health check endpoint
│   ├── services/            # Business logic
│   │   ├── chat.js         # Chat service orchestration
│   │   ├── driveService.js # Google Drive operations
│   │   ├── groq.js         # Groq AI integration
│   │   └── groqService.js  # AI service wrapper
│   ├── utils/              # Utility functions
│   │   ├── errors.js       # Custom error classes
│   │   └── logger.js       # Logging utilities
│   ├── package.json        # Backend dependencies
│   └── server.js          # Main server file
├── frontend/                  # React Application
│   ├── src/
│   │   ├── app/              # Redux store configuration
│   │   │   └── store.js      # Redux store setup
│   │   ├── auth/             # Authentication utilities
│   │   │   ├── authService.js # Auth helper functions
│   │   │   └── firebase.js    # Firebase client config
│   │   ├── components/       # Reusable UI components
│   │   │   ├── AI/           # AI Assistant components
│   │   │   ├── DashboardHeader/ # Dashboard navigation
│   │   │   ├── DateHeader/   # Date display component (NEW)
│   │   │   ├── Footer/       # Footer component
│   │   │   ├── Header/       # Main header
│   │   │   ├── Materials/    # Materials browser
│   │   │   ├── MultiLanguageSection/ # Multi-language demo (NEW)
│   │   │   ├── Profile/      # User profile
│   │   │   ├── ProfileCompletionCard/ # Profile completion tracker (NEW)
│   │   │   ├── QuickAccess.jsx/ # Dashboard shortcuts
│   │   │   ├── ResourceManager/ # Resource management
│   │   │   ├── Sidebar/      # Navigation sidebar
│   │   │   └── ThemeToggle/  # Dark/light mode toggle (NEW)
│   │   ├── contexts/         # React Context providers (NEW)
│   │   │   ├── context.js    # General app context
│   │   │   ├── ThemeContext.jsx # Theme state management
│   │   │   └── useTheme.js   # Theme hook
│   │   ├── features/         # Redux slices
│   │   │   └── user/         # User state management
│   │   ├── pages/           # Route components
│   │   │   ├── About/       # About page (enhanced with animations)
│   │   │   ├── ComingSoon/  # Coming soon page (NEW)
│   │   │   ├── ContactSupport/ # Support page (NEW)
│   │   │   ├── Dashboard/   # Main dashboard (enhanced)
│   │   │   │   ├── AIChat.jsx # AI chat interface
│   │   │   │   ├── Dashboard.jsx # Main dashboard
│   │   │   │   ├── DashboardHome.jsx # Dashboard home view
│   │   │   │   ├── Materials.jsx # Materials management
│   │   │   │   ├── Profile.jsx # Profile settings
│   │   │   │   └── Resources.jsx # Resource browser
│   │   │   ├── Demo/        # Interactive demo page (NEW)
│   │   │   ├── Error/       # Error handling
│   │   │   ├── Home/        # Landing page (enhanced with scroll animations)
│   │   │   ├── Signin/      # Login page
│   │   │   ├── Signup/      # Registration page
│   │   │   └── UserCustomization/ # User preferences (NEW)
│   │   ├── route/           # Route protection
│   │   │   ├── PrivateRoute.jsx # Auth-protected routes
│   │   │   └── ProfileGuard.jsx # Profile completion guard (NEW)
│   │   ├── services/        # API services
│   │   │   └── materialServices.js # Material API calls
│   │   ├── constants.js     # App constants and configurations
│   │   ├── index.css       # Enhanced base styles with smooth scrolling (UPDATED)
│   │   ├── App.jsx         # Root component
│   │   ├── Layout.jsx      # Main layout wrapper
│   │   └── main.jsx        # Application entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md              # This file
```

## 🔄 How Everything Works Together

### 1. Application Startup
**Backend Initialization:**
- Server starts on port 3000 with security middleware
- Firebase Admin SDK initializes with service account
- Google Drive API configures with credentials
- Groq client initializes with API key
- Routes register and middleware applies

**Frontend Initialization:**
- Vite dev server starts on port 5174
- React router configures with protected routes
- Redux store initializes with user state
- Firebase client SDK initializes
- Components mount and Firebase auth listener activates

### 2. User Authentication Flow
1. User clicks "Sign in with Google" on frontend
2. Firebase Auth handles Google OAuth popup
3. Frontend receives Firebase ID token
4. Token stored in Redux state for API calls
5. Backend middleware verifies token on protected routes
6. User redirected to dashboard upon successful auth

### 3. AI Chat Interaction
1. User types message in AI Assistant component
2. Frontend sends POST request to `/api/chat/message`
3. Backend validates message and forwards to GroqService
4. Groq API processes message with LLaMA-3 model
5. Response formatted with markdown and returned
6. Frontend displays AI response with syntax highlighting

### 4. File Upload & Management
1. User selects file in Resource Manager
2. Frontend gets Firebase ID token
3. File uploaded to backend `/api/files/upload` endpoint
4. Backend verifies token and uploads to Google Drive
5. Drive service creates user-specific folder
6. File permissions set for sharing
7. File metadata saved to Firestore
8. Frontend updates local state with new resource

### 5. Real-time Data Sync
- Firestore listeners in Dashboard component
- Real-time updates for user resources
- Automatic UI refresh on data changes
- Optimistic updates for better UX

## ✨ Recent Enhancements (Latest Update)

### 🎨 User Interface & Experience
- **Smooth Scrolling**: Implemented native CSS smooth scrolling across all pages
- **Scroll Animations**: Added intersection observer-based animations for section entrances
- **Custom Scrollbars**: Gradient-styled scrollbars that match the app theme
- **Enhanced Animations**: Improved hover effects and micro-interactions
- **Mobile Responsiveness**: Better responsive design for mobile devices

### 🌍 Multi-Language Support
- **Modular Component**: Created dedicated `MultiLanguageSection` component
- **7 Language Cards**: English, Hindi, Sanskrit, Spanish, French, German + "Many More"
- **Flag Gradients**: Country-inspired gradient backgrounds for language cards
- **Interactive Demo**: Real-time language switching in demo chat
- **Responsive Layout**: Optimized for both desktop and mobile viewing

### 🎥 Demo Page Redesign
- **Fixed Viewport**: Eliminated page scrolling for better demo experience
- **Video Integration**: Embedded YouTube tutorial alongside interactive chat
- **Side-by-side Layout**: Video on left, chat demo on right (desktop)
- **Mobile Stacking**: Responsive stacking for mobile devices
- **Interactive Elements**: Clickable prompt suggestions and animated indicators

### 🏠 Dashboard Improvements
- **Activity Cards**: Enhanced recent activity cards with animations
- **Interactive Elements**: Hover effects and transitions throughout
- **Visual Hierarchy**: Improved spacing and component organization
- **Performance**: Optimized rendering and reduced unnecessary re-renders

### 🔧 Technical Improvements
- **Context API**: Theme management with React Context
- **Error Handling**: Better error boundaries and user feedback
- **Code Organization**: Modularized components for better maintainability
- **Performance**: Intersection Observer for efficient scroll animations

## 🛠️ Development Workflow

### Adding New Features
1. **Backend API**: Create route → controller → service → test
2. **Frontend Component**: Create component → connect to Redux → integrate API
3. **State Management**: Add Redux slice if needed
4. **Authentication**: Protect routes with middleware/PrivateRoute
5. **Animations**: Add intersection observer for scroll-triggered animations

### File Impact Analysis
- **server.js**: Main server configuration affects all requests
- **App.jsx**: Root component changes affect entire frontend
- **Dashboard.jsx**: Central hub affecting all dashboard features
- **groq.js**: AI service changes affect chat functionality
- **firebase.js (both)**: Auth changes affect entire user system
- **index.css**: Global style changes affect entire application
- **MultiLanguageSection.jsx**: Isolated component for multi-language features

## 🔍 API Endpoints

### Authentication Required
- `POST /api/chat/message` - Send message to AI
- `POST /api/files/upload` - Upload file to Drive
- `GET /api/files/list` - List user files

### Public Endpoints
- `GET /health` - Health check
- `GET /docs` - API documentation
- `GET /` - Server status page

## 🚀 Deployment

### Backend Deployment
- Configure environment variables on hosting platform
- Ensure Firebase service account JSON is properly set
- Set up Google Drive API credentials
- Configure CORS for production frontend URL

### Frontend Deployment
- Build with `npm run build`
- Configure environment variables for production
- Set up domain in Firebase Auth settings
- Deploy to Vercel/Netlify with build command

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📜 License

This project is a product in development and is not yet licensed for public use.


