# 🎨 Sehpaathi Frontend - Modern React Application

The frontend client for Sehpaathi, an AI-powered educational platform built with React 18, Vite, and modern web technologies. Features smooth scrolling animations, multi-language support, and an intuitive interface for AI chat, resource management, and study materials access.

## 🏗️ Architecture Overview

The frontend follows a modern component-based architecture with React and Redux for state management:

```
┌─────────────────┐
│   Presentation  │ ← Components & Pages (Enhanced UX)
├─────────────────┤
│   State Mgmt    │ ← Redux Store & Context API
├─────────────────┤
│   Services      │ ← API Calls & Auth
├─────────────────┤
│   Routing       │ ← React Router & Guards
├─────────────────┤
│   Animations    │ ← Smooth Scroll & Transitions
└─────────────────┘
```

## ✨ Recent Enhancements

### 🎨 User Experience Improvements
- **Smooth Scrolling**: Implemented native smooth scrolling across all pages
- **Scroll Animations**: Added intersection observer-based animations for sections
- **Custom Scrollbars**: Styled scrollbars with gradient themes
- **Multi-Language Section**: Modularized component with 7 language cards + "many more"
- **Enhanced Animations**: Improved card interactions and hover effects

### 🚀 Demo Page Redesign
- **Fixed Layout**: Non-scrolling viewport with proper overflow handling
- **Video Integration**: Embedded YouTube tutorial with side-by-side chat demo
- **Interactive Elements**: Clickable prompt suggestions and animated typing indicators
- **Mobile Responsive**: Stacked layout for mobile, side-by-side for desktop

### 🌟 Dashboard Enhancements
- **Interactive Cards**: Recent activity cards with hover animations
- **Improved Layout**: Better spacing and visual hierarchy
- **Performance**: Optimized re-renders and smooth transitions

## 📁 Updated Directory Structure

