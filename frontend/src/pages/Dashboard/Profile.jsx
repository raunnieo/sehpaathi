import { useState, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db, auth } from "../../auth/firebase";
import { setUserInfo } from "../../features/user/userSlice";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Save, 
  X, 
  Camera,
  Bell,
  BookOpen,
  Trophy,
  Clock,
  Target,
  Settings,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "../../contexts/useTheme";
import ProfileCompletionCard from "../../components/ProfileCompletionCard/ProfileCompletionCard";

const Profile = () => {
  const { user, userProfile, userName } = useOutletContext();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    displayName: userProfile?.displayName || user?.displayName || userName || user?.email?.split('@')[0] || "User",
    email: user?.email || "",
    phone: userProfile?.phone || "",
    location: userProfile?.location || "",
    bio: userProfile?.bio || "",
    joinDate: user?.metadata?.creationTime || new Date().toISOString(),
    studyGoal: userProfile?.studyGoal || "",
    preferredSubjects: userProfile?.preferredSubjects || [],
    profilePhoto: userProfile?.profilePhoto || user?.photoURL || ""
  });

  // Profile photo upload logic
  const fileInputRef = useRef(null);
  const handlePhotoUpload = () => {
    console.log('Camera button clicked');
    if (fileInputRef.current) {
      console.log('Triggering file input click');
      fileInputRef.current.click();
    } else {
      console.log('fileInputRef.current is null');
    }
  };

  const handleFileChange = async (e) => {
    console.log('File input changed', e);
    const file = e.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }
    try {
      // Dynamically import browser-image-compression
      const imageCompression = (await import('browser-image-compression')).default;
      console.log('Compressing file:', file);
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 300,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      console.log('Compressed file:', compressedFile);

      // Delete old image from Cloudinary if exists
      let oldImageUrl = profileData.profilePhoto || userProfile?.profilePhoto || user?.photoURL || "";
      if (oldImageUrl && oldImageUrl.includes('cloudinary.com')) {
        // Extract public_id from oldImageUrl
        const matches = oldImageUrl.match(/\/upload\/[^\/]+\/(.+)$/);
        let publicId = matches ? matches[1].split('.')[0] : null;
        if (publicId) {

          try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/delete-profile-image`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ public_id: publicId })
            });
            console.log('Old Cloudinary image deleted:', publicId);
          } catch (deleteErr) {
            console.warn('Failed to delete old Cloudinary image:', deleteErr);
          }
        }
      }

      // Upload to Cloudinary
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      if (!cloudName || !uploadPreset) {
        alert('Cloudinary config missing in .env');
        return;
      }
      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('upload_preset', uploadPreset);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.secure_url) {
        console.log('Cloudinary URL:', data.secure_url);
        setProfileData(prev => ({
          ...prev,
          profilePhoto: data.secure_url,
        }));
        // Store photo URL in Firestore for the user
        try {
          if (auth.currentUser) {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userDocRef, { profilePhoto: data.secure_url }, { merge: true });
            console.log('Profile photo URL saved to Firestore');
            // Sync to Redux
            dispatch(setUserInfo({
              user: {
                uid: user?.uid,
                email: user?.email,
                displayName: user?.displayName,
                photoURL: data.secure_url,
                phoneNumber: user?.phoneNumber
              },
              profileData: {
                ...profileData,
                profilePhoto: data.secure_url
              }
            }));
            console.log('Profile photo URL synced to Redux');
          } else {
            console.warn('No authenticated user to save photo URL');
          }
        } catch (fireErr) {
          console.error('Error saving photo URL to Firestore:', fireErr);
        }
      } else {
        console.log('Cloudinary upload failed', data);
        alert('Failed to upload image to Cloudinary');
      }
    } catch (err) {
      console.log('Failed to compress or upload image', err);
      alert("Failed to compress or upload image");
    }
  };

  const [stats] = useState({
    studyHours: 156,
    completedCourses: 12,
    currentStreak: 7,
    totalResources: 45
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    studyReminders: true
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    if (!auth.currentUser) {
      console.error("No authenticated user");
      return;
    }

    setIsSaving(true);
    try {
      // Ensure displayName is not empty - fallback to email if needed
      const displayName = profileData.displayName.trim() || 
                          user?.email?.split('@')[0] || 
                          "User";

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });

      // Create serializable profile data (remove functions, etc.)
      const serializableProfileData = {
        displayName: displayName,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
        studyGoal: profileData.studyGoal,
        preferredSubjects: profileData.preferredSubjects,
        updatedAt: new Date().toISOString()
      };

      // Update Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDocRef, serializableProfileData, { merge: true });

      // Update Redux with only serializable data
      dispatch(setUserInfo({
        user: {
          uid: user?.uid,
          email: user?.email,
          displayName: displayName,
          photoURL: user?.photoURL,
          phoneNumber: user?.phoneNumber
        },
        profileData: serializableProfileData
      }));

      // Update local state with the saved values
      setProfileData(prev => ({
        ...prev,
        displayName: displayName
      }));

      console.log("Profile saved successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleCompleteProfile = () => {
    navigate('/customize-profile');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`flex-1 flex flex-col overflow-hidden relative ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Seamless Header - Fixed and Responsive */}
      <div className={`flex-shrink-0 relative px-4 sm:px-6 py-5 sm:py-6 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100/50'} z-10`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10' : 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5'}`}></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${isDark ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20' : 'bg-gradient-to-br from-purple-500/10 to-blue-500/10'} flex items-center justify-center backdrop-blur-xl border ${isDark ? 'border-purple-500/20' : 'border-purple-500/10'}`}>
                <User className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
            </div>
            <div>
              <h1 className={`text-lg sm:text-xl font-bold ${isDark ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' : 'bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800'} bg-clip-text text-transparent`}>
                My Profile
              </h1>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Manage your account and preferences</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`group flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold ${isDark 
                ? 'text-gray-300 hover:text-blue-300 bg-gray-700/60 hover:bg-blue-900/50 border-gray-600/50 hover:border-blue-500/50' 
                : 'text-gray-700 hover:text-blue-700 bg-white/60 hover:bg-blue-50 border-gray-200/50 hover:border-blue-200'
              } border rounded-xl transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-xl`}
            >
              <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
        <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        
        {/* Profile Completion Card */}
        <ProfileCompletionCard 
          profile={userProfile} 
          onCompleteProfile={handleCompleteProfile}
        />

        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="relative">
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto}
                  alt="Profile"
                  className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover shadow-xl border-4 ${isDark ? 'border-gray-700' : 'border-white'}`}
                />
              ) : (
                <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 ${isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-600 to-purple-700'} rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold shadow-xl`}>
                  {profileData.displayName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
              <button
                type="button"
                onClick={handlePhotoUpload}
                className={`absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg ${isDark ? 'border-2 border-gray-800' : 'border-2 border-white'}`}
              >
                <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                  <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {profileData.displayName}
                  </h1>
                  <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                    Member since {formatDate(profileData.joinDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.studyHours}</p>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Study Hours</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                <BookOpen className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div>
                <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.completedCourses}</p>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                <Target className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <div>
                <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.currentStreak}</p>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Day Streak</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`p-2 sm:p-3 rounded-lg ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                <Trophy className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalResources}</p>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Resources</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Personal Information */}
          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Personal Information</h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                  Full Name
                </label>
                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.displayName}</p>
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                  Email
                </label>
                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.email}</p>
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                  Phone
                </label>
                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.phone || "Not provided"}</p>
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                  Location
                </label>
                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.location || "Not provided"}</p>
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Bio
                </label>
                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.bio || "No bio provided"}</p>
              </div>
            </div>
          </div>

          {/* Study Preferences */}
          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Study Preferences</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Study Goal
                </label>
                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.studyGoal || "Not set"}</p>
              </div>            </div>
          </div>
        </div>
        </div>
      </div>      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75 backdrop-blur-sm"
            onClick={() => setIsSettingsOpen(false)}
          ></div>

          {/* Mobile-first responsive modal */}
          <div className="fixed inset-0 flex items-end sm:items-center justify-center">
            <div className={`w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[90vh] sm:mx-4 sm:rounded-2xl overflow-hidden transition-all transform shadow-xl ${
              isDark ? 'bg-gray-800 sm:border-gray-700' : 'bg-white sm:border-gray-200'
            } sm:border flex flex-col`}>
              
              {/* Enhanced Mobile Header */}
              <div className={`flex-shrink-0 px-4 sm:px-6 py-4 sm:py-5 border-b ${
                isDark ? 'border-gray-700/50 bg-gray-800/90' : 'border-gray-200/50 bg-white/90'
              } backdrop-blur-xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${
                      isDark ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
                    } flex items-center justify-center backdrop-blur-xl border ${
                      isDark ? 'border-blue-500/20' : 'border-blue-500/10'
                    }`}>
                      <Settings className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h2 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Settings
                      </h2>
                      <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Manage your preferences
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className={`p-2 sm:p-2.5 rounded-xl transition-colors ${
                      isDark 
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300 bg-gray-700/50' 
                        : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600 bg-gray-50'
                    }`}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              {/* Mobile-optimized Settings tabs */}
              <div className={`flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-b ${
                isDark ? 'border-gray-700/50' : 'border-gray-200/50'
              }`}>
                <div className="flex space-x-1">
                  {[
                    { id: 'profile', label: 'Profile', icon: User },
                    { id: 'notifications', label: 'Notifications', icon: Bell },
                    { id: 'appearance', label: 'Appearance', icon: isDark ? Moon : Sun }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSettingsTab(tab.id)}
                      className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 px-2 sm:px-4 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        activeSettingsTab === tab.id
                          ? (isDark 
                              ? 'bg-blue-600 text-white shadow-lg' 
                              : 'bg-blue-600 text-white shadow-lg')
                          : (isDark 
                              ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50' 
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50')
                      }`}
                    >
                      <tab.icon className="w-4 h-4 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden text-xs">{tab.label.slice(0, 4)}</span>
                    </button>
                  ))}
                </div>
              </div>              {/* Scrollable Settings content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
                <div className="space-y-6">
                  {/* Profile Settings */}
                  {activeSettingsTab === 'profile' && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                        <div className={`w-8 h-8 rounded-lg ${
                          isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                        } flex items-center justify-center`}>
                          <User className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Profile Settings
                          </h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Update your personal information
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">                        <div>
                          <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Display Name
                          </label>
                          <input
                            type="text"
                            value={profileData.displayName}
                            onChange={(e) => handleInputChange('displayName', e.target.value)}
                            className={`w-full px-4 py-3 sm:py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                              isDark 
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`w-full px-4 py-3 sm:py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                              isDark 
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>
                        
                        <div className="sm:col-span-2">
                          <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Location
                          </label>
                          <input
                            type="text"
                            value={profileData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className={`w-full px-4 py-3 sm:py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                              isDark 
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>
                        
                        <div className="sm:col-span-2">
                          <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Bio
                          </label>
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            rows={4}
                            className={`w-full px-4 py-3 sm:py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all ${
                              isDark 
                                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>
                      </div>
                        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl"
                        >
                          <Save className="w-4 h-4" />
                          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Notifications Settings */}
                  {activeSettingsTab === 'notifications' && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                        <div className={`w-8 h-8 rounded-lg ${
                          isDark ? 'bg-orange-500/20' : 'bg-orange-100'
                        } flex items-center justify-center`}>
                          <Bell className={`w-4 h-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Notification Preferences
                          </h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Choose how you want to be notified
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 sm:space-y-6">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className={`flex items-start justify-between p-4 rounded-xl border ${
                            isDark ? 'border-gray-700/50 bg-gray-700/20' : 'border-gray-200/50 bg-gray-50/50'
                          }`}>
                            <div className="flex-1 pr-4">
                              <h4 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </h4>
                              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                                {key === 'emailNotifications' && 'Receive notifications via email'}
                                {key === 'pushNotifications' && 'Receive push notifications'}
                                {key === 'weeklyDigest' && 'Get weekly summary of your activity'}
                                {key === 'studyReminders' && 'Reminders to maintain study streaks'}
                              </p>
                            </div>
                            <button
                              onClick={() => handleNotificationChange(key)}
                              className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                value ? 'bg-blue-600' : (isDark ? 'bg-gray-600' : 'bg-gray-200')
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  value ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Appearance Settings */}
                  {activeSettingsTab === 'appearance' && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                        <div className={`w-8 h-8 rounded-lg ${
                          isDark ? 'bg-purple-500/20' : 'bg-purple-100'
                        } flex items-center justify-center`}>
                          {isDark ? (
                            <Moon className="w-4 h-4 text-purple-400" />
                          ) : (
                            <Sun className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Appearance Settings
                          </h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Customize how the app looks
                          </p>
                        </div>
                      </div>
                      
                      <div className={`p-4 sm:p-6 rounded-xl border ${
                        isDark ? 'border-gray-700/50 bg-gray-700/20' : 'border-gray-200/50 bg-gray-50/50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 pr-4">
                            <h4 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              Theme Mode
                            </h4>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                              Choose between light and dark mode
                            </p>
                          </div>
                          <button
                            onClick={toggleTheme}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl ${
                              isDark 
                                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white' 
                                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white'
                            }`}
                          >
                            {isDark ? (
                              <>
                                <Sun className="w-4 h-4" />
                                <span className="hidden sm:inline">Light Mode</span>
                              </>
                            ) : (
                              <>
                                <Moon className="w-4 h-4" />
                                <span className="hidden sm:inline">Dark Mode</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
