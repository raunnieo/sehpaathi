# 🖥️ Sehpaathi Backend - Node.js API Server

The backend server for Sehpaathi, an AI-powered educational platform built with Node.js, Express, and integrated with Firebase, Google Drive, and Groq AI services.

## 🏗️ Architecture Overview

The backend follows a layered architecture pattern with clear separation of concerns:

```
┌─────────────────┐
│   HTTP Layer    │ ← Routes & Middleware
├─────────────────┤
│ Controller Layer│ ← Request/Response Logic
├─────────────────┤
│  Service Layer  │ ← Business Logic
├─────────────────┤
│   Data Layer    │ ← Firebase & Google Drive
└─────────────────┘
```

## 📁 Directory Structure

```
backend/
├── config/                 # Configuration files
│   ├── firebase.js        # Firebase Admin SDK initialization
│   ├── googleDrive.js     # Google Drive API setup
│   └── index.js           # Configuration exports
├── controllers/           # Request handling logic
│   └── chatController.js  # AI chat request handlers
├── middleware/            # Express middleware
│   ├── auth.js           # Firebase token verification
│   ├── errorHandler.js   # Global error handling
│   └── validation.js     # Request validation schemas
├── routes/               # API route definitions
│   ├── chat.js          # /api/chat/* endpoints
│   ├── docs.js          # /docs/* API documentation
│   ├── files.js         # /api/files/* file management
│   └── health.js        # /health system status
├── services/            # Business logic & external APIs
│   ├── chat.js         # Chat orchestration service
│   ├── driveService.js # Google Drive operations
│   ├── groq.js         # Groq AI integration
│   └── groqService.js  # AI service abstraction
├── utils/              # Utility functions
│   ├── errors.js       # Custom error classes
│   └── logger.js       # Logging utilities
├── package.json        # Dependencies & scripts
├── server.js          # Main server entry point
├── main.js           # Alternative entry point
├── combined.log      # Application logs
└── error.log         # Error logs
```

## 🔧 Key Components

### 1. Server Configuration (server.js)
**Purpose**: Main server initialization and middleware configuration
**Impact**: Affects all incoming requests and server behavior

**Key Features**:
- **Security**: Helmet for security headers, CORS configuration
- **Rate Limiting**: 100 requests per 15 minutes in production
- **Compression**: Gzip compression for responses >100KB
- **Parsing**: JSON and URL-encoded request parsing
- **Static Files**: Serves public directory
- **Graceful Shutdown**: Clean server shutdown on process signals

**Configuration Flow**:
```javascript
1. Load environment variables
2. Apply security middleware (Helmet, CORS)
3. Configure rate limiting
4. Set up compression
5. Configure body parsing
6. Mount API routes
7. Add error handlers
8. Start server with graceful shutdown
```

### 2. Authentication Middleware (middleware/auth.js)
**Purpose**: Validates Firebase ID tokens for protected routes
**Impact**: Secures all protected API endpoints

**Process Flow**:
```javascript
1. Extract Bearer token from Authorization header
2. Verify token with Firebase Admin SDK
3. Decode user information from token
4. Attach user data to request object
5. Continue to next middleware/route handler
```

**Usage**: Applied to routes requiring authentication
```javascript
router.post('/upload', verifyToken, upload.single('file'), handler);
```

### 3. Chat System

#### Chat Controller (controllers/chatController.js)
**Purpose**: Handles AI chat requests and responses
**Impact**: Processes all AI interactions

**Validation**:
- Message required and non-empty
- Maximum 10,000 characters
- String type validation

**Response Format**:
```json
{
  "status": "success",
  "data": {
    "message": {
      "text": "AI response content",
      "sender": "ai"
    }
  }
}
```

#### Chat Service (services/chat.js)
**Purpose**: Orchestrates chat functionality
**Impact**: Bridges controller and AI service

**Flow**:
```javascript
1. Receive message from controller
2. Forward to Groq service
3. Return formatted response
4. Handle errors gracefully
```

#### Groq AI Service (services/groq.js)
**Purpose**: Integrates with Groq's LLaMA-3 70B model
**Impact**: Powers all AI responses in the application

**Key Features**:
- **Singleton Pattern**: Single instance across application
- **Conversation History**: Maintains 1000-message context
- **System Prompt**: Configured for educational assistance
- **Error Handling**: Comprehensive error types and recovery

