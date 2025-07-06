import { useOutletContext } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
import { useState } from "react";
import { 
  BookOpen, 
  MessageCircle, 
  FolderOpen, 
  Clock,
  Award,
  LogOut,
  Flame
} from "lucide-react";
import { NavLink } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import DateHeader from "../../components/DateHeader/DateHeader";

const DashboardHome = () => {
  const { isDark } = useTheme();
  const { user, userName, handleLogOut } = useOutletContext();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    handleLogOut();
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };
  const quickActions = [
    {
      name: "Chat with AI",
      description: "Get instant help with your studies",
      href: "/dashboard/chat",
      icon: MessageCircle,
      color: "from-blue-500 to-blue-600",
      bgColor: isDark ? "bg-blue-500/10" : "bg-blue-50",
      textColor: isDark ? "text-blue-400" : "text-blue-700",
      borderColor: isDark ? "border-blue-500/30" : "border-blue-200"
    },
    {
      name: "Browse Materials",
      description: "Access course materials and notes",
      href: "/dashboard/materials",
      icon: BookOpen,
      color: "from-green-500 to-green-600",
      bgColor: isDark ? "bg-green-500/10" : "bg-green-50",
      textColor: isDark ? "text-green-400" : "text-green-700",
      borderColor: isDark ? "border-green-500/30" : "border-green-200"
    },
    {
      name: "Manage Resources",
      description: "Organize your study resources",
      href: "/dashboard/resources",
      icon: FolderOpen,
      color: "from-purple-500 to-purple-600",
      bgColor: isDark ? "bg-purple-500/10" : "bg-purple-50",
      textColor: isDark ? "text-purple-400" : "text-purple-700",
      borderColor: isDark ? "border-purple-500/30" : "border-purple-200"
    }
  ];

  const stats = [
    {
      name: "Study Sessions",
      value: "12",
      icon: Clock,
      color: isDark ? "text-blue-400" : "text-blue-600",
      bgColor: isDark ? "bg-blue-500/10" : "bg-blue-100",
      borderColor: isDark ? "border-blue-500/30" : "border-blue-200"
    },
    {
      name: "AI Interactions",
      value: "45",
      icon: MessageCircle,
      color: isDark ? "text-green-400" : "text-green-600",
      bgColor: isDark ? "bg-green-500/10" : "bg-green-100",
      borderColor: isDark ? "border-green-500/30" : "border-green-200"
    },
    {
      name: "Resources Saved",
      value: "8",
      icon: FolderOpen,
      color: isDark ? "text-purple-400" : "text-purple-600",
      bgColor: isDark ? "bg-purple-500/10" : "bg-purple-100",
      borderColor: isDark ? "border-purple-500/30" : "border-purple-200"
    },
    {
      name: "Achievement Points",
      value: "156",
      icon: Award,
      color: isDark ? "text-yellow-400" : "text-yellow-600",
      bgColor: isDark ? "bg-yellow-500/10" : "bg-yellow-100",
      borderColor: isDark ? "border-yellow-500/30" : "border-yellow-200"
    }
  ];

  const recentActivity = [
    {
      type: "chat",
      title: "Asked about Data Structures",
      time: "2 hours ago",
      icon: MessageCircle
    },
    {
      type: "resource",
      title: "Saved Linear Algebra Notes",
      time: "5 hours ago",
      icon: FolderOpen
    },
    {
      type: "material",
      title: "Downloaded Physics Lab Manual",
      time: "1 day ago",
      icon: BookOpen
    }  ];

  return (
    <div className={`flex-1 flex flex-col overflow-hidden relative ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-blue-500/20' : 'bg-blue-500/30'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15 ${
          isDark ? 'bg-purple-500/20' : 'bg-purple-500/30'
        }`}></div>
      </div>      {/* Enhanced Seamless Header - Fixed and Responsive */}
      <div className={`flex-shrink-0 relative px-4 sm:px-6 py-5 sm:py-6 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100/50'} z-10`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10' : 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5'}`}></div>
        <div className="relative flex items-center justify-between">
          <DashboardHeader userName={user?.displayName || userName || "Student"} selectedRole="dashboard" />
          
          {/* Mobile Signout Button - Only visible on mobile */}
          <button
            onClick={handleLogoutClick}
            className={`lg:hidden p-2.5 ${isDark 
              ? 'text-gray-400 hover:text-red-400 bg-gray-700/60 hover:bg-red-500/10 border-gray-600/50 hover:border-red-500/50' 
              : 'text-gray-500 hover:text-red-500 bg-white/60 hover:bg-red-50 border-gray-200/50 hover:border-red-200'
            } border rounded-xl transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-xl`}
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Date Header - Sticky */}
      <DateHeader />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 pb-20 lg:pb-6">{/* Quick Actions */}
        <div>
          <h2 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {quickActions.map((action) => (
              <NavLink
                key={action.name}
                to={action.href}
                className={`block p-4 sm:p-6 rounded-xl border transition-all duration-200 hover:shadow-md active:scale-95 backdrop-blur-sm ${
                  action.bgColor
                } ${
                  action.borderColor
                } ${
                  isDark 
                    ? 'hover:border-gray-600/50 hover:bg-white/5'
                    : 'hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${action.color}`}>
                    <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm sm:text-base ${action.textColor}`}>{action.name}</h3>
                    <p className={`text-xs sm:text-sm mt-1 truncate ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>{action.description}</p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>        {/* Enhanced Stats Grid with Progress Charts */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className={`text-base sm:text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Your Progress</h2>
            <div className="text-xs text-gray-500">
              Last 7 days
            </div>
          </div>
          
          
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    
          {/* Study Streak */}
          <div className={`rounded-xl border p-4 sm:p-6 backdrop-blur-sm relative overflow-hidden ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white/70 border-gray-200'
          }`}>
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10 opacity-50"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className={`text-base sm:text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Study Streak</h3>
                <div className="animate-pulse">
                  <Flame className="w-5 h-5 text-orange-500 animate-bounce" />
                </div>
              </div>
              
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4">
                  {/* Animated background rings */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping opacity-20"></div>
                  <div className="relative z-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full w-full h-full flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold text-white">7</span>
                  </div>
                </div>
                
                <h4 className={`text-lg sm:text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Days</h4>
                <p className={`text-sm sm:text-base ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Keep it up! You&apos;re on fire 
                  <span className="inline-block ml-1 animate-bounce">🔥</span>
                </p>
                
                {/* Enhanced streak visualization */}
                <div className="mt-3 sm:mt-4 flex justify-center space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        i < 7 
                          ? 'bg-gradient-to-r from-orange-400 to-red-500 animate-pulse' 
                          : 'bg-gray-300'
                      }`}
                      style={{
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Streak milestone */}
                <div className="mt-4 p-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                  <p className="text-xs text-orange-600 font-medium">
                    🎯 3 more days to reach 10-day milestone!
                  </p>
                </div>
              </div>
            </div>
          </div>          {/* Recent Activity - Enhanced with animations */}
          <div className={`rounded-xl border p-4 sm:p-6 backdrop-blur-sm relative overflow-hidden ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white/70 border-gray-200'
          }`}>
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 opacity-50"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className={`text-base sm:text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Recent Activity</h3>
                <div className="animate-pulse">
                  <Clock className="w-5 h-5 text-indigo-500 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className={`group flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                      isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50/80'
                    }`}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className={`relative p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                      isDark ? 'bg-gray-700/50 group-hover:bg-indigo-600/20' : 'bg-gray-100 group-hover:bg-indigo-100'
                    }`}>
                      {/* Animated glow ring */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
                      
                      <activity.icon className={`relative z-10 w-4 h-4 transition-colors duration-300 ${
                        isDark ? 'text-gray-400 group-hover:text-indigo-400' : 'text-gray-600 group-hover:text-indigo-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate transition-colors duration-300 ${
                        isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-900 group-hover:text-indigo-900'
                      }`}>{activity.title}</p>
                      <div className="flex items-center space-x-2">
                        <p className={`text-xs transition-colors duration-300 ${
                          isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-600'
                        }`}>{activity.time}</p>
                        {index === 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 animate-pulse">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Activity progress indicator */}
                    <div className="flex flex-col items-center space-y-1">
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === 0 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse' 
                          : index < 3 
                            ? 'bg-gradient-to-r from-indigo-400 to-purple-500'
                            : isDark ? 'bg-gray-600' : 'bg-gray-300'
                      }`}></div>
                      {index < recentActivity.length - 1 && (
                        <div className={`w-px h-4 ${
                          isDark ? 'bg-gray-600' : 'bg-gray-200'
                        } transition-colors duration-300 group-hover:bg-indigo-400`}></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Activity summary footer */}
              <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse"></div>
                    <p className="text-xs text-indigo-600 font-medium">
                      📈 {recentActivity.length} activities today
                    </p>
                  </div>
                  <div className="text-xs text-indigo-500 font-medium animate-bounce">
                    ✨ Keep learning!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
            {stats.map((stat) => (
              <div key={stat.name} className={`p-3 sm:p-6 rounded-xl border backdrop-blur-sm relative overflow-hidden ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700/50'
                  : 'bg-white/70 border-gray-200'
              }`}>
                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-10`}></div>
                
                <div className="relative flex items-center space-x-2 sm:space-x-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bgColor} border ${stat.borderColor} shadow-sm`}>
                    <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-lg sm:text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    } transition-all duration-300`}>{stat.value}</p>
                    <p className={`text-xs sm:text-sm truncate ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>{stat.name}</p>
                  </div>
                </div>
                
                {/* Mini trend indicator */}
                <div className="absolute top-2 right-2">
                  <div className={`w-8 h-4 rounded-sm ${stat.bgColor} opacity-20`}>
                    <svg className="w-full h-full" viewBox="0 0 32 16">
                      <path 
                        d="M0,12 Q8,8 16,10 T32,6" 
                        stroke={stat.color.includes('blue') ? '#3b82f6' : 
                               stat.color.includes('green') ? '#10b981' : 
                               stat.color.includes('purple') ? '#8b5cf6' : '#f59e0b'} 
                        strokeWidth="1.5" 
                        fill="none"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        

        {/* Featured Resources */}
        <div className={`rounded-xl border p-4 sm:p-6 backdrop-blur-sm ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white/70 border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className={`text-base sm:text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Featured Study Materials</h3>            <NavLink 
              to="/dashboard/materials"
              className={`text-sm font-medium transition-colors duration-200 ${
                isDark 
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              View all →
            </NavLink>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Data Structures & Algorithms", subject: "Computer Science", difficulty: "Intermediate" },
              { title: "Linear Algebra Notes", subject: "Mathematics", difficulty: "Advanced" },
              { title: "Physics Lab Manual", subject: "Physics", difficulty: "Beginner" }
            ].map((material, index) => (
              <div key={index} className={`p-4 border rounded-lg transition-colors backdrop-blur-sm ${
                isDark 
                  ? 'border-gray-600/50 hover:border-gray-500/50 bg-gray-700/30'
                  : 'border-gray-200 hover:border-gray-300 bg-white/50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <BookOpen className={`w-5 h-5 mt-1 ${
                    isDark ? 'text-blue-400' : 'text-blue-500'
                  }`} />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    material.difficulty === 'Beginner' 
                      ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                      : material.difficulty === 'Intermediate' 
                      ? (isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700')
                      : (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')
                  }`}>
                    {material.difficulty}
                  </span>
                </div>
                <h4 className={`font-semibold text-sm mb-1 ${
                  isDark ? 'text-gray-200' : 'text-gray-900'
                }`}>{material.title}</h4>                <p className={`text-xs ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>{material.subject}</p>
              </div>
            ))}
          </div>
        </div>
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

export default DashboardHome;
