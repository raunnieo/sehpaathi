import { ArrowLeft, Clock, Mail, Bell, Rocket, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";

const ComingSoon = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: Rocket,
      title: "Advanced Features",
      description: "Enhanced AI capabilities and personalized learning experiences"
    },
    {
      icon: Star,
      title: "Premium Content",
      description: "Exclusive study materials and expert-curated resources"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance and instant response times"
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50/30'}`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6">
        <button
          onClick={() => navigate(-1)}
          className={`group flex items-center space-x-2 px-4 py-2 ${isDark 
            ? 'text-gray-300 hover:text-white bg-gray-800/60 hover:bg-gray-700/60 border-gray-700/50 hover:border-gray-600' 
            : 'text-gray-600 hover:text-gray-900 bg-white/60 hover:bg-white border-gray-200/50 hover:border-gray-300'
          } border rounded-xl transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-xl font-medium`}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Go Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Main Illustration */}
          <div className="mb-8 sm:mb-12">
            <div className={`inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 ${isDark ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-400/30' : 'bg-gradient-to-br from-blue-100 to-purple-100 border-blue-200/30'} border-4 rounded-full shadow-2xl backdrop-blur-xl mb-6`}>
              <Clock className={`w-12 h-12 sm:w-16 sm:h-16 ${isDark ? 'text-blue-400' : 'text-blue-600'} animate-pulse`} />
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold ${isDark ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' : 'bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800'} bg-clip-text text-transparent`}>
                Coming Soon
              </h1>
                <p className={`text-xl sm:text-2xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto leading-relaxed`}>
                We&apos;re working on something amazing!
              </p>
              
              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
                This feature is currently under development. We&apos;re building something incredible that will enhance your learning experience with Sehpaathi AI. Stay tuned for updates!
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group p-6 ${isDark ? 'bg-gray-800/60 border-gray-700/50 hover:border-gray-600/50' : 'bg-white/60 border-gray-200/50 hover:border-gray-300/50'} border rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${isDark ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-br from-blue-100 to-purple-100'} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Notification Signup */}
          <div className={`max-w-md mx-auto p-6 sm:p-8 ${isDark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-gray-200/50'} border rounded-2xl backdrop-blur-xl shadow-lg`}>
            <div className="flex items-center justify-center mb-4">
              <Bell className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Get Notified
              </h3>
            </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
              Be the first to know when this feature launches. We&apos;ll send you an update as soon as it&apos;s ready!
            </p>
            
            <form className="space-y-4">
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200 ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400'
                      : 'border-gray-200 bg-white/50 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              
              <button 
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                Notify Me When Ready
              </button>
            </form>
          </div>          {/* Timeline Hint */}
          <div className="mt-8 sm:mt-12">
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'} font-medium`}>
            
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