**AI Configuration**:
```javascript
{
  model: 'llama3-70b-8192',
  temperature: 0.3,        // Focused, less random responses
  max_tokens: 1024,        // Response length limit
  messages: [
    { role: 'system', content: systemPrompt },
    ...conversationHistory,
    { role: 'user', content: userMessage }
  ]
}
```

**System Prompt Features**:
- Markdown formatting with headers and emphasis
- Code syntax highlighting
- Emoji integration for engagement
- Engineering-focused examples
- Encouraging and supportive tone

### 4. File Management System

#### File Routes (routes/files.js)
**Purpose**: Handles file upload, listing, and management
**Impact**: Enables resource sharing and storage

**Key Endpoints**:
- `POST /upload` - Upload files to Google Drive
- `GET /list` - List user's uploaded files
- File size limits: 100MB for users, 50MB for admin uploads
- Supported formats: PDF, PPT, PPTX, DOC, DOCX

#### Drive Service (services/driveService.js)
**Purpose**: Manages Google Drive operations
**Impact**: Handles all file storage and sharing

**Key Operations**:
```javascript
1. Create user-specific folders (Sehpaathi_{uid})
2. Upload files with proper permissions
3. Set sharing permissions (anyone with link)
4. Generate shareable view/download links
5. Organize files by categories and metadata
```

**Folder Structure**:
```
Google Drive/
└── Sehpaathi_{user_id}/
    ├── Class Notes/
    ├── Lecture PPTs/
    ├── Previous Year Questions/
    ├── Practical Reports/
    └── Proficiency Papers/
```

### 5. Configuration Management

#### Firebase Configuration (config/firebase.js)
**Purpose**: Initializes Firebase Admin SDK
**Impact**: Enables authentication and database operations

**Setup**:
```javascript
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
```

#### Google Drive Configuration (config/googleDrive.js)
**Purpose**: Sets up Google Drive API client
**Impact**: Enables file storage and management

**Authentication**:
- Service account credentials
- Drive API v3 integration
- Automatic permission management

## 🚀 API Endpoints

### Chat Endpoints
```
POST /api/chat/message
Content-Type: application/json
Authorization: Bearer {firebase_token}

Request:
{
  "message": "Explain quantum physics"
}

Response:
{
  "status": "success",
  "data": {
    "message": {
      "text": "# Quantum Physics Explanation...",
      "sender": "ai"
    }
  }
}
```

### File Management Endpoints
```
POST /api/files/upload
Content-Type: multipart/form-data
Authorization: Bearer {firebase_token}

Request:
- file: (binary file data)

Response:
{
  "success": true,
  "message": "File uploaded successfully",
  "file": {
    "id": "drive_file_id",
    "name": "filename.pdf",
    "viewUrl": "https://drive.google.com/...",
    "downloadUrl": "https://drive.google.com/..."
  }
}
```

### System Endpoints
```
GET /health
Response:
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "memory": {...},
  "services": {
    "groq": "connected",
    "firebase": "connected",
    "drive": "connected"
  }
}

GET /docs
Response: Swagger UI documentation interface
```

## 🛡️ Security Features

### 1. Authentication
- Firebase ID token verification
- Bearer token extraction
- User context attachment
- Token expiration handling

### 2. Rate Limiting
- 100 requests per 15 minutes (production)
- 1000 requests per 15 minutes (development)
- IP-based tracking
- Configurable limits per environment

### 3. CORS Configuration
```javascript
{
  origin: allowedOrigins,           // Environment-specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,               // Allow cookies/auth headers
  maxAge: 86400                   // Cache preflight for 24 hours
}
```

### 4. Security Headers (Helmet)
- Content Security Policy
- Cross-Origin policies
- DNS prefetch control
- Frame protection
- HSTS (HTTP Strict Transport Security)
- XSS filtering

### 5. Input Validation
- Request body size limits (100MB for files, 10MB for JSON)
- File type validation
- Message length limits
- SQL injection prevention
- XSS protection

## 🔧 Environment Configuration