```
frontend/
├── public/                    # Static assets
│   ├── assets/               # Images and icons
│   │   ├── favico.ico       # Favicon
│   │   ├── gif.gif          # Loading animations
│   │   ├── kavya.jpg        # Team member photo
│   │   ├── raunak.jpg       # Team member photo
│   │   ├── logo.png         # App logo variants
│   │   ├── notwhite.png     # Logo variants
│   │   ├── white.png        # Logo variants
│   │   └── react.svg        # React logo
│   └── vite.svg             # Vite logo
├── src/                      # Source code
│   ├── app/                 # Redux configuration
│   │   └── store.js         # Redux store setup
│   ├── auth/                # Authentication services
│   │   ├── authService.js   # Auth utility functions
│   │   └── firebase.js      # Firebase client configuration
│   ├── components/          # Reusable UI components
│   │   ├── AddResourceModal/
│   │   │   └── AddResourceModal.jsx # Resource creation modal
│   │   ├── AI/
│   │   │   └── Assistant.jsx # AI chat interface
│   │   ├── DashboardHeader/
│   │   │   └── DashboardHeader.jsx # Dashboard navigation
│   │   ├── DateHeader/       # NEW: Date display component
│   │   ├── Footer/
│   │   │   └── Footer.jsx   # App footer
│   │   ├── Header/
│   │   │   └── Header.jsx   # Main header
│   │   ├── Materials/
│   │   │   └── MaterialsBrowser.jsx # Course materials browser
│   │   ├── MultiLanguageSection/  # NEW: Modularized component
│   │   │   └── MultiLanguageSection.jsx # Multi-language AI demo
│   │   ├── Profile/
│   │   │   └── Profile.jsx  # User profile component
│   │   ├── ProfileCompletionCard/
│   │   │   └── ProfileCompletionCard.jsx # Profile completion tracker
│   │   ├── QuickAccess.jsx/ # Dashboard shortcuts
│   │   │   └── QuickAccess.jsx
│   │   ├── ResourceManager/
│   │   │   └── ResourceManager.jsx # Resource management
│   │   ├── Sidebar/
│   │   │   └── Sidebar.jsx  # Navigation sidebar
│   │   └── ThemeToggle/     # NEW: Dark/light mode toggle
│   │       └── ThemeToggle.jsx
│   ├── contexts/            # React Context providers
│   │   ├── context.js       # General app context
│   │   ├── ThemeContext.jsx # Theme state management
│   │   └── useTheme.js      # Theme hook
│   ├── features/            # Redux slices
│   │   └── user/
│   │       └── userSlice.js # User state management
│   ├── pages/              # Route components
│   │   ├── About/
│   │   │   └── About.jsx   # About page (enhanced with smooth scroll)
│   │   ├── ComingSoon/     # NEW: Coming soon page
│   │   │   └── ComingSoon.jsx
│   │   ├── ContactSupport/ # NEW: Support page
│   │   │   └── ContactSupport.jsx
│   │   ├── Dashboard/
│   │   │   ├── AIChat.jsx  # AI chat interface
│   │   │   ├── Dashboard.jsx # Main dashboard
│   │   │   ├── DashboardHome.jsx # Dashboard home view
│   │   │   ├── Materials.jsx # Materials management
│   │   │   ├── Profile.jsx # Profile settings
│   │   │   └── Resources.jsx # Resource browser
│   │   ├── Demo/           # NEW: Interactive demo page
│   │   │   └── Demo.jsx    # Fixed-layout demo with video
│   │   ├── Error/
│   │   │   ├── Error.jsx   # Error page
│   │   │   └── Error_new.jsx # Alternative error page
│   │   ├── Home/
│   │   │   └── Home.jsx    # Landing page (enhanced with scroll animations)
│   │   ├── Signin/
│   │   │   └── Signin.jsx  # Login page
│   │   ├── Signup/
│   │   │   └── Signup.jsx  # Registration page
│   │   └── UserCustomization/ # NEW: User preferences
│   │       └── UserCustomization.jsx
│   ├── route/              # Route protection
│   │   ├── PrivateRoute.jsx # Authentication guard
│   │   └── ProfileGuard.jsx # Profile completion guard
│   ├── services/           # API services
│   │   └── materialServices.js # Material API calls
│   ├── App.css            # Global styles
│   ├── App.jsx            # Root component
│   ├── constants.js       # App constants
│   ├── index.css          # Enhanced base styles with smooth scrolling
│   ├── Layout.jsx         # Main layout wrapper
│   └── main.jsx           # Application entry point
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Dependencies & scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # TailwindCSS configuration
├── vercel.json            # Vercel deployment config
└── vite.config.js         # Vite build configuration
```
│   │   ├── Profile/
│   │   │   └── Profile.jsx  # User profile component
│   │   ├── QuickAccess,jsx/
│   │   │   └── QuickAccess.jsx # Dashboard shortcuts
│   │   ├── ResourceManager/
│   │   │   └── ResourceManager.jsx # Resource management
│   │   └── Sidebar/
│   │       └── Sidebar.jsx  # Navigation sidebar
│   ├── features/            # Redux slices
│   │   └── user/
│   │       └── userSlice.js # User state management
│   ├── pages/              # Route components
│   │   ├── About/
│   │   │   └── About.jsx   # About page
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx # Main dashboard
│   │   ├── Error/
│   │   │   └── Error.jsx   # Error page
│   │   ├── Home/
│   │   │   └── Home.jsx    # Landing page
│   │   ├── Signin/
│   │   │   └── Signin.jsx  # Login page
│   │   └── Signup/
│   │       └── Signup.jsx  # Registration page
│   ├── route/              # Route protection
│   │   └── PrivateRoute.jsx # Authentication guard
│   ├── services/           # API services
│   │   └── materialServices.js # Material API calls
│   ├── App.css            # Global styles
│   ├── App.jsx            # Root component
│   ├── constants.js       # App constants
│   ├── index.css          # Base styles
│   ├── Layout.jsx         # Main layout wrapper
│   └── main.jsx           # Application entry point
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Dependencies & scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # TailwindCSS configuration
├── vercel.json            # Vercel deployment config
└── vite.config.js         # Vite build configuration
```

## 🚀 Technology Stack

### Core Technologies
- **React 18**: Modern React with hooks, concurrent features, and Intersection Observer API
- **Vite**: Lightning-fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework with custom scrollbar styling
- **Material-UI**: React component library for enhanced UI elements

### State Management & Context
- **Redux Toolkit**: Modern Redux with simplified syntax
- **React-Redux**: React bindings for Redux
- **React Context**: Theme management and application state
- **useRef & useState**: Local component state and DOM references

### Routing & Navigation
- **React Router DOM v6**: Client-side routing with nested routes
- **Protected Routes**: Authentication-based route guards
- **Profile Guards**: Profile completion-based access control

### UI & Styling Enhancements
- **Lucide React**: Modern icon library with 500+ icons
- **React Markdown**: Markdown rendering for AI responses
- **React Syntax Highlighter**: Code syntax highlighting with themes
- **Emotion**: CSS-in-JS styling (Material-UI dependency)
- **Custom CSS**: Smooth scrolling and transition animations
- **Intersection Observer**: Scroll-triggered animations

### Authentication & Database
- **Firebase Auth**: Google OAuth authentication
- **Firestore**: Real-time database for user data
- **JS-Cookie**: Secure cookie management
- **Environment Variables**: Secure configuration management

### Performance & Development
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic CSS vendor prefixes
- **gh-pages**: Automated deployment to GitHub Pages

## 🔧 Key Components

## 🎭 Animation & User Experience Features

### Smooth Scrolling Implementation

#### Global Smooth Scrolling (index.css)
**Purpose**: Provides native smooth scrolling across the entire application
**Implementation**:
```css
html {
  scroll-behavior: smooth;
}

/* Custom gradient scrollbars */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #6366f1, #8b5cf6);
  border-radius: 10px;
}
```

#### Intersection Observer Animations
**Purpose**: Triggers smooth entrance animations as sections come into view
**Impact**: Creates engaging scroll-triggered animations

**Implementation Pattern**:
```jsx
const [visibleSections, setVisibleSections] = useState(new Set());
const sectionRefs = useRef({});

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    },
    { threshold: 0.1, rootMargin: '50px' }
  );

  Object.values(sectionRefs.current).forEach((ref) => {
    if (ref) observer.observe(ref);
  });

  return () => observer.disconnect();
}, []);
```

#### Section Animation Classes
**Purpose**: Consistent animation patterns across components
**Usage**:
```jsx
<div 
  ref={setSectionRef('hero')}
  className={`transition-all duration-1000 ease-out ${
    visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}
>
```

### Enhanced UI Components

#### MultiLanguageSection Component
**Purpose**: Showcases AI capabilities in multiple languages
**Features**:
- 7 language cards with flag-inspired gradients
- Randomized glow animations
- Interactive demo chat preview
- Responsive grid layout

#### Demo Page Enhancements
**Purpose**: Provides interactive product demonstration
**Features**:
- Fixed viewport (no page scrolling)
- Side-by-side video and chat layout
- Interactive prompt suggestions
- Mobile-responsive stacking
- Real-time language switching

#### Dashboard Improvements
**Purpose**: Enhanced user dashboard experience
**Features**:
- Animated activity cards
- Hover effects and transitions
- Interactive elements with feedback
- Consistent theming and spacing

### 1. Application Entry Point (main.jsx)
**Purpose**: Initializes React application with routing and state management
**Impact**: Sets up the entire application structure

**Key Features**:
- Redux Provider for global state
- React Router with protected routes
- Error boundary with Error component
- Strict mode for development checks

**Route Configuration**:
```jsx
<Route path="/" element={<Layout/>} errorElement={<Error/>}>
  <Route path="" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/signin" element={<Signin />} />
  <Route path="/about" element={<About />} />
  <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
</Route>
```

### 2. Layout System

#### Root App Component (App.jsx)
**Purpose**: Basic app shell (currently simplified)
**Impact**: Provides basic header/footer structure

**Structure**:
```jsx
<div>
  <Header />
  <Home />
  <Footer />
</div>
```

#### Main Layout (Layout.jsx)
**Purpose**: Provides consistent layout wrapper for all pages
**Impact**: Ensures consistent navigation and styling across routes

### 3. Authentication System

#### Firebase Configuration (auth/firebase.js)
**Purpose**: Initializes Firebase client SDK
**Impact**: Enables authentication and database operations

**Configuration**:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

**Google OAuth Setup**:
```javascript
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive.file");
```

#### Private Route Protection (route/PrivateRoute.jsx)
**Purpose**: Protects authenticated routes
**Impact**: Redirects unauthenticated users to signin

**Process**:
1. Check Redux user state
2. Render protected component if authenticated
3. Redirect to signin if not authenticated
4. Show loading state during auth check

#### User State Management (features/user/userSlice.js)
**Purpose**: Manages user authentication state
**Impact**: Provides user data across the application

**State Structure**:
```javascript
{
  user: null,           // User object
  userName: '',         // Display name
  isAuthenticated: false, // Auth status
  loading: false        // Loading state
}
```

**Actions**:
- `signIn`: Set user data and auth status
- `signOut`: Clear user data
- `setLoading`: Manage loading states

### 4. Dashboard System (pages/Dashboard/Dashboard.jsx)
**Purpose**: Main application interface after authentication
**Impact**: Central hub for all app functionality

**State Management**:
```javascript
// UI State
const [isSidebarOpen, setSidebarOpen] = useState(true);
const [selectedRole, setSelectedRole] = useState('dashboard');

// AI Chat State
const [messages, setMessages] = useState([]);
const [aiInput, setAiInput] = useState('');
const [isTyping, setIsTyping] = useState(false);

// Resource Management State
const [resources, setResources] = useState([]);
const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
const [newResource, setNewResource] = useState({
  type: '', title: '', url: '', file: null
});

// Materials Browser State
const [selectedBranch, setSelectedBranch] = useState('');
const [selectedSemester, setSelectedSemester] = useState('');
```

**Key Features**:
- **Role-based Navigation**: Switch between dashboard views
- **Real-time Auth Monitoring**: Firebase auth state listener
- **Firestore Integration**: Real-time resource synchronization
- **API Communication**: Backend integration for chat and files

**Firebase Integration**:
```javascript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      // Set up Firestore listeners for user data
      const resourcesCollection = collection(db, `users/${currentUser.uid}/resources`);
      const unsubscribeResources = onSnapshot(resourcesCollection, (snapshot) => {
        const resourceList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setResources(resourceList);
      });
      return () => unsubscribeResources();
    }
  });
  return () => unsubscribe();
}, []);
```

### 5. AI Assistant System (components/AI/Assistant.jsx)
**Purpose**: Provides AI chat interface with rich text rendering
**Impact**: Main AI interaction component

**Key Features**:
- **Markdown Rendering**: Rich text display with React Markdown
- **Syntax Highlighting**: Code blocks with Prism.js
- **Copy Functionality**: Copy code blocks and responses
- **Typing Indicators**: Visual feedback during AI processing
- **Auto-scroll**: Automatic scroll to new messages
- **Custom Scrollbar**: Styled scrollbar for better UX

**Message Structure**:
```javascript
{
  text: "Message content",
  sender: "user" | "ai"
}
```

**API Integration**:
```javascript
const handleSendMessage = async () => {
  const response = await fetch(`${API_BASE_URL}/api/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: aiInput })
  });
  
  const data = await response.json();
  const aiResponse = {
    text: data.data.message.text,
    sender: 'ai'
  };
  setMessages(msgs => [...msgs, aiResponse]);
};
```

**Markdown Components**:
```jsx
const components = {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
};
```

### 6. Resource Management System

#### Resource Manager (components/ResourceManager/ResourceManager.jsx)
**Purpose**: Manages user's study resources and files
**Impact**: Provides resource CRUD operations

**Resource Types**:
- **Notes**: Text-based study notes
- **Bookmarks**: Web links and references
- **Videos**: YouTube and educational videos
- **Files**: Uploaded documents and materials
- **Media**: Images and visual content

**File Upload Process**:
```javascript
const handleFileUpload = async (user, resource) => {
  const idToken = await user.getIdToken();
  const formData = new FormData();
  formData.append('file', resource.file);

  const response = await fetch(`${API_BASE_URL}/api/files/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${idToken}` },
    body: formData
  });
  
  // Update resource with file URL and save to Firestore
};
```

**Firestore Integration**:
```javascript
const handleAddResource = async () => {
  const resourceData = {
    type: resource.type,
    title: resource.title,
    url: resource.url,
    id: resource.id,
    createdBy: user.uid,
    createdAt: serverTimestamp()
  };

  const userResourcesCollection = collection(db, `users/${user.uid}/resources`);
  await addDoc(userResourcesCollection, resourceData);
};
```

#### Add Resource Modal (components/AddResourceModal/AddResourceModal.jsx)
**Purpose**: Provides interface for creating new resources
**Impact**: Enables resource creation with type-specific fields

### 7. Materials Browser System (components/Materials/MaterialsBrowser.jsx)
**Purpose**: Browse course materials by branch and semester
**Impact**: Provides structured access to educational content

**Navigation Structure**:
```javascript
const branches = [
  { id: "CSE", name: "Computer Science Engineering" },
  { id: "it", name: "Information Technology" },
  { id: "ece", name: "Electronics & Communication" },
  { id: "ee", name: "Electrical Engineering" },
  { id: "me", name: "Mechanical Engineering" }
];

