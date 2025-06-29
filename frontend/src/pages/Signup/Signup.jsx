import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
import {
  School,
  UserCog,
  ArrowLeft,
  Mail,
  Lock,
  User,
  ChevronRight,
  Loader2,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import { authService } from "../../auth/authService.js";

const Signup = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowEmailForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);    try {
      await authService.signUpWithEmail(
        formData.email,
        formData.password,
        selectedRole,
        formData.name
      );
      navigate("/customize-profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!selectedRole) {
      setError("Please select an account type first");
      return;
    }

    setError("");
    setIsLoading(true);    try {
      await authService.signInWithGoogle(selectedRole);
      navigate("/customize-profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };  return (
    <div className={`min-h-screen relative flex items-center justify-center p-4 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse ${
          isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDark ? 'bg-purple-500/10' : 'bg-purple-500/20'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-2000 ${
          isDark ? 'bg-green-500/5' : 'bg-green-500/15'
        }`}></div>
      </div>

      <div className={`relative z-10 backdrop-blur-xl border rounded-3xl p-6 lg:p-8 max-w-md w-full shadow-2xl ${
        isDark 
          ? 'bg-gray-800/70 border-gray-700/50 shadow-black/20'
          : 'bg-white/70 border-white/60 shadow-gray-500/10'
      }`}>
        {/* Additional glass effect overlay */}
        <div className={`absolute inset-0 rounded-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-blue-500/5 to-purple-500/5'
            : 'bg-gradient-to-br from-blue-50/50 to-purple-50/50'
        }`}></div>
        {/* Content Container */}
        <div className="relative">
          {/* Back Button */}          <button
            onClick={() => {
              if (showEmailForm) {
                setShowEmailForm(false);
                setSelectedRole("");
              } else {
                navigate(-1);
              }
            }}
            className={`group flex items-center gap-2 transition-colors mb-4 ${
              !showEmailForm ? "hidden" : "visible"
            } ${
              isDark 
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* Logo and Title */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <img
                  src="/assets/logo.png"
                  alt="Sehpaathi Logo"
                  className="w-6 h-6 object-contain filter brightness-0 invert"
                />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SEHPAATHI
              </h1>
            </div>            <div className={`inline-flex items-center gap-2 bg-gradient-to-r backdrop-blur-sm border px-3 py-1.5 rounded-full text-xs font-medium mb-3 ${
              isDark 
                ? 'from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-300'
                : 'from-blue-100 to-purple-100 border-blue-300 text-blue-700'
            }`}>
              <Sparkles className="w-3 h-3" />
              Join Us
            </div><h2 className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Create your account
            </h2>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {!showEmailForm
                ? "What type of account do you need?"
                : `Setting up your ${selectedRole} account`}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-bold text-xs">!</span>
              </div>
              {error}
            </div>
          )}

          {!showEmailForm ? (
            <>
              {/* Account Type Selection */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleRoleSelect("student")}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group hover:border-blue-500/50 hover:bg-blue-500/10 ${
                    selectedRole === "student"
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-gray-700/50 bg-gray-700/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <School className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Student</p>
                      <p className="text-xs text-gray-400">
                        For learning and accessing resources
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-colors ${
                      selectedRole === "student"
                        ? "text-blue-400"
                        : "text-gray-500"
                    }`}
                  />
                </button>

                <button
                  onClick={() => handleRoleSelect("instructor")}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group hover:border-purple-500/50 hover:bg-purple-500/10 ${
                    selectedRole === "instructor"
                      ? "border-purple-500/50 bg-purple-500/10"
                      : "border-gray-700/50 bg-gray-700/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                      <UserCog className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Instructor</p>
                      <p className="text-xs text-gray-400">
                        For teaching and managing content
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-colors ${
                      selectedRole === "instructor"
                        ? "text-purple-400"
                        : "text-gray-500"
                    }`}
                  />
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">              <div>
                <label className={`block text-sm font-medium mb-1.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm text-sm ${
                      isDark 
                        ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400'
                        : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                  <User className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm text-sm ${
                      isDark 
                        ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400'
                        : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="username@example.com"
                    required
                  />
                  <Mail className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full p-3 pl-10 pr-10 border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm text-sm ${
                      isDark 
                        ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400'
                        : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="••••••••"
                    required
                  />
                  <Lock className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                      isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-400'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Creating account...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">Create Account</span>
                    <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${
                    isDark ? 'border-gray-700' : 'border-gray-300'
                  }`}></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className={`px-3 ${
                    isDark 
                      ? 'bg-gray-800 text-gray-400'
                      : 'bg-white text-gray-600'
                  }`}>
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogleSignUp}
                type="button"
                disabled={isLoading}
                className={`w-full p-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group hover:scale-[1.02] backdrop-blur-sm border ${
                  isDark 
                    ? 'bg-gray-700/50 border-gray-600/50 hover:bg-gray-700/70'
                    : 'bg-white/50 border-gray-300/50 hover:bg-white/70'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className={`font-medium text-sm group-hover:transition-colors ${
                  isDark 
                    ? 'text-gray-300 group-hover:text-white'
                    : 'text-gray-700 group-hover:text-gray-900'
                }`}>Continue with Google</span>
              </button>
            </form>
          )}          {/* Login Link */}
          <div className="text-center mt-6">
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Already have an account?{" "}
              <Link
                to="/signin"
                className={`font-semibold transition-colors ${
                  isDark 
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
