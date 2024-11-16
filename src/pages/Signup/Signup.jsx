import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { authService } from "../../auth/authService.js"; // Make sure this path is correct

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
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
    setIsLoading(true);

    try {
      await authService.signUpWithEmail(
        formData.email,
        formData.password,
        selectedRole,
        formData.name
      );
      navigate("/dashboard");
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
    setIsLoading(true);

    try {
      await authService.signInWithGoogle(selectedRole);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-boxbg flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={() => {
            if (showEmailForm) {
              setShowEmailForm(false);
              setSelectedRole("");
            } else {
              navigate(-1);
            }
          }}
          className={`flex items-center gap-2 text-gray-600 hover:text-gray-800 ${
            !showEmailForm ? "hidden" : "visible"
          }`}
        >
          <ArrowBackIcon />
          <span>Back</span>
        </button>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8">
              <img
                src="src/assets/logo.png"
                alt="Sehpaathi Owl Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">SEHPAATHI</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Sign up for Sehpaathi
          </h2>
          <p className="text-gray-600">What type of an account do you need?</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!showEmailForm ? (
          <>
            {/* Account Type Options */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleRoleSelect("student")}
                className={`w-full bg-signbut hover:bg-signbuthov p-4 rounded-lg flex items-center justify-between group transition-colors ${
                  selectedRole === "student" ? "bg-signbuthov" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <SchoolIcon className="w-6 h-6" />
                  <span className="font-medium text-gray-800">
                    A student account
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                onClick={() => handleRoleSelect("instructor")}
                className={`w-full bg-signbut hover:bg-signbuthov p-4 rounded-lg flex items-center justify-between group transition-colors ${
                  selectedRole === "instructor" ? "bg-signbuthov" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <AdminPanelSettingsIcon className="w-6 h-6" />
                  <span className="font-medium text-gray-800">
                    An instructor account
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full border border-gray-300 p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mb-6"
            >
              <GoogleIcon />
              <span className="text-gray-600">Continue with Google</span>
            </button>
          </form>
        )}

        {/* Login Link */}
        <div className="text-center mt-6">
          <Link
            to="/signin"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
