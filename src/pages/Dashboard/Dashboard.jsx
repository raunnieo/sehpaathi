import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut, selectUserName } from "../../features/user/userSlice";
import { FileText, Link, Video, Image, File } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import QuickAccess from "../../components/QuickAccess,jsx/QuickAccess";
import AIAssistant from "../../components/AI/Assistant";
import ResourceManager from "../../components/ResourceManager/ResourceManager";
import MaterialBrowser from "../../components/Materials/MaterialsBrowser";
import Profile from "../../components/Profile/Profile";
import { branches, semesters, materialTypes } from "../../constants";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);

  // Sidebar state
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedRole, setSelectedRole] = useState("dashboard");

  // AI Assistant state
  const [messages, setMessages] = useState([]);
  const [aiInput, setAiInput] = useState("");

  // Resources state
  const [resources, setResources] = useState([]);
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    type: "",
    title: "",
    url: "",
    file: null,
  });

  // Materials state
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  // Handlers
  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const handleLogOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };

  // const handleSendMessage = () => {
  //   if (!aiInput.trim()) return;

  //   const newMessage = {
  //     text: aiInput,
  //     sender: 'user'
  //   };

  //   setMessages([...messages, newMessage]);
  //   setAiInput('');

  //   // Simulate AI response
  //   setTimeout(() => {
  //     const aiResponse = {
  //       text: 'I\'m here to help you with your studies. What would you like to know?',
  //       sender: 'ai'
  //     };
  //     setMessages(prev => [...prev, aiResponse]);
  //   }, 1000);
  // };

  const handleSendMessage = async () => {
    if (!aiInput.trim()) return;

    // Add user message to chat
    const newMessage = {
      text: aiInput,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    setAiInput("");

    try {
      console.log(aiInput);
      const response = await fetch("http://localhost:3000/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: aiInput }),
      });

      const data = await response.json();

      console.log(data);
      if (data.data.message) {
        const aiResponse = {
          text: data.data.message.text,
          sender: "ai",
        };
        console.log(aiResponse);
        setMessages((msgs) => [...msgs, aiResponse]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally add error handling UI
    }
  };
  const handleAddResource = () => {
    if (!newResource.title || !newResource.type) return;

    const resource = {
      id: Date.now(),
      ...newResource,
    };

    setResources([...resources, resource]);
    setNewResource({ type: "", title: "", url: "", file: null });
    setIsAddResourceModalOpen(false);
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  const getIconForType = (type) => {
    switch (type) {
      case "note":
        return <FileText size={20} className="text-blue-500" />;
      case "bookmark":
        return <Link size={20} className="text-purple-500" />;
      case "video":
        return <Video size={20} className="text-red-500" />;
      case "media":
        return <Image size={20} className="text-green-500" />;
      default:
        return <File size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedRole={selectedRole}
        handleSelectRole={handleSelectRole}
        handleLogOut={handleLogOut}
      />

      <main className="flex-1 p-8">
        <DashboardHeader userName={userName} />

        {selectedRole === "dashboard" && (
          <QuickAccess handleSelectRole={handleSelectRole} />
        )}

        {selectedRole === "sehpaathi" && (
          <AIAssistant
            messages={messages}
            aiInput={aiInput}
            setAiInput={setAiInput}
            handleSendMessage={handleSendMessage}
          />
        )}

        {selectedRole === "resources" && (
          <ResourceManager
            resources={resources}
            isAddResourceModalOpen={isAddResourceModalOpen}
            setIsAddResourceModalOpen={setIsAddResourceModalOpen}
            newResource={newResource}
            setNewResource={setNewResource}
            handleAddResource={handleAddResource}
            handleDeleteResource={handleDeleteResource}
            getIconForType={getIconForType}
          />
        )}

        {selectedRole === "materials" && (
          <MaterialBrowser
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
            branches={branches}
            semesters={semesters}
            materialTypes={materialTypes}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
