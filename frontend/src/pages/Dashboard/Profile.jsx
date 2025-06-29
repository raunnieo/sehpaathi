import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit2, 
  Save, 
  X, 
  Camera,
  Shield,
  Bell,
  Key,
  Trash2,
  Download,
  BookOpen,
  Trophy,
  Clock,
  Target
} from "lucide-react";
import { useTheme } from "../../contexts/useTheme";

const Profile = () => {
  const { user, userProfile, userName } = useOutletContext();
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: userProfile?.displayName || user?.displayName || userName || "User",
    email: user?.email || "",
    phone: userProfile?.phone || "",
    location: userProfile?.location || "",
    bio: userProfile?.bio || "",
    joinDate: user?.metadata?.creationTime || new Date().toISOString(),
    studyGoal: userProfile?.studyGoal || "",
    preferredSubjects: userProfile?.preferredSubjects || []
  });

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

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    console.log("Saving profile data:", profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any unsaved changes
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };  return (
    <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pb-16 lg:pb-0`}>
      <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* Profile Picture */}
            <div className="relative group">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl lg:text-3xl font-bold shadow-lg overflow-hidden ${
                userProfile?.profilePictureUrl ? "bg-gray-200" :
                userProfile?.avatarGradient ? `bg-gradient-to-br ${userProfile.avatarGradient}` :
                "bg-gradient-to-br from-blue-500 to-purple-600"
              }`}>
                {userProfile?.profilePictureUrl || user?.photoURL ? (
                  <img 
                    src={userProfile?.profilePictureUrl || user?.photoURL}
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (                  profileData.displayName.charAt(0).toUpperCase()
                )}
              </div>
              <button className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 backdrop-blur-xl">
                <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                  <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {profileData.displayName}
                  </h1>
                  <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                    Member since {formatDate(profileData.joinDate)}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 text-sm shadow-lg hover:shadow-xl backdrop-blur-xl"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${isDark ? 'bg-blue-900/50' : 'bg-blue-100'} rounded-lg flex items-center justify-center`}>
                <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.studyHours}</p>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Study Hours</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${isDark ? 'bg-green-900/50' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                <BookOpen className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />              </div>
              <div>
                <p className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.completedCourses}</p>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${isDark ? 'bg-orange-900/50' : 'bg-orange-100'} rounded-lg flex items-center justify-center`}>
                <Trophy className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <div>
                <p className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.currentStreak}</p>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Day Streak</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${isDark ? 'bg-purple-900/50' : 'bg-purple-100'} rounded-lg flex items-center justify-center`}>
                <Target className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <p className={`text-lg sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalResources}</p>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Resources</p>
              </div>
            </div>
          </div>
        </div>        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Personal Information */}
          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6`}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Personal Information</h2>
              {isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm rounded-lg transition-colors"
                  >
                    <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-xs sm:text-sm rounded-lg transition-colors"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDark 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                ) : (
                  <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.displayName}</p>
                )}
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
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDark 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                ) : (
                  <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.phone || "Not provided"}</p>
                )}
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                  Location
                </label>                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter your location"
                    className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      isDark 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                ) : (
                  <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.location || "Not provided"}</p>
                )}
              </div>

              <div>
                <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors ${
                      isDark 
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                ) : (
                  <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.bio || "No bio provided"}</p>
                )}
              </div>
            </div>
          </div>

          {/* Preferences & Settings */}
          <div className="space-y-4 sm:space-y-6">
            {/* Study Preferences */}
            <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6`}>
              <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Study Preferences</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Study Goal
                  </label>
                  {isEditing ? (
                    <select
                      value={profileData.studyGoal}
                      onChange={(e) => handleInputChange('studyGoal', e.target.value)}
                      className={`w-full px-3 py-2 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        isDark 
                          ? 'bg-gray-700/50 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="">Select a goal</option>
                      <option value="exam-prep">Exam Preparation</option>
                      <option value="skill-building">Skill Building</option>
                      <option value="career-change">Career Change</option>
                      <option value="personal-growth">Personal Growth</option>
                    </select>
                  ) : (
                    <p className={`text-sm sm:text-base ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{profileData.studyGoal || "Not set"}</p>
                  )}
                </div>
              </div>
            </div>            {/* Notification Settings */}
            <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6`}>
              <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Notifications
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className={`text-xs sm:text-sm font-medium capitalize ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleNotificationChange(key)}
                        className="sr-only peer"
                      />
                      <div className={`w-9 h-5 sm:w-11 sm:h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600 ${
                        isDark ? 'bg-gray-600 after:border-gray-500' : 'bg-gray-200 after:border-gray-300'
                      }`}></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security & Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Security Settings */}
          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
              Security
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              <button className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                isDark 
                  ? 'border-gray-600/50 hover:bg-gray-700/30'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Key className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Change Password</span>
                </div>
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</span>
              </button>
              
              <button className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                isDark 
                  ? 'border-gray-600/50 hover:bg-gray-700/30'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Shield className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Two-Factor Authentication</span>
                </div>
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</span>
              </button>
            </div>
          </div>

          {/* Data Management */}
          <div className={`${isDark ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/70 border-gray-100/50'} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border p-4 sm:p-6`}>
            <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Data Management
            </h2>            
            <div className="space-y-3 sm:space-y-4">
              <button className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                isDark 
                  ? 'border-gray-600/50 hover:bg-gray-700/30'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Download className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Export Data</span>
                </div>
                <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</span>
              </button>
              
              <button className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                isDark 
                  ? 'border-red-500/30 hover:bg-red-500/10 text-red-400'
                  : 'border-red-200 hover:bg-red-50 text-red-600'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">Delete Account</span>
                </div>
                <span className={isDark ? 'text-red-500' : 'text-red-400'}>›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
