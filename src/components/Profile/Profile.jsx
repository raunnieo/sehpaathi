import React, { useState } from "react";
import {
  CircleUser,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  X,
} from "lucide-react";

const Profile = ({ userName, handleLogOut }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState("notifications");
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New study material available", isRead: false },
    { id: 2, text: "Assignment deadline reminder", isRead: false },
  ]);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    updates: false,
  });
  const [userSettings, setUserSettings] = useState({
    name: userName,
    email: "student@example.com",
    theme: "light",
  });

  const toggleNotificationSetting = (key) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const switchPanel = (newPanel) => {
    setActivePanel(newPanel);
  };

  // Custom Toggle Switch Component
  const Toggle = ({ checked, onChange }) => (
    <button
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
      onClick={onChange}
    >
      <span
        className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="relative">
      {/* Trigger buttons */}
      <div className="flex flex-row">
        <div
          className="p-2 hover:bg-gray-100 rounded-full relative cursor-pointer"
          onMouseEnter={() => {
            setIsSidebarOpen(true);
            setActivePanel("notifications");
          }}
        >
          <Bell size={30} />
          {notifications.some((n) => !n.isRead) && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </div>

        <div
          onMouseEnter={() => {
            setIsSidebarOpen(true);
            setActivePanel("settings");
          }}
          className="flex items-center cursor-pointer"
        >
          <div className="p-1 rounded-full flex items-center justify-center">
            <CircleUser size={40} />
          </div>
          <span className="font-medium">{userName}</span>
        </div>
      </div>

      {/* Sliding Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={() =>
              switchPanel(
                activePanel === "notifications" ? "settings" : "notifications"
              )
            }
            className="flex items-center gap-2 text-sm font-medium hover:text-blue-600"
          >
            <ChevronLeft size={20} />
            {activePanel === "notifications" ? "Settings" : "Notifications"}
          </button>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Container */}
        <div className="relative h-[calc(100%-4rem)] overflow-hidden">
          {/* Notifications Panel */}
          <div
            className={`absolute inset-0 transition-transform duration-300 bg-white ${
              activePanel === "notifications"
                ? "translate-x-0"
                : "-translate-x-full"
            }`}
          >
            <div className="p-4 overflow-y-auto h-full">
              <h3 className="font-semibold mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <Toggle
                    checked={notificationSettings.email}
                    onChange={() => toggleNotificationSetting("email")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Push Notifications</span>
                  <Toggle
                    checked={notificationSettings.push}
                    onChange={() => toggleNotificationSetting("push")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Updates & News</span>
                  <Toggle
                    checked={notificationSettings.updates}
                    onChange={() => toggleNotificationSetting("updates")}
                  />
                </div>
              </div>

              <h3 className="font-semibold mt-8 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      notification.isRead ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <p className="text-sm">{notification.text}</p>
                    {!notification.isRead && (
                      <button
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div
            className={`absolute inset-0 transition-transform duration-300 bg-white ${
              activePanel === "settings" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 space-y-6 overflow-y-auto h-full">
              <div>
                <h3 className="font-semibold mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={userSettings.name}
                      onChange={(e) =>
                        setUserSettings((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userSettings.email}
                      onChange={(e) =>
                        setUserSettings((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full px-4 py-2 flex items-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <Settings size={16} className="mr-2" />
                  App Settings
                </button>
                <button className="w-full px-4 py-2 flex items-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <HelpCircle size={16} className="mr-2" />
                  Help & Support
                </button>
                <button
                  onClick={handleLogOut}
                  className="w-full px-4 py-2 flex items-center text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
