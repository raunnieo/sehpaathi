import React from 'react';
import { Menu, X, Bot, BookOpen, BookMarked, Gauge, LogOut } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setSidebarOpen, selectedRole, handleSelectRole, handleLogOut }) => {
  return (
    <div className={`${isSidebarOpen ? "w-64" : "w-20"} bg-sidebar shadow-lg transition-all duration-300 relative`}>
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="flex items-center p-4 border-b">
        <img src="src/assets/logo.png" alt="Sehpaathi Logo" className="w-8 h-8 object-contain" />
        {isSidebarOpen && <span className="ml-2 font-bold text-xl">Sehpaathi</span>}
      </div>

      <nav className="p-4">
        <div className="space-y-4">
          {[
            { id: 'dashboard', icon: Gauge, label: 'Dashboard' },
            { id: 'sehpaathi', icon: Bot, label: 'Sehpaathi Alive' },
            { id: 'materials', icon: BookOpen, label: 'Study Materials' },
            { id: 'resources', icon: BookMarked, label: 'Your Resources' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleSelectRole(id)}
              className={`flex items-center w-full p-3 rounded-lg ${
                selectedRole === id
                  ? "bg-neutral-50 text-neutral-500"
                  : "hover:bg-gray-100 transition-colors"
              }`}
            >
              <Icon size={20} />
              {isSidebarOpen && <span className="ml-3">{label}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          className="flex items-center w-full p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
          onClick={handleLogOut}
        >
          <LogOut size={20} />
          {isSidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar