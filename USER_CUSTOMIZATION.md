# User Customization Feature

## Overview
After user registration (either email signup or Google signup), users are redirected to a comprehensive profile customization page where they can personalize their Sehpaathi experience.

## Features

### 1. Profile Picture Options
- **Custom Upload**: Users can upload their own profile picture (max 5MB)
- **Gradient Avatars**: 8 predefined gradient-based avatar options
- **Real-time Preview**: Immediate preview of selected avatar or uploaded image

### 2. Personal Information
- **Display Name**: Custom display name for the platform
- **Gender**: Inclusive options including modern gender identities:
  - Male, Female, Non-binary, Genderfluid, Agender
  - "Prefer not to say" and "Other" options
- **Phone Number**: Optional contact information
- **Location**: City, state information
- **Bio**: Personal description (up to 3 rows)

### 3. Role Selection
Comprehensive role options for educational institutions:
- Student
- Class Representative
- Branch Representative
- Coordinator
- In-charge
- Faculty
- Teaching Assistant
- Mentor
- Tutor
- No specific role

### 4. User Experience
- **Skip Option**: Users can skip customization and complete later
- **Responsive Design**: Fully mobile-friendly interface
- **Modern UI**: Gradient design matching the Sehpaathi brand
- **Form Validation**: Required fields and file size validation

## Technical Implementation

### Database Storage
User profile data is stored in Firestore with the following structure:
```javascript
{
  uid: "user-firebase-uid",
  displayName: "User Display Name",
  email: "user@email.com",
  gender: "selected-gender",
  role: "selected-role",
  location: "City, State",
  phone: "+1234567890",
  bio: "User bio text",
  profilePictureUrl: "firebase-storage-url", // If custom upload
  avatarGradient: "from-blue-500 to-purple-600", // If gradient avatar
  isProfileComplete: true,
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### Route Configuration
- Route: `/customize-profile`
- Protected by `PrivateRoute` component
- Hides header/footer for full-screen experience

### Integration Points
1. **Signup Flow**: Both email and Google signup redirect to customization
2. **Dashboard**: Profile data displays in sidebar with custom avatar
3. **Profile Page**: Shows complete profile information with edit capabilities
4. **Redux Store**: Profile data is stored in user slice for global access

### File Structure
```
src/
├── pages/
│   └── UserCustomization/
│       └── UserCustomization.jsx
├── features/user/
│   └── userSlice.js (updated with setUserInfo action)
├── pages/Dashboard/
│   ├── Dashboard.jsx (updated to fetch profile data)
│   └── Profile.jsx (updated to use profile data)
└── components/Sidebar/
    └── Sidebar.jsx (updated to show custom avatars)
```

## User Flow
1. User completes registration (email or Google)
2. Redirected to `/customize-profile`
3. Can fill out profile information or skip
4. Profile data saved to Firestore
5. Redirected to dashboard with personalized experience

## Future Enhancements
- Avatar editing tools (crop, resize)
- Additional profile fields (social links, interests)
- Profile completion percentage
- Import data from social accounts
- Profile visibility settings
