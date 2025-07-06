import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebase";
import { logout } from "./features/user/userSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import ProfileGuard from "./route/ProfileGuard";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Global auth state listener to handle user changes
  useEffect(() => {
    let lastUserId = null;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If user changed, clear Redux state
        if (lastUserId && lastUserId !== currentUser.uid) {
          console.log("User changed, clearing Redux state");
          dispatch(logout());
        }
        lastUserId = currentUser.uid;
      } else {
        // User signed out
        if (lastUserId) {
          console.log("User signed out, clearing Redux state");
          dispatch(logout());
        }
        lastUserId = null;
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Logic for hiding the Header
  const hideHeader =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/customize-profile" ||
    location.pathname.startsWith("/dashboard"); // Header is hidden for /dashboard and its sub-routes

  // Logic for hiding the Footer
  const hideFooter =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/customize-profile" ||
    location.pathname === "/demo" || // Add /demo here specifically for the footer
    location.pathname.startsWith("/dashboard"); // Footer is also hidden for /dashboard and its sub-routes


  return (
    <div>
      {!hideHeader && <Header />} {/* Use hideHeader for Header */}
      <ProfileGuard>
        <Outlet />
      </ProfileGuard>
      {!hideFooter && <Footer />} {/* Use hideFooter for Footer */}
      <ThemeToggle />
    </div>
  );
};

export default Layout;