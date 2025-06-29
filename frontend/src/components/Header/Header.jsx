import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
import { BookOpen, User, UserPlus, Home, GraduationCap, ArrowRight, Menu, X } from "lucide-react";

function Header() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerItems = [
    {
      name: "Home",
      href: "",
      icon: Home,
    },
    {
      name: "About",
      href: "about",
      icon: BookOpen,
    },
  ];

  const authItems = [
    {
      name: "Sign In",
      href: "signin",
      icon: User,
      variant: "outline",
    },
    {
      name: "Sign Up",
      href: "signup",
      icon: UserPlus,
      variant: "gradient",
    },
  ];

  const handleNavigation = (href) => {
    navigate(`/${href}`);
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? `backdrop-blur-xl shadow-2xl border-b ${
            isDark 
              ? 'bg-gray-900/80 shadow-blue-500/10 border-gray-800/30' 
              : 'bg-white/80 shadow-blue-500/5 border-gray-100/30'
          }` 
        : `backdrop-blur-md ${
            isDark ? 'bg-gray-900/60' : 'bg-white/60'
          }`
    }`}>
      {/* Background glass effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo and Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:shadow-2xl group-hover:shadow-blue-500/40 group-hover:scale-110 transition-all duration-300">
                <GraduationCap className="w-6 h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
              </div>
              <div className={`absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 animate-pulse shadow-lg ${
                isDark ? 'border-gray-900' : 'border-white'
              }`}></div>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
                Sehpaathi
              </h1>
              <p className={`text-xs lg:text-sm font-medium hidden sm:block transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                AI Learning Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {headerItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`group relative flex items-center gap-3 px-5 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                    isDark 
                      ? 'text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/60 backdrop-blur-sm'
                  }`}
                  onClick={() => handleNavigation(item.href)}
                >
                  {/* Glass background */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10'
                      : 'bg-gradient-to-r from-blue-50/80 to-purple-50/80 border border-gray-200/50'
                  } backdrop-blur-xl shadow-lg`}></div>
                  
                  <Icon className="relative w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {authItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden ${
                    item.variant === 'gradient'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40'
                      : `backdrop-blur-xl border transition-all duration-300 ${
                          isDark 
                            ? 'border-gray-600/50 text-gray-300 hover:text-white hover:border-blue-400/50 bg-gray-800/30 hover:bg-gray-700/50'
                            : 'border-gray-200/50 text-gray-700 hover:text-gray-900 hover:border-blue-300/50 bg-white/30 hover:bg-white/60'
                        }`
                  }`}
                  onClick={() => handleNavigation(item.href)}
                >
                  {/* Glass effect for outline buttons */}
                  {item.variant !== 'gradient' && (
                    <div className={`absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                      isDark 
                        ? 'bg-gradient-to-r from-blue-500/5 to-purple-500/5'
                        : 'bg-gradient-to-r from-blue-50/50 to-purple-50/50'
                    }`}></div>
                  )}
                  
                  <Icon className="relative w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative">{item.name}</span>
                  {item.variant === 'gradient' && (
                    <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden relative p-3 rounded-2xl transition-all duration-300 backdrop-blur-xl border hover:scale-105 ${
              isDark 
                ? 'border-gray-600/50 text-gray-300 hover:text-white bg-gray-800/30 hover:bg-gray-700/50'
                : 'border-gray-200/50 text-gray-600 hover:text-gray-900 bg-white/30 hover:bg-white/60'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {isMenuOpen ? (
                <X className="w-5 h-5 transition-all duration-300" />
              ) : (
                <Menu className="w-5 h-5 transition-all duration-300" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`backdrop-blur-2xl border-t shadow-2xl ${
          isDark 
            ? 'bg-gray-900/90 border-gray-800/50'
            : 'bg-white/90 border-gray-100/50'
        }`}>
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/2 to-transparent"></div>
          
          <nav className="relative px-4 py-6 space-y-2">
            {headerItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`group relative flex items-center gap-4 w-full p-4 rounded-2xl transition-all duration-300 font-medium backdrop-blur-sm border border-transparent hover:scale-[1.02] hover:-translate-y-0.5 ${
                    isDark 
                      ? 'text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/10'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/40 hover:border-gray-200/30'
                  }`}
                  onClick={() => handleNavigation(item.href)}
                >
                  {/* Glass background */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-500/5 to-purple-500/5'
                      : 'bg-gradient-to-r from-blue-50/50 to-purple-50/50'
                  } backdrop-blur-sm`}></div>
                  
                  <Icon className="relative w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative">{item.name}</span>
                </button>
              );
            })}

            <div className={`pt-4 border-t space-y-3 ${
              isDark ? 'border-gray-700/50' : 'border-gray-100/50'
            }`}>
              {authItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    className={`group relative flex items-center justify-center gap-3 w-full p-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5 ${
                      item.variant === 'gradient'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : `backdrop-blur-xl border ${
                            isDark 
                              ? 'border-gray-600/50 text-gray-300 hover:text-white bg-gray-800/30 hover:bg-gray-700/50'
                              : 'border-gray-200/50 text-gray-700 hover:text-gray-900 bg-white/30 hover:bg-white/60'
                          }`
                    }`}
                    onClick={() => handleNavigation(item.href)}
                  >
                    {/* Glass effect for outline buttons */}
                    {item.variant !== 'gradient' && (
                      <div className={`absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                        isDark 
                          ? 'bg-gradient-to-r from-blue-500/5 to-purple-500/5'
                          : 'bg-gradient-to-r from-blue-50/40 to-purple-50/40'
                      }`}></div>
                    )}
                    
                    <Icon className="relative w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative">{item.name}</span>
                    {item.variant === 'gradient' && (
                      <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;