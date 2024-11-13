import React, { useState } from "react";

import {
  Menu,
  X,
  BookOpen,
  Bot,
  Download,
  ChevronDown,
  BookMarked,
  Search,
  LogOut,
  Gauge,
  Plus,
  Edit2,
  Trash2,
  Link,
  File,
  Youtube,
  Code,
  Layout,
  Image,
  User,
  Settings,
  HelpCircle,
  Bell,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../features/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { selectUserName } from "../../features/user/userSlice.js";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedRole, setSelectedRole] = useState("dashboard");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  // AI Assistant State

  const [messages, setMessages] = useState([]);
  const [aiInput, setAiInput] = useState("");

  // Resource Manager State

  const [resources, setResources] = useState([]);
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    type: "",
    title: "",
    url: "",
    file: null,
  });

  const resourceTypes = [
    { id: "bookmark", label: "Bookmark", icon: Link },

    { id: "note", label: "Note", icon: File },

    { id: "video", label: "YouTube Video", icon: Youtube },

    { id: "code", label: "Code Block", icon: Code },

    { id: "project", label: "Project", icon: Layout },

    { id: "media", label: "Media", icon: Image },
  ];

  const branches = [
    { id: "cse", name: "Computer Science Engineering" },

    { id: "it", name: "Information Technology" },

    { id: "ece", name: "Electronics & Communication" },

    { id: "ee", name: "Electrical Engineering" },

    { id: "me", name: "Mechanical Engineering" },
  ];

  const semesters = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,

    name: `Semester ${i + 1}`,
  }));

  const materialTypes = [
    "Class Notes",
    "Lecture PPTs",
    "Previous Year Questions",
    "Practical Reports",
    "Profiency Papers",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  // AI Assistant Functions

  const handleSendMessage = () => {
    if (!aiInput.trim()) return;
    setMessages([...messages, { text: aiInput, sender: "user" }]);
    setAiInput("");

    // Simulate AI response (replace with actual AI integration)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,

        {
          text: "I'm here to help you with your studies! What would you like to know?",

          sender: "ai",
        },
      ]);
    }, 300);
  };

  // Resource Manager Functions

  const handleAddResource = () => {
    if (!newResource.title || !newResource.type) return;

    setResources([
      ...resources,

      {
        id: Date.now(),

        ...newResource,
      },
    ]);

    setNewResource({ type: "", title: "", url: "", file: null });

    setIsAddResourceModalOpen(false);
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  const getIconForType = (type) => {
    const resourceType = resourceTypes.find((rt) => rt.id === type);
    const IconComponent = resourceType ? resourceType.icon : Link;
    return <IconComponent size={20} className="text-blue-500" />;
  };

  const handleLogOut = () => {
    dispatch(signOut());

    navigate("/");
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="flex min-h-screen bg-boxbg">
      {/* Sidebar */}

      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-sidebar shadow-lg transition-all duration-300 relative`}
      >
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}

        <div className="flex items-center p-4 border-b">
          <img
            src="src/assets/logo.png"
            alt="Sehpaathi Logo"
            className="w-8 h-8 object-contain"
          />

          {isSidebarOpen && (
            <span className="ml-2 font-bold text-xl">Sehpaathi</span>
          )}
        </div>

        {/* Navigation */}

        <nav className="p-4">
          <div className="space-y-4">
            <button
              onClick={() => handleSelectRole("dashboard")}
              className={`flex items-center w-full p-3 rounded-lg ${
                selectedRole === "dashboard"
                  ? "bg-neutral-50 text-neutral-500"
                  : "hover:bg-gray-100 transition-colors"
              }`}
            >
              <Gauge size={20} />

              {isSidebarOpen && <span className="ml-3">Dashboard</span>}
            </button>

            <button
              onClick={() => handleSelectRole("sehpaathi")}
              className={`flex items-center w-full p-3 rounded-lg ${
                selectedRole === "sehpaathi"
                  ? "bg-neutral-50 text-neutral-500"
                  : "hover:bg-gray-100 transition-colors"
              }`}
            >
              <Bot size={20} />

              {isSidebarOpen && <span className="ml-3">Sehpaathi Alive</span>}
            </button>

            <button
              onClick={() => handleSelectRole("materials")}
              className={`flex items-center w-full p-3 rounded-lg ${
                selectedRole === "materials"
                  ? "bg-neutral-50 text-neutral-500"
                  : "hover:bg-gray-100 transition-colors"
              }`}
            >
              <BookOpen size={20} />

              {isSidebarOpen && <span className="ml-3">Study Materials</span>}
            </button>

            <button
              onClick={() => handleSelectRole("resources")}
              className={`flex items-center w-full p-3 rounded-lg ${
                selectedRole === "resources"
                  ? "bg-neutral-50 text-neutral-500"
                  : "hover:bg-gray-100 transition-colors"
              }`}
            >
              <BookMarked size={20} />

              {isSidebarOpen && <span className="ml-3">Your Resources</span>}
            </button>
          </div>
        </nav>

        {/* Logout button at bottom */}

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

      {/* Main Content */}

      <div className="flex-1 p-8">
        {/* Welcome Header - Existing code remains the same */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Swagatam {userName}!
          </h1>

          <p className="text-gray-600 mt-2">
            Your personalized learning companion at MITS, Gwalior
          </p>
        </div>

        {/* Search Bar - Existing code remains the same */}

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for study materials, ask questions..."
            className="w-full p-4 pl-12 rounded-lg border focus:outline-none bg-searchbg focus:ring-2 focus:ring-neutral-400"
          />

          <Search className="absolute left-4 top-4 text-gray-400" size={20} />
        </div>

        {/* Conditional Rendering based on selectedRole */}
        {selectedRole === "dashboard" && (
          <>
            {/* Quick Access Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* AI Assistant Card */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <Bot size={32} />
                <h3 className="text-xl font-bold mt-4">Sehpaathi Alive</h3>
                <p className="mt-2 opacity-90">
                  Get instant help with homework, assignments, and exam
                  preparation
                </p>
                <button
                  onClick={() => handleSelectRole("sehpaathi")}
                  className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                >
                  Start Conversation
                </button>
              </div>

              {/* Study Materials Card */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <BookOpen size={32} />
                <h3 className="text-xl font-bold mt-4">Study Materials</h3>
                <p className="mt-2 opacity-90">
                  Access course materials, notes, and previous year papers
                </p>
                <button
                  onClick={() => handleSelectRole("materials")}
                  className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors"
                >
                  Browse Materials
                </button>
              </div>

              <div className="bg-gradient-to-r from-magenta-500 to-magenta-600 rounded-xl p-6 text-white">
                <BookMarked size={32} />
                <h3 className="text-xl font-bold mt-4">Your Resources</h3>
                <p className="mt-2 opacity-90">
                  Organise your bookmarks, notes, tools, blocks, projects, media
                </p>
                <button
                  onClick={() => handleSelectRole("resources")}
                  className="mt-4 bg-white text-magenta-600 px-4 py-2 rounded-lg font-medium hover:bg-magenta-100 transition-colors"
                >
                  Manage Resources
                </button>
              </div>
            </div>
          </>
        )}

        {/* AI Assistant Section */}
        {selectedRole === "sehpaathi" && (
          <>
            {/* AI Assistant Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-xl font-bold mb-4">Sehpaathi Alive!</h2>
              <div className="h-96 border rounded-lg p-4 mb-4 overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask anything about your studies..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        )}

        {/* Resource Manager Section */}
        {selectedRole === "resources" && (
          <>
            {/* Resource Manager Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Resources</h2>
                <button
                  onClick={() => setIsAddResourceModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={16} /> Add Resource
                </button>
              </div>

              {/* Resource Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getIconForType(resource.type)}
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-gray-500 capitalize">
                            {resource.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => {
                            /* Implement edit functionality */
                          }}
                        >
                          <Edit2 size={16} className="text-gray-500" />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => handleDeleteResource(resource.id)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Resource Modal */}
              {isAddResourceModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-96">
                    <h3 className="text-xl font-bold mb-4">Add New Resource</h3>
                    <div className="space-y-4">
                      <select
                        className="w-full p-2 border rounded-lg"
                        value={newResource.type}
                        onChange={(e) =>
                          setNewResource({
                            ...newResource,
                            type: e.target.value,
                          })
                        }
                      >
                        <option value="">Select resource type</option>
                        {resourceTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 border rounded-lg"
                        value={newResource.title}
                        onChange={(e) =>
                          setNewResource({
                            ...newResource,
                            title: e.target.value,
                          })
                        }
                      />

                      {(newResource.type === "bookmark" ||
                        newResource.type === "video") && (
                        <input
                          type="url"
                          placeholder="URL"
                          className="w-full p-2 border rounded-lg"
                          value={newResource.url}
                          onChange={(e) =>
                            setNewResource({
                              ...newResource,
                              url: e.target.value,
                            })
                          }
                        />
                      )}

                      {(newResource.type === "media" ||
                        newResource.type === "note") && (
                        <input
                          type="file"
                          className="w-full p-2 border rounded-lg"
                          onChange={(e) =>
                            setNewResource({
                              ...newResource,
                              file: e.target.files[0],
                            })
                          }
                        />
                      )}

                      <div className="flex justify-end gap-2 mt-6">
                        <button
                          className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => setIsAddResourceModalOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          onClick={handleAddResource}
                        >
                          Add Resource
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Material Browser */}
        {selectedRole === "materials" && (
          <>
            {/* Material Browser */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Browse Study Materials</h2>

              {/* Filters */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <select
                  className="p-2 border rounded-lg"
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>

                <select
                  className="p-2 border rounded-lg"
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="">Select Semester</option>
                  {semesters.map((sem) => (
                    <option key={sem.id} value={sem.id}>
                      {sem.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material Types Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                {materialTypes.map((material, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Download size={20} className="text-blue-500 mb-2" />
                    <h3 className="font-medium">{material}</h3>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
