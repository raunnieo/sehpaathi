import React from 'react';
import { useSelector } from 'react-redux';
import { User, MapPin, Phone, Briefcase, Camera, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/useTheme';
import { selectProfileCompletionPercentage } from '../../features/user/userSlice';

const ProfileCompletionCard = ({ profile, onCompleteProfile }) => {
  const { isDark } = useTheme();
  const completionPercentage = useSelector(selectProfileCompletionPercentage);
  const isComplete = profile?.isProfileComplete || false;

  // Check if profile actually has all required fields filled (same logic as userSlice)
  const requiredFields = [
    profile?.displayName,
    profile?.gender,
    profile?.role && profile?.role !== "none" && profile?.role !== "",
    profile?.location,
    profile?.phone,
    profile?.bio,
    profile?.profilePictureUrl || profile?.avatarGradient
  ];
  
  const completedRequiredFields = requiredFields.filter(field => field && field.toString().trim()).length;
  const hasAllRequiredFields = completedRequiredFields === requiredFields.length;

  // Show card if profile is marked incomplete OR if required fields are missing
  const shouldShowCard = !isComplete || !hasAllRequiredFields;

  // Don't show if profile is truly complete (has all fields)
  if (!shouldShowCard) return null;

  return (
    <div className={`${
      isDark 
        ? 'bg-gradient-to-br from-gray-800/50 to-gray-700/50 border-gray-600/50' 
        : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
    } backdrop-blur-sm border rounded-xl p-6 mb-6 transition-colors duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${
            isDark ? 'bg-blue-600' : 'bg-blue-500'
          } rounded-full flex items-center justify-center shadow-lg`}>
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Complete Your Profile</h3>
            <p className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>Help others get to know you better</p>
          </div>
        </div>
        <button
          onClick={onCompleteProfile}
          className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
            isDark 
              ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10' 
              : 'text-blue-600 hover:text-blue-700 hover:bg-blue-100'
          }`}
        >
          Complete Now
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}>Profile Completion</span>
          <span className={`text-sm font-bold ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}>{completionPercentage}%</span>
        </div>
        <div className={`w-full rounded-full h-2 ${
          isDark ? 'bg-gray-600/50' : 'bg-gray-200'
        }`}>
          <div 
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Missing Fields Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className={`flex items-center gap-1 ${
          profile?.displayName 
            ? (isDark ? 'text-green-400' : 'text-green-600') 
            : (isDark ? 'text-gray-500' : 'text-gray-400')
        }`}>
          <User className="w-3 h-3" />
          <span>Name</span>
          {profile?.displayName && <span className={isDark ? 'text-green-400' : 'text-green-500'}>✓</span>}
        </div>
        <div className={`flex items-center gap-1 ${
          profile?.role && profile.role !== "none" && profile.role !== "" 
            ? (isDark ? 'text-green-400' : 'text-green-600') 
            : (isDark ? 'text-gray-500' : 'text-gray-400')
        }`}>
          <Briefcase className="w-3 h-3" />
          <span>Role</span>
          {profile?.role && profile.role !== "none" && profile.role !== "" && 
            <span className={isDark ? 'text-green-400' : 'text-green-500'}>✓</span>}
        </div>
        <div className={`flex items-center gap-1 ${
          profile?.location 
            ? (isDark ? 'text-green-400' : 'text-green-600') 
            : (isDark ? 'text-gray-500' : 'text-gray-400')
        }`}>
          <MapPin className="w-3 h-3" />
          <span>Location</span>
          {profile?.location && <span className={isDark ? 'text-green-400' : 'text-green-500'}>✓</span>}
        </div>
        <div className={`flex items-center gap-1 ${
          profile?.profilePictureUrl || profile?.avatarGradient 
            ? (isDark ? 'text-green-400' : 'text-green-600') 
            : (isDark ? 'text-gray-500' : 'text-gray-400')
        }`}>
          <Camera className="w-3 h-3" />
          <span>Photo</span>
          {(profile?.profilePictureUrl || profile?.avatarGradient) && 
            <span className={isDark ? 'text-green-400' : 'text-green-500'}>✓</span>}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionCard;
