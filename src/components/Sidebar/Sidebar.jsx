import React, { useState } from "react";
import { Bot, BookOpen, BookMarked, Gauge, LogOut } from "lucide-react";

const Sidebar = ({ selectedRole, handleSelectRole, handleLogOut }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        ${isHovered ? "w-64" : "w-20"}
        bg-sidebar shadow-lg
        transition-all duration-300 ease-in-out
        overflow-hidden
        relative
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center p-4 border-b whitespace-nowrap">
        <img
          src="src/assets/logo.png"
          alt="Sehpaathi Logo"
          className="w-10 h-10 ml-2 object-contain flex-shrink-0 transition-transform duration-300"
        />
        <span
          className={`
          ml-2 font-bold text-xl
          transition-opacity duration-300 ease-in-out
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        >
          Sehpaathi
        </span>
      </div>

      <nav className="p-4">
        <div className="space-y-4">
          {[
            { id: "dashboard", icon: Gauge, label: "Dashboard" },
            { id: "sehpaathi", icon: Bot, label: "Sehpaathi Alive" },
            { id: "materials", icon: BookOpen, label: "Study Materials" },
            { id: "resources", icon: BookMarked, label: "Your Resources" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleSelectRole(id)}
              className={`
                flex items-center w-full p-3 rounded-lg whitespace-nowrap
                transition-all duration-300 ease-in-out
                ${
                  selectedRole === id
                    ? "bg-neutral-50 text-neutral-500"
                    : "hover:bg-gray-100"
                }
              `}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span
                className={`
                ml-3
                transition-opacity duration-300 ease-in-out
                ${isHovered ? "opacity-100" : "opacity-0"}
              `}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          className={`
            flex items-center w-full p-3 rounded-lg whitespace-nowrap
            hover:bg-red-50 text-red-600
            transition-all duration-300 ease-in-out
          `}
          onClick={handleLogOut}
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span
            className={`
            ml-3
            transition-opacity duration-300 ease-in-out
            ${isHovered ? "opacity-100" : "opacity-0"}
          `}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
