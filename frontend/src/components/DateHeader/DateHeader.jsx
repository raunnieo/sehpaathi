import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/useTheme";
import { Calendar, Clock } from "lucide-react";

const DateHeader = () => {
  const { isDark } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  const getCurrentDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return currentTime.toLocaleDateString('en-US', options);
  };

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };
  return (
    <div className={`sticky top-0 z-20 px-3 sm:px-6 lg:px-8 py-2.5 border-b backdrop-blur-xl transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/95 border-gray-700/50 text-gray-300' 
        : 'bg-white/95 border-gray-200/50 text-gray-600'    }`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs sm:text-sm font-medium">{getCurrentDate()}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs sm:text-sm font-medium tabular-nums">{getCurrentTime()}</span>
        </div>
      </div>
    </div>
  );
};

export default DateHeader;
