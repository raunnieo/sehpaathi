import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectProfile } from "../features/user/userSlice";

const ProfileGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const profile = useSelector(selectProfile);

  useEffect(() => {
    // Only redirect if user is authenticated and trying to access dashboard
    if (isAuthenticated && location.pathname.startsWith('/dashboard')) {
      // Check if profile is incomplete AND user hasn't explicitly skipped
      const shouldRedirect = !profile?.isProfileComplete && !profile?.profileSkipped;
      
      if (shouldRedirect) {
        // Don't redirect if already on customize-profile page
        if (location.pathname !== '/customize-profile') {
          navigate('/customize-profile', { replace: true });
        }
      }
    }
  }, [isAuthenticated, profile, location.pathname, navigate]);

  return children;
};

export default ProfileGuard;
