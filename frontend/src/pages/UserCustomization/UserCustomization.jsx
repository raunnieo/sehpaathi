import { useState } from "react";
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
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { db, storage, auth } from "../../auth/firebase";
import { setUserInfo } from "../../features/user/userSlice";

const UserCustomization = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
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
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(userDocRef, profileData);

      // Update Redux store
      dispatch(setUserInfo({
        displayName: formData.displayName,
        email: auth.currentUser.email,
        photoURL: profilePictureUrl,
        profileData: profileData
      }));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkip = async () => {
    try {
      // Save minimal user data to Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const minimalData = {
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName || "User",
        email: auth.currentUser.email,
        isProfileComplete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(userDocRef, minimalData);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving minimal profile:", error);
      navigate("/dashboard"); // Navigate anyway
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-blue-100 mt-1">Let&apos;s personalize your Sehpaathi experience</p>
        </div>

        <div className="p-8">
          {/* Profile Picture Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden ${
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
              <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer text-white shadow-lg transition-colors">
                <Camera className="w-4 h-4" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">Upload a photo or choose an avatar</p>
          </div>

          {/* Avatar Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose an Avatar
            </label>            <div className="grid grid-cols-4 gap-3">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`w-16 h-16 rounded-full border-2 transition-all ${
                    formData.selectedAvatar === avatar.gradient
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${avatar.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {avatar.name.charAt(0)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                placeholder="Enter your display name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select gender</option>
                {genderOptions.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter your city, state"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About You
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us a bit about yourself..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">            <button
              onClick={handleSkip}
              className="flex items-center justify-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isUploading}
            >
              <SkipForward className="w-4 h-4" />
              Skip for now
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUploading || !formData.displayName.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Complete Setup
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            You can always update your profile information later from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCustomization;
