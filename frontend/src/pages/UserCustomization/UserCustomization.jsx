import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  User, 
  MapPin, 
  Phone, 
  Briefcase, 
  Camera, 
  SkipForward, 
  ArrowRight
} from "lucide-react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { db, storage, auth } from "../../auth/firebase";
import { setUserInfo } from "../../features/user/userSlice";
import { useTheme } from "../../contexts/useTheme";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

const UserCustomization = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const profile = useSelector(state => state.user.profile);
  
  const [formData, setFormData] = useState({
    displayName: "",
    gender: "",
    role: "",
    location: "",
    phone: "",
    bio: "",
    profilePicture: null,
    selectedAvatar: ""
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load existing profile data when component mounts
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        if (auth.currentUser) {
          const currentUserId = auth.currentUser.uid;
          
          // Try to get the latest data from Firestore for THIS specific user
          const userDocRef = doc(db, "users", currentUserId);
          const userDoc = await getDoc(userDocRef);
          
          let existingData = {};
          if (userDoc.exists()) {
            const docData = userDoc.data();
            // SECURITY: Only use data if it actually belongs to current user
            if (docData.uid === currentUserId) {
              existingData = docData;
            }
          }

          // SECURITY: Only use Redux data if it belongs to current user
          const safeProfile = (profile?.uid === currentUserId) ? profile : null;
          const safeUser = (user?.uid === currentUserId) ? user : null;

          // For new users, only use their basic auth info, not cached Redux data
          const isNewUser = !userDoc.exists() || !existingData.isProfileComplete;
          
          let mergedData;
          if (isNewUser) {
            // New user - only use auth data, ignore any cached Redux data
            mergedData = {
              displayName: auth.currentUser.displayName || "",
              gender: "",
              role: "",
              location: "",
              phone: "",
              bio: "",
              profilePicture: null,
              selectedAvatar: ""
            };
            
            // Clear any existing preview URL first
            setPreviewUrl("");
            
            // Only set preview URL from auth if no Firestore data exists
            if (auth.currentUser.photoURL && !existingData.profilePictureUrl) {
              setPreviewUrl(auth.currentUser.photoURL);
            }
          } else {
            // Existing user - merge data from safe sources only
            mergedData = {
              displayName: existingData.displayName || safeProfile?.displayName || safeUser?.displayName || auth.currentUser.displayName || "",
              gender: existingData.gender || safeProfile?.gender || "",
              role: existingData.role || safeProfile?.role || "",
              location: existingData.location || safeProfile?.location || "",
              phone: existingData.phone || safeProfile?.phone || "",
              bio: existingData.bio || safeProfile?.bio || "",
              profilePicture: null, // Always start with null for new uploads
              selectedAvatar: existingData.avatarGradient || safeProfile?.avatarGradient || ""
            };

            // Clear any existing preview URL first
            setPreviewUrl("");

            // Set preview URL if profile picture exists for current user
            const validPhotoURL = existingData.profilePictureUrl || safeProfile?.profilePictureUrl || auth.currentUser.photoURL;
            if (validPhotoURL) {
              setPreviewUrl(validPhotoURL);
            }
          }

          setFormData(mergedData);
        } else {
          // No authenticated user - clear everything
          setFormData({
            displayName: "",
            gender: "",
            role: "",
            location: "",
            phone: "",
            bio: "",
            profilePicture: null,
            selectedAvatar: ""
          });
          setPreviewUrl("");
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        // Fallback to basic auth data only for current user
        setFormData({
          displayName: auth.currentUser?.displayName || "",
          gender: "",
          role: "",
          location: "",
          phone: "",
          bio: "",
          profilePicture: null,
          selectedAvatar: ""
        });
        setPreviewUrl("");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, [user, profile]); // Include user and profile dependencies
  // Predefined avatar options with gradient colors
  const avatarOptions = [
    { id: 1, gradient: "from-blue-500 to-purple-600", name: "Ocean" },
    { id: 2, gradient: "from-green-500 to-teal-600", name: "Forest" },
    { id: 3, gradient: "from-pink-500 to-rose-600", name: "Sunset" },
    { id: 4, gradient: "from-yellow-500 to-orange-600", name: "Sunshine" },
    { id: 5, gradient: "from-indigo-500 to-blue-600", name: "Sky" },
    { id: 6, gradient: "from-purple-500 to-pink-600", name: "Lavender" },
    { id: 7, gradient: "from-teal-500 to-cyan-600", name: "Ocean" },
    { id: 8, gradient: "from-red-500 to-pink-600", name: "Cherry" }
  ];

  const genderOptions = [
    "Male",
    "Female", 
    "Non-binary",
    "Genderfluid",
    "Agender",
    "Prefer not to say",
    "Other"
  ];

  const roleOptions = [
    { value: "", label: "Select a role" },
    { value: "student", label: "Student" },
    { value: "class-representative", label: "Class Representative" },
    { value: "branch-representative", label: "Branch Representative" },
    { value: "coordinator", label: "Coordinator" },
    { value: "incharge", label: "In-charge" },
    { value: "faculty", label: "Faculty" },
    { value: "teaching-assistant", label: "Teaching Assistant" },
    { value: "mentor", label: "Mentor" },
    { value: "tutor", label: "Tutor" },
    { value: "none", label: "No specific role" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size should be less than 5MB");
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        profilePicture: file,
        selectedAvatar: "" // Clear selected avatar if uploading custom
      }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handleAvatarSelect = (avatar) => {
    setFormData(prev => ({
      ...prev,
      selectedAvatar: avatar.gradient,
      profilePicture: null // Clear uploaded file if selecting avatar
    }));
    setPreviewUrl(""); // Clear preview URL for gradient avatar
  };

  const uploadProfilePicture = async (file) => {
    try {
      const imageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  const handleSubmit = async () => {
    setIsUploading(true);
    try {
      let profilePictureUrl = "";
      let avatarGradient = "";
      
      // Upload custom profile picture if provided
      if (formData.profilePicture) {
        profilePictureUrl = await uploadProfilePicture(formData.profilePicture);
      } else if (formData.selectedAvatar) {
        // Use gradient avatar
        avatarGradient = formData.selectedAvatar;
      }

      // Update user profile in Firebase Auth
      if (formData.displayName || profilePictureUrl) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName || auth.currentUser.displayName,
          photoURL: profilePictureUrl || auth.currentUser.photoURL
        });
      }

      // Save user profile data to Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const currentTime = new Date();
      const profileData = {
        uid: auth.currentUser.uid,
        displayName: formData.displayName,
        email: auth.currentUser.email,
        gender: formData.gender,
        role: formData.role,
        location: formData.location,
        phone: formData.phone,
        bio: formData.bio,
        profilePictureUrl: profilePictureUrl,
        avatarGradient: avatarGradient,
        isProfileComplete: true,
        updatedAt: currentTime
      };

      // Only set createdAt if this is a new document
      const existingDoc = await getDoc(userDocRef);
      if (!existingDoc.exists()) {
        profileData.createdAt = currentTime;
      }

      await setDoc(userDocRef, profileData, { merge: true });

      // Convert dates to timestamps for Redux (serializable)
      const serializableProfileData = {
        ...profileData,
        createdAt: profileData.createdAt ? profileData.createdAt.getTime() : undefined,
        updatedAt: profileData.updatedAt.getTime()
      };

      // Update Redux store
      dispatch(setUserInfo({
        user: {
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          emailVerified: auth.currentUser.emailVerified,
          displayName: formData.displayName,
          photoURL: profilePictureUrl,
          phoneNumber: auth.currentUser.phoneNumber
        },
        profileData: serializableProfileData
      }));

      // Show success message
      const isUpdatingProfile = profile?.isProfileComplete || false;
      setSuccessMessage(
        isUpdatingProfile 
          ? "Profile updated successfully! Redirecting to dashboard..." 
          : "Profile saved successfully! Redirecting to dashboard..."
      );
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkip = async () => {
    // Validate that display name is provided
    if (!formData.displayName.trim()) {
      alert("Please enter a display name before skipping.");
      return;
    }

    try {
      // Save minimal user data to Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const currentTime = new Date();
      const minimalData = {
        uid: auth.currentUser.uid,
        displayName: formData.displayName.trim(),
        email: auth.currentUser.email,
        isProfileComplete: false,
        profileSkipped: true, // Add flag to indicate user explicitly skipped
        createdAt: currentTime,
        updatedAt: currentTime
      };

      await setDoc(userDocRef, minimalData, { merge: true });

      // Convert dates to timestamps for Redux (serializable)
      const serializableMinimalData = {
        ...minimalData,
        createdAt: minimalData.createdAt.getTime(),
        updatedAt: minimalData.updatedAt.getTime()
      };

      // Update Redux store with minimal data
      dispatch(setUserInfo({
        user: {
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          emailVerified: auth.currentUser.emailVerified,
          displayName: formData.displayName.trim(),
          photoURL: auth.currentUser.photoURL,
          phoneNumber: auth.currentUser.phoneNumber
        },
        profileData: serializableMinimalData
      }));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving minimal profile:", error);
      navigate("/dashboard"); // Navigate anyway
    }
  };

  // Cleanup effect to prevent data leakage when component unmounts
  useEffect(() => {
    return () => {
      // Clear form data when component unmounts to prevent data leakage
      setFormData({
        displayName: "",
        gender: "",
        role: "",
        location: "",
        phone: "",
        bio: "",
        profilePicture: null,
        selectedAvatar: ""
      });
      setPreviewUrl("");
      setSuccessMessage("");
    };
  }, []);  return (
    <div className={`min-h-screen flex items-center justify-center p-2 sm:p-4 relative ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* Mobile-first responsive container */}
      <div className={`w-full max-w-6xl rounded-2xl shadow-xl border ${
        isDark 
          ? 'bg-gray-800/90 border-gray-700/50 backdrop-blur-xl' 
          : 'bg-white border-gray-100'
      } 
      /* Mobile: Full height with internal scroll */
      h-[calc(100vh-1rem)] sm:h-auto 
      flex flex-col
      /* Web: Landscape layout, no scroll */
      lg:max-h-[95vh] lg:overflow-hidden lg:flex-row
      `}>
        
        {/* Header - Fixed on mobile, Left sidebar on web */}
        <div className={`flex-shrink-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-white ${
          isDark 
            ? 'bg-gradient-to-r lg:bg-gradient-to-b from-blue-700 to-purple-700' 
            : 'bg-gradient-to-r lg:bg-gradient-to-b from-blue-600 to-purple-600'
        } sm:rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none lg:w-80 lg:flex lg:flex-col lg:justify-between`}>
          
          {/* Header Content */}
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
              {profile?.isProfileComplete ? "Update Profile" : "Complete Profile"}
            </h1>
            <p className={`text-sm sm:text-base lg:text-lg ${
              isDark ? 'text-blue-200' : 'text-blue-100'
            }`}>
              {profile?.isProfileComplete 
                ? "Make changes to your Sehpaathi profile" 
                : "Let's personalize your Sehpaathi experience"
              }
            </p>
          </div>

          {/* Profile Picture Section - Moved to sidebar on web */}
          <div className="hidden lg:block mt-8">
            <div className="text-center">
              <div className="relative inline-block">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden border-4 border-white/20 ${
                  previewUrl ? "bg-gray-200" : 
                  formData.selectedAvatar ? `bg-gradient-to-br ${formData.selectedAvatar}` : 
                  "bg-gradient-to-br from-blue-500 to-purple-600"
                }`}>
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    formData.displayName.charAt(0).toUpperCase() || "U"
                  )}
                </div>
                <label className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white shadow-lg transition-colors border-2 border-white ${
                  isDark 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}>
                  <Camera className="w-5 h-5" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-blue-200/80 text-sm mt-3">
                Upload a photo or choose an avatar below
              </p>
            </div>

            {/* Avatar Options - In sidebar for web */}
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-3 text-blue-200">
                Choose an Avatar
              </label>
              <div className="grid grid-cols-4 gap-2">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => handleAvatarSelect(avatar)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      formData.selectedAvatar === avatar.gradient
                        ? "border-white ring-2 ring-white/30" 
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${avatar.gradient} flex items-center justify-center text-white font-bold text-xs`}>
                      {avatar.name.charAt(0)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable on mobile, fixed grid on web */}
        <div className={`flex-1 overflow-y-auto lg:overflow-hidden px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 ${isDark ? 'bg-gray-800/50' : ''} sm:rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none`}>          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-8 sm:py-12 lg:flex lg:items-center lg:justify-center lg:h-full">
              <div>
                <div className={`w-8 h-8 border-3 border-t-transparent rounded-full animate-spin mx-auto mb-4 ${
                  isDark ? 'border-blue-400' : 'border-blue-500'
                }`} />
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Loading your profile data...</p>
              </div>
            </div>
          ) : (
            <div className="h-full lg:flex lg:flex-col lg:justify-between">
              {/* Success Message */}
              {successMessage && (
                <div className={`mb-4 lg:mb-6 p-4 border rounded-xl text-center transition-all duration-300 transform ${
                  isDark 
                    ? 'bg-green-900/20 border-green-700/50 text-green-300' 
                    : 'bg-green-50 border-green-200 text-green-800'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-green-600' : 'bg-green-500'
                    }`}>
                      <span className="text-white text-xs">✓</span>
                    </div>
                    {successMessage}
                  </div>
                </div>
              )}

              {/* Mobile Profile Picture Section (hidden on web) */}
              <div className="text-center mb-6 lg:hidden">
                <div className="relative inline-block">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold overflow-hidden ${
                    previewUrl ? "bg-gray-200" : 
                    formData.selectedAvatar ? `bg-gradient-to-br ${formData.selectedAvatar}` : 
                    "bg-gradient-to-br from-blue-500 to-purple-600"
                  }`}>
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      formData.displayName.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                  <label className={`absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center cursor-pointer text-white shadow-lg transition-colors ${
                    isDark 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}>
                    <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className={`text-xs sm:text-sm mt-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Upload a photo or choose an avatar</p>
              </div>

              {/* Mobile Avatar Options (hidden on web) */}
              <div className="mb-6 lg:hidden">
                <label className={`block text-sm font-semibold mb-3 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Choose an Avatar
                </label>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => handleAvatarSelect(avatar)}
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 transition-all ${
                        formData.selectedAvatar === avatar.gradient
                          ? (isDark ? "border-blue-400 ring-2 ring-blue-400/30" : "border-blue-500 ring-2 ring-blue-200")
                          : (isDark ? "border-gray-600 hover:border-gray-500" : "border-gray-200 hover:border-gray-300")
                      }`}
                    >
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${avatar.gradient} flex items-center justify-center text-white font-bold text-xs sm:text-sm`}>
                        {avatar.name.charAt(0)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields - Landscape layout for web */}
              <div className="flex-1 lg:grid lg:grid-cols-2 lg:gap-8 lg:h-auto">
                
                {/* Left Column - Personal Information */}
                <div className="space-y-4 lg:space-y-6">
                  <h3 className={`text-lg font-bold mb-4 lg:mb-6 ${isDark ? 'text-white' : 'text-gray-900'} lg:text-xl hidden lg:block`}>
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                    {/* Display Name */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        <User className="w-4 h-4 inline mr-2" />
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => handleInputChange('displayName', e.target.value)}
                        placeholder="Enter your display name"
                        className={`w-full px-3 py-3 sm:py-2.5 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                          isDark 
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400 focus:bg-gray-700' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        Gender
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className={`w-full px-3 py-3 sm:py-2.5 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                          isDark 
                            ? 'bg-gray-700/50 border-gray-600 text-white focus:ring-blue-400 focus:bg-gray-700' 
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                        }`}
                      >
                        <option value="">Select gender</option>
                        {genderOptions.map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        className={`w-full px-3 py-3 sm:py-2.5 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                          isDark 
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400 focus:bg-gray-700' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Enter your city, state"
                        className={`w-full px-3 py-3 sm:py-2.5 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                          isDark 
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400 focus:bg-gray-700' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Professional & About */}
                <div className="space-y-4 lg:space-y-6 mt-6 lg:mt-0">
                  <h3 className={`text-lg font-bold mb-4 lg:mb-6 ${isDark ? 'text-white' : 'text-gray-900'} lg:text-xl hidden lg:block`}>
                    Professional & About
                  </h3>
                  
                  <div className="space-y-4 lg:space-y-6">
                    {/* Role */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        <Briefcase className="w-4 h-4 inline mr-2" />
                        Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className={`w-full px-3 py-3 sm:py-2.5 border rounded-xl focus:ring-2 focus:border-transparent transition-colors ${
                          isDark 
                            ? 'bg-gray-700/50 border-gray-600 text-white focus:ring-blue-400 focus:bg-gray-700' 
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                        }`}
                      >
                        {roleOptions.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        About You
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell us a bit about yourself..."
                        rows={4}
                        className={`w-full px-3 py-3 sm:py-2.5 border rounded-xl focus:ring-2 focus:border-transparent resize-none transition-colors ${
                          isDark 
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400 focus:bg-gray-700' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Fixed at bottom */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 lg:pt-8 border-t border-gray-200 dark:border-gray-700 mt-6 lg:mt-8">
                {/* Only show Skip button for new profiles */}
                {!profile?.isProfileComplete && (
                  <button
                    onClick={handleSkip}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-colors font-medium ${
                      isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50 disabled:text-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:hover:bg-transparent'
                    }`}
                    disabled={isUploading || !!successMessage || !formData.displayName.trim()}
                  >
                    <SkipForward className="w-4 h-4" />
                    Skip for now
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={isUploading || !formData.displayName.trim() || !!successMessage}
                  className={`${profile?.isProfileComplete ? 'w-full' : 'flex-1'} flex items-center justify-center gap-2 px-6 py-3 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-xl ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {profile?.isProfileComplete ? "Updating..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      {profile?.isProfileComplete ? "Update Profile" : "Complete Setup"}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Footer text */}
              <div className="text-center space-y-2 mt-4">
                <p className={`text-xs ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {profile?.isProfileComplete 
                    ? "Your changes will be saved and updated in your profile."
                    : "You can always update your profile information later from your dashboard."
                  }
                </p>
                {!formData.displayName.trim() && !profile?.isProfileComplete && (
                  <p className={`text-xs rounded-lg px-3 py-2 border ${
                    isDark 
                      ? 'text-amber-300 bg-amber-900/20 border-amber-700/50' 
                      : 'text-amber-600 bg-amber-50 border-amber-200'
                  }`}>
                    ⚠️ Display name is required to proceed
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCustomization;
