import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectProfile, selectUserImage } from "../../features/user/userSlice";
import { useTheme } from "../../contexts/useTheme";
import {
  Home,
  MessageCircle,
  FolderOpen,
  BookOpen,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Sidebar = ({ currentPath, onLogOut, isMobile = false }) => {
  // Get user/profile from Redux for instant updates
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectProfile);
  const userName = userProfile?.displayName || user?.displayName || user?.email?.split('@')[0] || "User";
  const userImage = useSelector(selectUserImage);
  const { isDark } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    onLogOut();
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "AI Chat",
      href: "/dashboard/chat",
      icon: MessageCircle,
    },
    {
      name: "Resources",
      href: "/dashboard/resources",
      icon: FolderOpen,
    },
    {
      name: "Materials",
      href: "/dashboard/materials",
      icon: BookOpen,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ];  // Mobile Bottom Navigation
  // Mobile Bottom Navigation - Replace your mobile section with this
if (isMobile) {
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl border-t safe-area-bottom ${
      isDark 
        ? 'bg-gray-900/80 border-gray-700/50'
        : 'bg-white/80 border-gray-200/50'
    }`}>
      {/* Glass effect overlay */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-t from-gray-900/20 to-transparent'
          : 'bg-gradient-to-t from-white/20 to-transparent'
      }`}></div>
      
      <div className="relative flex items-center justify-around py-2 px-1 max-w-lg mx-auto">
        {navigation.map((item) => {
          return (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/dashboard"} // This ensures exact matching for dashboard
              className={({ isActive }) => `
                flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 min-w-0 flex-1 mx-0.5 relative backdrop-blur-sm
                ${isActive 
                  ? `${isDark 
                      ? "bg-blue-500/20 text-blue-400 " 
                      : "bg-blue-50 text-blue-600 "
                    }` 
                  : `${isDark 
                      ? "text-gray-400 hover:text-gray-200 hover:bg-white/5" 
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`
                }
              `}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium truncate">{
                item.name === "Dashboard" ? "Home" : 
                item.name === "AI Chat" ? "Chat" : 
                item.name
              }</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}// Desktop Sidebar
  return (
    <div className={`flex flex-col h-full backdrop-blur-xl border-r relative transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
      } ${isDark
        ? 'bg-gray-800/70 border-gray-700/50'
        : 'bg-white/70 border-gray-200/50'
      }`}>
      {/* Glass effect overlay */}
      <div className={`absolute inset-0 ${isDark
        ? 'bg-gradient-to-br from-gray-800/30 to-gray-900/30'
        : 'bg-gradient-to-br from-white/30 to-gray-50/30'
        }`}></div>

      {/* Logo and Brand */}
      <div className={`relative flex items-center px-6 py-7 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
        <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center w-full h-full' : 'space-x-3'
          }`}>
          <div className="w-10 h-10 flex-shrink-0">
            <img
              src="/assets/notwhite.png"
              alt="Sehpaathi Logo"
              className="w-10 h-10 rounded-xl"
            />
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-300">
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                }`}>Sehpaathi</h1>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>AI Learning Platform</p>
            </div>
          )}
        </div>

      </div>      {/* Navigation */}
      <nav className={`relative flex-1 py-4 space-y-1 ${isCollapsed ? 'px-2' : 'px-4'
        }`}>
        {navigation.slice(0, 4).map((item) => { // Exclude Profile from main nav
          const isActive = currentPath === item.href ||
            (item.href === "/dashboard" && currentPath === "/dashboard");

          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive: routerIsActive }) => {
                const active = isActive || routerIsActive;
                return `
                  group flex items-center text-sm font-medium rounded-lg transition-all duration-200 relative backdrop-blur-sm
                  ${isCollapsed ? 'px-2 py-3 justify-center' : 'px-3 py-2'}
                  ${active
                    ? `${isDark
                      ? "text-gray-300 hover:bg-white/5 hover:text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                    : `${isDark
                      ? "text-gray-400 group-hover:text-gray-300"
                      : "text-gray-400 group-hover:text-gray-500"
                    }`
                  }
                `;
              }}
              title={isCollapsed ? item.name : undefined}
            >
              {/* Glass effect for active items */}
              {(currentPath === item.href || (item.href === "/dashboard" && currentPath === "/dashboard")) && (
                <div className={`absolute inset-0 rounded-lg ${isDark
                  ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                  : 'bg-gradient-to-r from-blue-50/80 to-purple-50/80'
                  }`}></div>
              )}

              <item.icon
                className={`relative h-5 w-5 transition-colors duration-200 ${isCollapsed ? '' : 'mr-3'
                  } ${(currentPath === item.href || (item.href === "/dashboard" && currentPath === "/dashboard"))
                    ? `${isDark ? "text-blue-400" : "text-blue-500"}`
                    : `${isDark ? "text-gray-400 group-hover:text-gray-300" : "text-gray-400 group-hover:text-gray-500"}`
                  }`}
              />
              {!isCollapsed && (
                <span className="relative transition-opacity duration-300">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>    {/* Collapse Toggle Button */}

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-1 top-12 transform -translate-y-1/2 w-6 h-6   transition-all duration-200 ${isDark
          ? ' text-gray-300'
          : ' text-gray-600'
          } flex items-center justify-center`}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>  {/* User Info - Profile Navigation */}
      <NavLink
        to="/dashboard/profile"
        className={({ isActive }) => `
          relative block border-b transition-all duration-200 backdrop-blur-sm
          ${isCollapsed ? 'px-2 py-4' : 'px-6 py-4'}
          ${isActive || currentPath === "/dashboard/profile"
            ? `${isDark
              ? "bg-blue-500/20 border-gray-700/50"
              : "bg-blue-50 border-gray-200/50"
            }`
            : `${isDark
              ? "hover:bg-white/5 border-gray-700/50"
              : "hover:bg-gray-50 border-gray-200/50"
            }`
          }
        `}
        title={isCollapsed ? userProfile?.displayName || user?.displayName || userName || "Profile" : undefined}
      >

        {/* Glass effect for active profile */}
        {(currentPath === "/dashboard/profile") && (
          <div className={`absolute inset-0 ${isDark
            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
            : 'bg-gradient-to-r from-blue-50/80 to-purple-50/80'
            }`}></div>
        )}

        <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'
          }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-lg ${userProfile?.profilePictureUrl ? `${isDark ? "bg-gray-700" : "bg-gray-200"}` :
            userProfile?.avatarGradient ? `bg-gradient-to-br ${userProfile.avatarGradient}` :
              "bg-gradient-to-br from-blue-500 to-purple-600"
            }`}>
            {userImage ? (
              <img
                src={userImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-white">
                {userProfile?.displayName?.charAt(0) || user?.displayName?.charAt(0) || userName?.charAt(0) || "U"}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1 transition-opacity duration-300">
              <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                {userProfile?.displayName || user?.displayName || userName || "User"}
              </p>
              <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                {user?.email || "user@example.com"}
              </p>
            </div>
          )}
        </div>
      </NavLink>      {/* Footer */}
      <div className={`relative border-t ${isCollapsed ? 'px-2 py-7' : 'px-4 py-7'
        } ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>        <button
          onClick={handleLogoutClick}
          className={`group flex items-center w-full text-sm font-medium rounded-lg transition-all duration-200 backdrop-blur-sm relative border border-transparent
            ${isCollapsed ? 'px-2 py-3 justify-center' : 'px-3 py-2'}
            ${isDark
              ? 'text-gray-300 hover:bg-red-500/10 hover:text-red-400 '
              : 'text-gray-600 hover:bg-red-50 hover:text-red-700'
            }`}
          title={isCollapsed ? "Sign out" : undefined}
        >
          {/* Glass effect on hover */}
          <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isDark
            ? 'bg-gradient-to-r from-red-500/5 to-red-600/5'
            : 'bg-gradient-to-r from-red-50/80 to-red-100/80'
            }`}></div>

          <LogOut className={`relative h-5 w-5 transition-colors duration-200 ${isCollapsed ? '' : 'mr-3'
            } ${isDark
              ? 'text-gray-400 group-hover:text-red-400'
              : 'text-gray-400 group-hover:text-red-500'
            }`} />
          {!isCollapsed && (
            <span className="relative transition-opacity duration-300">Sign out</span>
          )}        </button>

      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleLogoutCancel}
          ></div>
          
          {/* Modal */}
          <div className={`relative max-w-md w-full rounded-2xl p-6 shadow-2xl backdrop-blur-xl border ${
            isDark 
              ? 'bg-gray-800/90 border-gray-700/50' 
              : 'bg-white/90 border-gray-200/50'
          }`}>
            <div className={`absolute inset-0 rounded-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-gray-800/30 to-gray-900/30' 
                : 'bg-gradient-to-br from-white/30 to-gray-50/30'
            }`}></div>
            
            <div className="relative">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${
                  isDark ? 'bg-red-500/20' : 'bg-red-50'
                } flex items-center justify-center`}>
                  <LogOut className={`w-6 h-6 ${
                    isDark ? 'text-red-400' : 'text-red-500'
                  }`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Sign Out
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Are you sure you want to sign out?
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleLogoutCancel}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 border ${
                    isDark
                      ? 'text-gray-300 border-gray-600 bg-gray-700/50 hover:bg-gray-600/50 hover:border-gray-500'
                      : 'text-gray-700 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Sidebar.propTypes = {
  currentPath: PropTypes.string.isRequired,
  onLogOut: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

export default Sidebar;
