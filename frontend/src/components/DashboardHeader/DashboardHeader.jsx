import Profile from "../../components/Profile/Profile";
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
            Your Learning{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </>
        );
    }
  };
  return (
    <>
      <div className="flex flex-row justify-between mx-auto">
        <div className="mb-8">
          {selectedRole === "dashboard" && (
            <span className={`${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} px-4 py-1 rounded-full text-sm font-medium backdrop-blur-xl`}>
              Swagatam {userName}!
            </span>
          )}
          <h1 className={`text-4xl font-bold mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{getGradientText()}</h1>
        </div>

        <div className="">
          <Profile />
        </div>
      </div>
    </>
  );
};

DashboardHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  selectedRole: PropTypes.string.isRequired,
};

export default DashboardHeader;
