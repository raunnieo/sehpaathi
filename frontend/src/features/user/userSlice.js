import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authService } from "../../auth/authService";

const COOKIE_EXPIRY = 30; // Days until cookie expires

// Helper function to format dates for display
export const formatCreatedAt = (timestamp) => {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleString();
};

// Helper function to calculate profile completion percentage
export const calculateProfileCompletion = (profile) => {
  if (!profile) return 0;
  
  const fields = [
    profile.displayName,
    profile.gender,
    profile.role && profile.role !== "none" && profile.role !== "",
    profile.location,
    profile.phone,
    profile.bio,
    profile.profilePictureUrl || profile.avatarGradient
  ];
  
  const completedFields = fields.filter(field => field && field.toString().trim()).length;
  return Math.round((completedFields / fields.length) * 100);
};

// Load initial state from cookies if available
const loadInitialState = () => {
  const userCookie = Cookies.get("user");
  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie);
      return {
        user: userData.user,
        profile: userData.profile,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      return { 
        user: null, 
        profile: null, 
        isAuthenticated: false, 
        loading: false, 
        error: null 
      };
    }
  }
  return { 
    user: null, 
    profile: null, 
    isAuthenticated: false, 
    loading: false, 
    error: null 
  };
};

// Async thunk for email sign in
export const signInWithEmail = createAsyncThunk(
  "user/signInWithEmail",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await authService.signInWithEmail(email, password);
      if (rememberMe) {
        Cookies.set("user", JSON.stringify(response), {
          expires: COOKIE_EXPIRY,
        });
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for Google sign in
export const signInWithGoogle = createAsyncThunk(
  "user/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.signInWithGoogle();
      // console.log(response);
      Cookies.set("user", JSON.stringify(response), {
        expires: COOKIE_EXPIRY,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for sign out
export const signOut = createAsyncThunk(
  "user/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await authService.signOut();
      Cookies.remove("user");
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: loadInitialState(),
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      // Clear all user data
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      
      // Clear cookies
      Cookies.remove("user");
    },
    setUserInfo: (state, action) => {
      // Serialize incoming data to ensure it's safe for Redux
      const serializedUser = serializeFirebaseUser(action.payload.user) || state.user;
      const serializedProfile = serializeProfileData(action.payload.profileData);
      
      state.user = serializedUser;
      state.profile = { ...state.profile, ...serializedProfile };
      state.isAuthenticated = true;
      
      // Ensure displayName has a fallback
      if (state.profile && !state.profile.displayName && state.user?.email) {
        state.profile.displayName = state.user.email.split('@')[0];
      }
      
      // Update cookies with new data
      const userData = {
        user: state.user,
        profile: state.profile
      };
      Cookies.set("user", JSON.stringify(userData), {
        expires: COOKIE_EXPIRY,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign in with email
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        // Serialize data before storing in Redux
        state.user = serializeFirebaseUser(action.payload.user);
        state.profile = serializeProfileData(action.payload.profile);
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        
        // Ensure displayName has a fallback
        if (state.profile && !state.profile.displayName && state.user?.email) {
          state.profile.displayName = state.user.email.split('@')[0];
        }
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sign in with Google
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        // Serialize data before storing in Redux
        state.user = serializeFirebaseUser(action.payload.user);
        state.profile = serializeProfileData(action.payload.profile);
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        
        // Ensure displayName has a fallback
        if (state.profile && !state.profile.displayName && state.user?.email) {
          state.profile.displayName = state.user.email.split('@')[0];
        }
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sign out
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.profile = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError, logout, setUserInfo } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectProfile = (state) => state.user.profile;
export const selectUserName = (state) => state.user.profile?.displayName || state.user.user?.displayName;
export const selectUserRole = (state) => state.user.profile?.role;
export const selectCreatedAt = (state) => state.user.profile?.createdAt;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectIsProfileComplete = (state) => state.user.profile?.isProfileComplete || false;
export const selectProfileSkipped = (state) => state.user.profile?.profileSkipped || false;
export const selectProfileCompletionPercentage = (state) => calculateProfileCompletion(state.user.profile);
export default userSlice.reducer;

// Helper function to serialize Firebase user object
export const serializeFirebaseUser = (user) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    providerData: user.providerData?.map(provider => ({
      providerId: provider.providerId,
      uid: provider.uid,
      displayName: provider.displayName,
      email: provider.email,
      phoneNumber: provider.phoneNumber,
      photoURL: provider.photoURL
    })),
    metadata: {
      creationTime: user.metadata?.creationTime,
      lastSignInTime: user.metadata?.lastSignInTime
    }
  };
};

// Helper function to serialize profile data
export const serializeProfileData = (profile) => {
  if (!profile) return null;
  
  const serialized = { ...profile };
  
  // Convert any Firebase Timestamps to milliseconds
  if (serialized.createdAt && typeof serialized.createdAt.toMillis === 'function') {
    serialized.createdAt = serialized.createdAt.toMillis();
  }
  if (serialized.updatedAt && typeof serialized.updatedAt.toMillis === 'function') {
    serialized.updatedAt = serialized.updatedAt.toMillis();
  }
  
  return serialized;
};
