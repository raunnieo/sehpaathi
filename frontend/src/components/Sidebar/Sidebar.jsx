import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
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

const Sidebar = ({ user, userProfile, userName, currentPath, onLogOut, isMobile = false }) => {
  const { isDark } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
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
            const isActive = currentPath === item.href || 
              (item.href === "/dashboard" && currentPath === "/dashboard");
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive: routerIsActive }) => {
                  const active = isActive || routerIsActive;
                  return `
                    flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 min-w-0 flex-1 mx-0.5 relative backdrop-blur-sm
                    ${active 
                      ? `${isDark 
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                          : "bg-blue-50 text-blue-600 border border-blue-200"
                        }` 
                      : `${isDark 
                          ? "text-gray-400 hover:text-gray-200 hover:bg-white/5" 
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`
                    }
                  `;
                }}
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
  }  // Desktop Sidebar
  return (
    <div className={`flex flex-col h-full backdrop-blur-xl border-r relative transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } ${
      isDark 
        ? 'bg-gray-800/70 border-gray-700/50'
        : 'bg-white/70 border-gray-200/50'
    }`}>
      {/* Glass effect overlay */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800/30 to-gray-900/30'
          : 'bg-gradient-to-br from-white/30 to-gray-50/30'
      }`}></div>

      {/* Logo and Brand */}
      <div className={`relative flex items-center px-6 py-6 border-b ${
        isDark ? 'border-gray-700/50' : 'border-gray-200/50'
      }`}>
        <div className={`flex items-center transition-all duration-300 ${
          isCollapsed ? 'justify-center w-full' : 'space-x-3'
        }`}>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <img
                  src="/assets/logo.png"
                  alt="Sehpaathi Logo"
                  className="w-6 h-6 object-contain filter brightness-0 invert"
                />
              </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-300">
              <h1 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Sehpaathi</h1>
              <p className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>AI Learning Platform</p>
            </div>
          )}
        </div>
        
        
      </div>      {/* Navigation */}
      <nav className={`relative flex-1 py-4 space-y-1 ${
        isCollapsed ? 'px-2' : 'px-4'
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
                        ? "bg-blue-500/20 text-blue-400 border-r-2 border-blue-400 shadow-lg" 
                        : "bg-blue-50 text-blue-700 border-r-2 border-blue-500 shadow-lg"
                      }` 
                    : `${isDark 
                        ? "text-gray-300 hover:bg-white/5 hover:text-white" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                  }
                `;
              }}
              title={isCollapsed ? item.name : undefined}
            >
              {/* Glass effect for active items */}
              {(currentPath === item.href || (item.href === "/dashboard" && currentPath === "/dashboard")) && (
                <div className={`absolute inset-0 rounded-lg ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                    : 'bg-gradient-to-r from-blue-50/80 to-purple-50/80'
                }`}></div>
              )}
              
              <item.icon
                className={`relative h-5 w-5 transition-colors duration-200 ${
                  isCollapsed ? '' : 'mr-3'
                } ${
                  (currentPath === item.href || (item.href === "/dashboard" && currentPath === "/dashboard"))
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
      </nav>      {/* User Info - Profile Navigation */}
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
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
              : 'bg-gradient-to-r from-blue-50/80 to-purple-50/80'
          }`}></div>
        )}
        
        <div className={`relative flex items-center ${
          isCollapsed ? 'justify-center' : 'space-x-3'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-lg ${
            userProfile?.profilePictureUrl ? `${isDark ? "bg-gray-700" : "bg-gray-200"}` :
            userProfile?.avatarGradient ? `bg-gradient-to-br ${userProfile.avatarGradient}` :
            "bg-gradient-to-br from-blue-500 to-purple-600"
          }`}>
            {userProfile?.profilePictureUrl ? (
              <img 
                src={userProfile.profilePictureUrl} 
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
              <p className={`text-sm font-medium truncate ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {userProfile?.displayName || user?.displayName || userName || "User"}
              </p>
              <p className={`text-xs truncate ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {user?.email || "user@example.com"}
              </p>
            </div>
          )}
        </div>
      </NavLink>      {/* Footer */}
      <div className={`relative border-t ${
        isCollapsed ? 'px-2 py-4' : 'px-4 py-4'
      } ${
        isDark ? 'border-gray-700/50' : 'border-gray-200/50'
      }`}>
        <button
          onClick={onLogOut}
          className={`group flex items-center w-full text-sm font-medium rounded-lg transition-all duration-200 backdrop-blur-sm relative border border-transparent
            ${isCollapsed ? 'px-2 py-3 justify-center' : 'px-3 py-2'}
            ${isDark 
              ? 'text-gray-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30'
              : 'text-gray-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200'
            }`}
          title={isCollapsed ? "Sign out" : undefined}
        >
          {/* Glass effect on hover */}
          <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
            isDark 
              ? 'bg-gradient-to-r from-red-500/5 to-red-600/5'
              : 'bg-gradient-to-r from-red-50/80 to-red-100/80'
          }`}></div>
          
          <LogOut className={`relative h-5 w-5 transition-colors duration-200 ${
            isCollapsed ? '' : 'mr-3'
          } ${
            isDark 
              ? 'text-gray-400 group-hover:text-red-400'
              : 'text-gray-400 group-hover:text-red-500'
          }`} />
          {!isCollapsed && (
            <span className="relative transition-opacity duration-300">Sign out</span>
          )}
        </button>
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute right-3 bottom-3 transform -translate-y-1/2 w-6 h-6 rounded-full shadow-lg transition-all duration-200 border backdrop-blur-sm z-10 ${
            isDark 
              ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300'
              : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-600'
          }`}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 mx-auto" />
          ) : (
            <ChevronLeft className="w-4 h-4 mx-auto" />
          )}
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object,
  userProfile: PropTypes.object,
  userName: PropTypes.string,
  currentPath: PropTypes.string.isRequired,
  onLogOut: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

export default Sidebar;