const materialTypes = [
  "Class Notes",
  "Lecture PPTs", 
  "Previous Year Questions",
  "Practical Reports",
  "Proficiency Papers"
];
```

### 8. Navigation System

#### Sidebar (components/Sidebar/Sidebar.jsx)
**Purpose**: Main navigation component
**Impact**: Controls dashboard view switching

**Navigation Options**:
- **Dashboard**: Overview and quick access
- **Sehpaathi**: AI chat assistant
- **Resources**: Personal resource management
- **Materials**: Course materials browser

#### Dashboard Header (components/DashboardHeader/DashboardHeader.jsx)
**Purpose**: Contextual header for dashboard views
**Impact**: Provides view-specific navigation and user info

#### Quick Access (components/QuickAccess,jsx/QuickAccess.jsx)
**Purpose**: Dashboard shortcuts and overview
**Impact**: Provides easy access to main features

## 🔄 Data Flow & State Management

### 1. Authentication Flow
```
1. User clicks "Sign in with Google"
2. Firebase Auth opens Google OAuth popup
3. User grants permissions (including Drive access)
4. Firebase returns ID token and user data
5. Redux store updates with user information
6. Protected routes become accessible
7. Firestore listeners initialize for user data
```

### 2. AI Chat Flow
```
1. User types message in AI Assistant
2. Message added to local state immediately
3. API request sent to backend with Firebase token
4. Typing indicator shown while waiting
5. AI response received and formatted
6. Response added to messages state
7. Auto-scroll to new message
8. Copy functionality available for response
```

### 3. Resource Management Flow
```
1. User creates new resource via modal
2. If file type: Upload to backend with Firebase token
3. Backend uploads to Google Drive and returns URLs
4. Resource data saved to Firestore with user ID
5. Firestore listener updates local state
6. UI updates with new resource
7. Resource can be edited/deleted with Firestore operations
```

### 4. Real-time Data Synchronization
```javascript
// Firestore real-time listeners
const unsubscribeResources = onSnapshot(
  collection(db, `users/${user.uid}/resources`),
  (snapshot) => {
    const resourceList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setResources(resourceList);
  }
);
```

## 🎨 UI/UX Features

### 1. Responsive Design
- **Mobile-first**: TailwindCSS responsive utilities
- **Adaptive Layout**: Sidebar collapses on mobile
- **Touch-friendly**: Appropriate touch targets
- **Cross-platform**: Consistent experience across devices

### 2. Visual Design
- **Modern UI**: Clean, minimalist design
- **Color Scheme**: Blue and purple gradients
- **Icons**: Lucide React icon library
- **Typography**: Clear, readable font hierarchy
- **Animations**: Smooth transitions and loading states

### 3. User Experience
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Feedback**: Success/error notifications
- **Accessibility**: Keyboard navigation and screen reader support

### 4. Interactive Elements
- **Hover Effects**: Visual feedback on interactive elements
- **Focus States**: Clear focus indicators
- **Smooth Scrolling**: Auto-scroll in chat interface
- **Copy to Clipboard**: Easy code/text copying
- **Modal Dialogs**: Clean modal interfaces

## 🔧 Build Configuration

### Vite Configuration (vite.config.js)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/sehpaathi/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### TailwindCSS Configuration (tailwind.config.js)
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...}
      }
    }
  },
  plugins: []
}
```

