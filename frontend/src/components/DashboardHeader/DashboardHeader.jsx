import { useTheme } from "../../contexts/useTheme";
import PropTypes from 'prop-types';

const DashboardHeader = ({ userName, selectedRole }) => {
  const { isDark } = useTheme();

  const getGradientText = () => {
    switch (selectedRole) {
      case "sehpaathi":
        return (
          <>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sehpaathi
            </span>{" "}
            is with you!
          </>
        );
      case "materials":
        return (
          <>
            Browse{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Study Materials
            </span>
          </>
        );
      case "resources":
        return (
          <>
            Manage{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resources
            </span>
          </>
        );
      default:
        return (
          <>
            Welcome{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {userName}
            </span>{" "}!
          </>
        );
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div>
        <h1 className={`text-lg sm:text-xl font-bold ${isDark ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' : 'bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800'} bg-clip-text text-transparent`}>
          {getGradientText()}
        </h1>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
          {selectedRole === "dashboard" && "Your personalized learning space"}
          {selectedRole === "materials" && "Access course materials, notes, and resources"}
          {selectedRole === "resources" && "Manage your study materials and links"}
          {selectedRole === "sehpaathi" && "Your AI-powered study companion"}
        </p>
      </div>
    </div>);
};

DashboardHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  selectedRole: PropTypes.string.isRequired,
};

export default DashboardHeader;
