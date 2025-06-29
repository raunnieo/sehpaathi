import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { logout, selectUserName } from "../../features/user/userSlice";
import { authService } from "../../auth/authService";
import { useTheme } from "../../contexts/useTheme";
import { Loader2 } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../auth/firebase";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useSelector(selectUserName);const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch user profile data from Firestore
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
        setUserProfile(null);
        navigate('/signin');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogOut = async () => {
    try {
      // Sign out from Firebase first
      await authService.signOut();
      // Clear Redux state
      dispatch(logout());
      // Navigate to signin
      navigate('/signin');
    } catch (error) {
      console.error("Error signing out:", error);
      // Even if there's an error, clear Redux state and navigate
      dispatch(logout());
      navigate('/signin');
    }
  };
  if (loading) {
    return (
      <div className={`h-screen w-screen flex justify-center items-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="relative">
          {/* Background blur effects */}
          <div className={`absolute inset-0 w-32 h-32 rounded-full blur-3xl animate-pulse ${
            isDark ? 'bg-blue-500/20' : 'bg-blue-500/30'
          }`}></div>
          <Loader2 className={`relative w-16 h-16 animate-spin ${
            isDark ? 'text-blue-400' : 'text-blue-500'
          }`} />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }  return (
    <div className={`flex h-screen overflow-hidden relative ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 ${
          isDark ? 'bg-blue-500/10' : 'bg-blue-500/20'
        }`}></div>
        <div className={`absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-purple-500/10' : 'bg-purple-500/20'
        }`}></div>
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:flex relative z-10">
        <Sidebar 
          user={user}
          userProfile={userProfile}
          userName={userName}
          currentPath={location.pathname}
          onLogOut={handleLogOut}
        />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Outlet context={{ user, userProfile, userName }} />
      </main>
      
      {/* Mobile Bottom Navigation - Visible only on mobile */}
      <div className="lg:hidden relative z-10">
        <Sidebar 
          user={user}
          userProfile={userProfile}
          userName={userName}
          currentPath={location.pathname}
          onLogOut={handleLogOut}
          isMobile={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;