### ESLint Configuration (eslint.config.js)
- React-specific linting rules
- Hook dependency validation
- JSX accessibility checks
- Code style enforcement

## 🌐 API Integration

### Backend Communication
```javascript
const API_BASE_URL = 
  import.meta.env.VITE_ENVIRONMENT === "local" 
    ? "http://localhost:3000" 
    : `${import.meta.env.VITE_BACKEND_URL}`;
```

### Authentication Headers
```javascript
const token = await user.getIdToken();
const response = await fetch(`${API_BASE_URL}/api/endpoint`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Error Handling
```javascript
try {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
}
```

## 🚀 Development Workflow

### Development Server
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Environment Configuration
```bash
# Development (.env.local)
VITE_ENVIRONMENT=local
VITE_BACKEND_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
# ... other Firebase config
```

### Component Development
1. Create component in appropriate directory
2. Implement with TypeScript-style PropTypes (if using)
3. Add to parent component or route
4. Test in development server
5. Add responsive styles with TailwindCSS

### State Management
1. Create Redux slice in `features/` directory
2. Add slice to store configuration
3. Use `useSelector` and `useDispatch` in components
4. Handle async operations with Redux Toolkit's `createAsyncThunk`

## 📱 Responsive Design Breakpoints

### TailwindCSS Breakpoints
- **sm**: 640px and up (small tablets)
- **md**: 768px and up (tablets)
- **lg**: 1024px and up (laptops)
- **xl**: 1280px and up (desktops)
- **2xl**: 1536px and up (large screens)

### Component Responsiveness
```jsx
// Responsive sidebar
<div className={`
  fixed inset-y-0 left-0 z-50 w-64 
  transform transition-transform duration-300 ease-in-out
  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  lg:translate-x-0 lg:static lg:inset-0
`}>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
```

## 🔍 Performance Optimizations

### Code Splitting
- React Router lazy loading
- Dynamic imports for large components
- Vite's built-in code splitting

### Bundle Optimization
- Tree shaking for unused code
- Asset optimization with Vite
- Gzip compression in production

### Runtime Performance
- React.memo for expensive components
- useMemo and useCallback for expensive calculations
- Virtualization for large lists (if needed)

### Loading Strategies
- Skeleton screens during data loading
- Progressive loading for images
- Optimistic updates for user actions

## 🚀 Deployment

### Vercel Deployment (vercel.json)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### GitHub Pages Deployment
```bash
# Build and deploy
npm run build
npm run deploy
```

### Environment Variables in Production
- Set all VITE_* environment variables
- Update Firebase Auth domain for production URL
- Configure CORS origins in backend

### Performance Monitoring
- Lighthouse scores
- Core Web Vitals
- Bundle size analysis
- Runtime performance monitoring

---

This frontend provides a modern, responsive, and user-friendly interface for the Sehpaathi educational platform, delivering an engaging experience for students to interact with AI assistance, manage resources, and access educational materials.