### Required Environment Variables
```bash
# Server Configuration
PORT=3000
NODE_ENV=development|production
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5174

# Firebase Admin SDK
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}

# Google Drive API (Service Account)
GOOGLE_DRIVE_CREDENTIALS={"type":"service_account",...}

# Groq AI API
GROQ_API_KEY=gsk_...

# Security
ALLOWED_ORIGINS=http://localhost:5174,https://yourdomain.com
```

### Configuration Impact
- **PORT**: Server listening port
- **NODE_ENV**: Affects logging, error details, rate limits
- **FIREBASE_SERVICE_ACCOUNT_JSON**: Enables user authentication
- **GOOGLE_DRIVE_CREDENTIALS**: Enables file storage
- **GROQ_API_KEY**: Enables AI chat functionality
- **ALLOWED_ORIGINS**: Controls CORS access

## 🚀 Startup Process

### 1. Server Initialization
```javascript
1. Load environment variables from .env
2. Initialize Express application
3. Configure security middleware
4. Set up rate limiting
5. Configure CORS
6. Set up body parsing
7. Mount API routes
8. Add error handlers
9. Start HTTP server
10. Set up graceful shutdown handlers
```

### 2. Service Initialization
```javascript
Firebase Admin SDK ← Service Account JSON
Google Drive API ← Service Account Credentials  
Groq Client ← API Key
```

### 3. Route Registration
```javascript
/api/files/* ← File management operations
/api/chat/* ← AI chat functionality
/docs/* ← API documentation
/health ← System health checks
/ ← Server status page
```

## 🔄 Request/Response Flow

### AI Chat Request Flow
```
1. Client → POST /api/chat/message
2. CORS + Security headers applied
3. Rate limiting check
4. JSON body parsing
5. Route matching → chatController.sendMessage
6. Message validation (length, type)
7. chatService.generateResponse()
8. groqService.generateResponse()
9. Groq API call with conversation history
10. Response formatting and return
11. Conversation history updated
12. Response sent to client
```

### File Upload Flow
```
1. Client → POST /api/files/upload
2. Security middleware applied
3. Token verification → req.user attached
4. Multer file parsing (memory storage)
5. File validation (type, size)
6. DriveService.ensureSehpaathiFolder()
7. File upload to Google Drive
8. Permission setting (public read)
9. Metadata extraction
10. Response with file URLs
```

## 🔍 Error Handling

### Global Error Handler
```javascript
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
    requestId: req.id
  });
});
```

### Custom Error Classes
```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}
```

### Error Types
- **Authentication Errors** (401): Invalid/missing tokens
- **Validation Errors** (400): Invalid request data
- **Rate Limit Errors** (429): Too many requests
- **Service Errors** (503): External API failures
- **Server Errors** (500): Internal server issues

## 📊 Logging & Monitoring

### Winston Logger Configuration
```javascript
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Health Monitoring
- **Uptime tracking**: Server start time and duration
- **Memory usage**: Heap and RSS memory statistics
- **Service status**: External service connectivity
- **Error rates**: Error frequency and types

## 🔧 Development & Testing

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Start with auto-reload (if nodemon installed)
npm run dev
```

### Testing
```bash
# Run API tests
npm test

# Test specific services
node test-groq.js
node test-models.js
```

### Debugging
- **Console Logging**: Color-coded server logs
- **File Logging**: Persistent log files
- **Error Tracking**: Detailed error stack traces
- **Request Logging**: Morgan HTTP request logging

## 🚀 Production Deployment

### Pre-deployment Checklist
- [ ] Environment variables configured
- [ ] Firebase service account JSON set
- [ ] Google Drive credentials configured
- [ ] Groq API key valid
- [ ] CORS origins updated for production
- [ ] Rate limits configured appropriately
- [ ] SSL/TLS certificates in place

### Performance Optimizations
- **Compression**: Gzip compression for responses
- **Caching**: Static file caching
- **Rate Limiting**: Prevent abuse
- **Connection Pooling**: Efficient database connections
- **Graceful Shutdown**: Clean process termination

### Monitoring in Production
- **Health Checks**: Regular endpoint monitoring
- **Error Tracking**: Centralized error logging
- **Performance Metrics**: Response time monitoring
- **Resource Usage**: Memory and CPU tracking

---

This backend serves as the robust foundation for the Sehpaathi educational platform, providing secure, scalable, and intelligent services to support student learning and collaboration.
