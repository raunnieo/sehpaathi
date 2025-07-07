import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/useTheme';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't show floating toggle on mobile - settings will be in Profile page
  if (isMobile) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative">
        {isDark ? (
          <Sun className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
        ) : (
          <Moon className="w-6 h-6 group-hover:-rotate-12 transition-transform duration-500" />
        )}
      </div>
      {/* Tooltip */}
      <div className={`absolute bottom-16 right-0 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
        isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-800 text-white'
      }`}>
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        <div className={`absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
          isDark ? 'border-t-gray-700' : 'border-t-gray-800'
        }`}></div>
      </div>
    </button>
  );
};

export default ThemeToggle;