import { useOutletContext } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
import { 
  BookOpen, 
  MessageCircle, 
  FolderOpen, 
  Clock,
  Award
} from "lucide-react";
import { NavLink } from "react-router-dom";

const DashboardHome = () => {
  const { isDark } = useTheme();
  const { user, userName } = useOutletContext();
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
    }
  ];  return (
    <div className={`flex-1 overflow-auto relative ${
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
      </div>

      {/* Mobile-Responsive Header */}
      <div className={`backdrop-blur-xl border-b px-4 sm:px-6 py-3 sm:py-4 relative ${
        isDark 
          ? 'bg-gray-800/70 border-gray-700/50'
          : 'bg-white/70 border-gray-200/50'
      }`}>
        {/* Glass effect overlay */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-r from-gray-800/30 to-gray-900/30'
            : 'bg-gradient-to-r from-white/30 to-gray-50/30'
        }`}></div>
        
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-2 sm:mb-0">
            <h1 className={`text-xl sm:text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome back, {user?.displayName || userName || "Student"}!
            </h1>
            <p className={`mt-1 text-sm sm:text-base ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Ready to continue your learning journey?
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className={`text-xs sm:text-sm font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className={`text-xs sm:text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 pb-20 lg:pb-6">        {/* Quick Actions */}
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
        </div>

        {/* Stats Grid */}
        <div>
          <h2 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Your Progress</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div key={stat.name} className={`p-3 sm:p-6 rounded-xl border backdrop-blur-sm ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700/50'
                  : 'bg-white/70 border-gray-200'
              }`}>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bgColor} border ${stat.borderColor}`}>
                    <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-lg sm:text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>{stat.value}</p>
                    <p className={`text-xs sm:text-sm truncate ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>{stat.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">          {/* Recent Activity */}
          <div className={`rounded-xl border p-4 sm:p-6 backdrop-blur-sm ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white/70 border-gray-200'
          }`}>
            <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Recent Activity</h3>
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}>
                    <activity.icon className={`w-4 h-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      isDark ? 'text-gray-200' : 'text-gray-900'
                    }`}>{activity.title}</p>
                    <p className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Streak */}
          <div className={`rounded-xl border p-4 sm:p-6 backdrop-blur-sm ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white/70 border-gray-200'
          }`}>
            <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Study Streak</h3>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold text-white">7</span>
              </div>
              <h4 className={`text-lg sm:text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Days</h4>
              <p className={`text-sm sm:text-base ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>Keep it up! You&apos;re on fire 🔥</p>
              <div className="mt-3 sm:mt-4 flex justify-center space-x-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>        {/* Featured Resources */}
        <div className={`rounded-xl border p-4 sm:p-6 backdrop-blur-sm ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white/70 border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className={`text-base sm:text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Featured Study Materials</h3>
            <NavLink 
              to="/dashboard/materials"
              className={`text-sm font-medium transition-colors duration-200 ${
                isDark 
                  ? 'text-blue-400 hover:text-blue-300'
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              View all →
            </NavLink>
          </div>          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                }`}>{material.title}</h4>
                <p className={`text-xs ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>{material.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
