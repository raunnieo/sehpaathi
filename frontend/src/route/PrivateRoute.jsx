// PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectProfile } from "../features/user/userSlice.js";

const PrivateRoute = ({ element }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const profile = useSelector(selectProfile);

  // Redirect to /signin if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // If trying to access dashboard and profile is not complete AND user hasn't skipped, redirect to customize-profile
  if (location.pathname.startsWith('/dashboard')) {
    const shouldRedirect = !profile?.isProfileComplete && !profile?.profileSkipped;
    if (shouldRedirect) {
      return <Navigate to="/customize-profile" replace />;
    }
  }

  return element;
};

export default PrivateRoute;
