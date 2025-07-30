import { useState, useEffect, useRef } from "react";
import { Send, Copy, Check, Plus, MessageSquare, Clock, ChevronRight, Trash2, Menu, X } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "../../contexts/useTheme";
import { useSelector } from "react-redux";
import { selectUserImage } from "../../features/user/userSlice";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import DateHeader from "../../components/DateHeader/DateHeader";
import { useOutletContext } from "react-router-dom";

const AIChat = () => {
  const { isDark } = useTheme();
  const { user, userProfile } = useOutletContext();
  const userImage = useSelector(selectUserImage);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Sehpaathi, your AI study assistant. How can I help you with your learning today? 🚀\n\nI can help you with:\n- Explaining complex concepts\n- Solving math problems\n- Writing and reviewing essays\n- Study planning and tips\n- Research assistance\n- And much more!",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMap, setCopiedMap] = useState({});
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    { 
      id: 1, 
      title: "Welcome Chat", 
      lastMessage: "Hello! I'm Sehpaathi, your AI study assistant...", 
      timestamp: new Date(), 
      isActive: true 
    },
    { 
      id: 2, 
      title: "Calculus Help", 
      lastMessage: "Can you help me solve derivatives?", 
      timestamp: new Date(Date.now() - 86400000), 
      isActive: false 
    },
    { 
      id: 3, 
      title: "Physics Concepts", 
      lastMessage: "Explain quantum mechanics principles", 
      timestamp: new Date(Date.now() - 172800000), 
      isActive: false 
    },
    { 
      id: 4, 
      title: "Essay Writing", 
      lastMessage: "Help with structuring my essay", 
      timestamp: new Date(Date.now() - 259200000), 
      isActive: false 
    },
  ]);
  const [activeChat, setActiveChat] = useState(1);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const API_BASE_URL = 
    import.meta.env.VITE_ENVIRONMENT === "local" 
      ? "http://localhost:3000" 
      : `${import.meta.env.VITE_BACKEND_URL}`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await response.json();

      if (data.data?.message) {
        const aiMessage = {
          id: Date.now() + 1,
          text: data.data.message.text,
          sender: "ai",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMap(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedMap(prev => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const newChat = () => {
    const newChatId = Date.now();
    const newChatItem = {
      id: newChatId,
      title: "New Chat",
      lastMessage: "",
      timestamp: new Date(),
      isActive: true
    };

    setChatHistory(prev => [newChatItem, ...prev.map(chat => ({ ...chat, isActive: false }))]);
    setActiveChat(newChatId);
    setMessages([{
      id: 1,
      text: "Hello! I'm Sehpaathi, your AI study assistant. How can I help you with your learning today? 🚀",
      sender: "ai",
      timestamp: new Date()
    }]);
    setShowMobileSidebar(false);
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChat === chatId && chatHistory.length > 1) {
      const remainingChats = chatHistory.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setActiveChat(remainingChats[0].id);
      }
    }
  };

  const switchChat = (chatId) => {
    setChatHistory(prev => prev.map(chat => ({ ...chat, isActive: chat.id === chatId })));
    setActiveChat(chatId);
    setShowMobileSidebar(false);
  };

  const markdownComponents = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          className="rounded-xl my-4 shadow-lg"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={`${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded-md font-mono text-sm`} {...props}>
          {children}
        </code>
      );
    },
    blockquote({ children }) {
      return (
        <blockquote className={`border-l-4 ${isDark ? 'border-blue-400' : 'border-blue-500'} ${isDark ? 'bg-blue-900/20' : 'bg-blue-50/50'} pl-6 py-4 my-4 rounded-r-xl`}>
          <div className={`${isDark ? 'text-blue-300' : 'text-blue-900'} font-medium`}>{children}</div>
        </blockquote>
      );
    },
    h1({ children }) {
      return <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mt-6 mb-4 pb-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>{children}</h1>;
    },
    h2({ children }) {
      return <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mt-5 mb-3`}>{children}</h2>;
    },
    h3({ children }) {
      return <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mt-4 mb-2`}>{children}</h3>;
    },
    ul({ children }) {
      return <ul className={`list-disc list-inside space-y-1 my-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{children}</ul>;
    },
    ol({ children }) {
      return <ol className={`list-decimal list-inside space-y-1 my-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{children}</ol>;
    },
    li({ children }) {
      return <li className="leading-relaxed">{children}</li>;
    },
    p({ children }) {
      return <p className={`leading-relaxed my-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{children}</p>;
    },
    a({ href, children }) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} underline decoration-blue-300 hover:decoration-blue-500 transition-colors font-medium`}
        >
          {children}
        </a>
      );
    }
  };

  return (
    <div className={`flex h-full ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50/30'}`}>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">        
        {/* Enhanced Seamless Header - Responsive */}
        <div className={`flex-shrink-0 relative px-4 sm:px-6 py-5 sm:py-6 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100/50'} z-10`}>
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10' : 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5'}`}></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileSidebar(true)}
                className={`lg:hidden p-2 ${isDark 
                  ? 'text-gray-400 hover:text-gray-300 bg-gray-700/60 hover:bg-gray-600/50 border-gray-600/50 hover:border-gray-500' 
                  : 'text-gray-500 hover:text-gray-700 bg-white/60 hover:bg-gray-50 border-gray-200/50 hover:border-gray-300'
                } border rounded-xl transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-xl`}
              >
                <Menu className="w-5 h-5" />
              </button>
              <DashboardHeader userName={user?.displayName || "Student"} selectedRole="sehpaathi" />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={newChat}
                className={`group flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold ${isDark 
                  ? 'text-gray-300 hover:text-blue-300 bg-gray-700/60 hover:bg-blue-900/50 border-gray-600/50 hover:border-blue-500/50' 
                  : 'text-gray-700 hover:text-blue-700 bg-white/60 hover:bg-blue-50 border-gray-200/50 hover:border-blue-200'
                } border rounded-xl transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-xl`}
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                <span className="hidden sm:inline">New Chat</span>
              </button>
              {/* Mobile: Hide sidebar toggle, Desktop: Show sidebar toggle */}
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className={`hidden lg:flex p-2.5 ${isDark 
                  ? 'text-gray-400 hover:text-gray-300 bg-gray-700/60 hover:bg-gray-600/50 border-gray-600/50 hover:border-gray-500' 
                  : 'text-gray-500 hover:text-gray-700 bg-white/60 hover:bg-gray-50 border-gray-200/50 hover:border-gray-300'
                } border rounded-xl transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-xl`}
              >
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${showSidebar ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Date Header - Sticky */}
        <DateHeader />

        {/* Enhanced Messages Area - Mobile Optimized */}
        <div className={`flex-1 overflow-y-auto p-2 sm:p-6 ${isDark ? 'bg-gradient-to-b from-transparent via-gray-800/20 to-gray-900/10' : 'bg-gradient-to-b from-transparent via-blue-50/20 to-purple-50/10'} min-h-0 pb-32 lg:pb-4`}>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-8">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 sm:space-x-4 group ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-2 ${
                  message.sender === 'user' 
                    ? `${isDark ? 'border-blue-400/30' : 'border-blue-300/50'} bg-gradient-to-r from-blue-500 to-purple-600` 
                    : `${isDark ? 'border-gray-600/30' : 'border-gray-300/50'} bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600`
                }`}>
                  {message.sender === 'user' ? (
                    userImage && userImage !== "" ? (
                      <img
                        src={userImage}
                        alt="User Avatar"
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = "/assets/logo.png";
                        }}
                      />
                    ) : (
                      <img
                        src={user?.photoURL || userProfile?.profilePhoto || "/assets/logo.png"}
                        alt="User Avatar"
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = "/assets/logo.png";
                        }}
                      />
                    )
                  ) : (
                    <img
                      src="/assets/notwhite.png"
                      alt="Sehpaathi AI"
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </div>
                
                {/* Message Content */}
                <div className={`flex-1 min-w-0 ${message.sender === 'user' ? 'flex flex-col items-end' : ''}`}>
                  <div className={`max-w-[85%] sm:max-w-2xl ${
                    message.sender === 'user' ? 'ml-auto' : 'mr-auto'
                  }`}>
                    <div className={`inline-block p-3 sm:p-4 transition-all duration-200 group-hover:shadow-lg ${
                      message.sender === 'user'
                        ? `${isDark ? 'bg-blue-600/90 border-blue-500/30' : 'bg-blue-600 border-blue-500/20'} text-white rounded-2xl rounded-tr-lg border shadow-lg`
                        : `${isDark ? 'bg-gray-800/80 text-gray-100 border-gray-700/50' : 'bg-white text-gray-900 border-gray-200/80'} border backdrop-blur-sm rounded-2xl rounded-tl-lg shadow-sm`
                    }`}>
                      {message.sender === 'user' ? (
                        <p className="whitespace-pre-wrap font-medium text-sm sm:text-base leading-relaxed">{message.text}</p>
                      ) : (
                        <div className={`prose prose-sm max-w-none ${isDark 
                          ? 'prose-headings:text-white prose-p:text-gray-200 prose-strong:text-white prose-code:bg-gray-700 prose-code:text-gray-200' 
                          : 'prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:text-gray-800'
                        } prose-code:px-2 prose-code:py-1 prose-code:rounded-md`}>
                          <ReactMarkdown components={markdownComponents}>
                            {message.text}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    
                    {/* Message Actions - Only for AI messages */}
                    {message.sender === 'ai' && (
                      <div className="flex items-center space-x-2 sm:space-x-3 mt-2 sm:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => handleCopy(message.text, `msg-${message.id}`)}
                          className={`flex items-center space-x-1 ${isDark 
                            ? 'text-gray-400 hover:text-gray-300 bg-gray-700/80 hover:bg-gray-600/80 border-gray-600/50 hover:border-gray-500' 
                            : 'text-gray-400 hover:text-gray-600 bg-white/80 hover:bg-white border-gray-200/50 hover:border-gray-300'
                          } border px-2 py-1 rounded-lg transition-all duration-200 text-xs font-medium backdrop-blur-xl`}
                        >
                          {copiedMap[`msg-${message.id}`] ? <Check size={10} /> : <Copy size={10} />}
                          <span className="hidden sm:inline">{copiedMap[`msg-${message.id}`] ? 'Copied!' : 'Copy'}</span>
                        </button>
                        <span className={`text-xs ${isDark ? 'text-gray-400 bg-gray-700/60 border-gray-600/50' : 'text-gray-400 bg-white/60 border-gray-200/50'} px-2 py-1 rounded-lg border backdrop-blur-xl`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3 sm:space-x-4 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-600/30">
                  <img
                    src="/assets/notwhite.png"
                    alt="Sehpaathi AI"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className={`${isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white border-gray-200/80'} border p-3 sm:p-4 rounded-2xl rounded-tl-lg shadow-sm backdrop-blur-sm`}>
                  <div className="flex space-x-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Mobile-Optimized Input Area */}
        <div className={`flex-shrink-0 border-t ${isDark ? 'border-gray-700/50 bg-gray-800/95' : 'border-gray-100/50 bg-white/95'} backdrop-blur-xl p-2 sm:p-4 pb-20 lg:pb-4`}>
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-2xl sm:rounded-3xl blur-xl group-focus-within:blur-2xl transition-all duration-300"></div>
              <div className={`relative ${isDark ? 'bg-gray-700/95 border-gray-600/60 group-focus-within:border-blue-400' : 'bg-white/95 border-gray-200/60 group-focus-within:border-blue-300'} backdrop-blur-sm rounded-2xl sm:rounded-3xl border group-focus-within:ring-4 group-focus-within:ring-blue-100/50 transition-all duration-300 shadow-lg group-focus-within:shadow-xl`}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`w-full resize-none bg-transparent px-4 sm:px-6 py-3 sm:py-4 pr-16 sm:pr-20 focus:outline-none max-h-32 sm:max-h-48 min-h-[48px] sm:min-h-[60px] ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} font-medium leading-relaxed text-sm sm:text-base`}
                  rows={1}
                  disabled={isTyping}
                />
                <div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 flex items-center space-x-1 sm:space-x-2">
                  {input.trim() && (
                    <div className={`text-xs ${isDark ? 'text-gray-400 bg-gray-600/80' : 'text-gray-400 bg-gray-100/80'} px-2 py-1 rounded-lg hidden sm:block backdrop-blur-xl`}>
                      {input.length}/2000
                    </div>
                  )}
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                    className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 ${
                      input.trim() && !isTyping
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : `${isDark ? 'bg-gray-600/50 text-gray-500' : 'bg-gray-200/50 text-gray-400'} cursor-not-allowed`
                    }`}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                {isTyping && (
                  <div className="absolute bottom-full left-4 mb-2 flex items-center space-x-2 text-xs text-gray-400 bg-gray-700/60 border-gray-600/50 px-2 py-1 rounded-lg border backdrop-blur-xl">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="hidden sm:inline">AI is ready</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Sidebar - Desktop Only */}
      {showSidebar && (
        <div className={`hidden lg:flex lg:flex-col w-80 flex-shrink-0 border-l ${isDark ? 'border-gray-700/50 bg-gradient-to-b from-gray-800/80 via-gray-800/90 to-gray-900/30' : 'border-gray-100/50 bg-gradient-to-b from-gray-50/80 via-white/90 to-blue-50/30'} backdrop-blur-xl h-full`}>
          {/* Sidebar Header */}
          <div className={`flex-shrink-0 p-6 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100/50'}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'} flex items-center justify-center backdrop-blur-xl border ${isDark ? 'border-blue-500/20' : 'border-blue-500/10'}`}>
                <MessageSquare className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Chat History</h2>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{chatHistory.length} conversations</p>
              </div>
            </div>
            <button
              onClick={newChat}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 ${isDark 
                ? 'text-gray-300 hover:text-blue-300 bg-gray-700/60 hover:bg-blue-900/50 border-gray-600/50 hover:border-blue-500/50' 
                : 'text-gray-700 hover:text-blue-700 bg-white/60 hover:bg-blue-50 border-gray-200/50 hover:border-blue-200'
              } border rounded-xl transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-xl font-medium`}
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>

          {/* Chat History List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => switchChat(chat.id)}
                className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  chat.isActive
                    ? `${isDark ? 'bg-blue-900/50 border-blue-500/50 shadow-md' : 'bg-blue-50 border-blue-200 shadow-md'}`
                    : `${isDark ? 'bg-gray-700/30 border-gray-600/50 hover:bg-gray-600/30 hover:border-gray-500/50' : 'bg-white/30 border-gray-200/50 hover:bg-white/60 hover:border-gray-300'} hover:shadow-md`
                } backdrop-blur-xl`}
              >
                <div className="flex items-start justify-between space-x-3">
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm truncate ${
                      chat.isActive 
                        ? (isDark ? 'text-blue-300' : 'text-blue-700')
                        : (isDark ? 'text-gray-200' : 'text-gray-900')
                    }`}>
                      {chat.title}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 ${
                      chat.isActive 
                        ? (isDark ? 'text-blue-200/70' : 'text-blue-600/70')
                        : (isDark ? 'text-gray-400' : 'text-gray-500')
                    }`}>
                      {chat.lastMessage || "No messages yet"}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className={`w-3 h-3 ${
                        chat.isActive 
                          ? (isDark ? 'text-blue-300/60' : 'text-blue-500/60')
                          : (isDark ? 'text-gray-500' : 'text-gray-400')
                      }`} />
                      <span className={`text-xs ${
                        chat.isActive 
                          ? (isDark ? 'text-blue-300/60' : 'text-blue-500/60')
                          : (isDark ? 'text-gray-500' : 'text-gray-400')
                      }`}>
                        {chat.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteChat(chat.id, e)}
                    className={`opacity-0 group-hover:opacity-100 p-1.5 ${isDark 
                      ? 'text-gray-400 hover:text-red-400 bg-gray-600/60 hover:bg-red-900/50 border-gray-500/50 hover:border-red-500/50' 
                      : 'text-gray-400 hover:text-red-600 bg-white/60 hover:bg-red-50 border-gray-200/50 hover:border-red-200'
                    } border rounded-lg transition-all duration-200 backdrop-blur-xl`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileSidebar(false)} />
          <div className={`relative w-80 ${isDark ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'} border-r backdrop-blur-xl h-full flex flex-col`}>
            {/* Mobile Sidebar Header */}
            <div className={`flex-shrink-0 p-4 border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100/50'} flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-xl ${isDark ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'} flex items-center justify-center backdrop-blur-xl border ${isDark ? 'border-blue-500/20' : 'border-blue-500/10'}`}>
                  <MessageSquare className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Chats</h2>
              </div>
              <button
                onClick={() => setShowMobileSidebar(false)}
                className={`p-2 ${isDark ? 'text-gray-400 hover:text-gray-300 bg-gray-700/60 hover:bg-gray-600/50' : 'text-gray-500 hover:text-gray-700 bg-white/60 hover:bg-gray-50'} rounded-xl transition-all duration-200`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => switchChat(chat.id)}
                  className={`group relative p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    chat.isActive
                      ? `${isDark ? 'bg-blue-900/50 border-blue-500/50' : 'bg-blue-50 border-blue-200'}`
                      : `${isDark ? 'bg-gray-700/30 border-gray-600/50 hover:bg-gray-600/30' : 'bg-white/30 border-gray-200/50 hover:bg-white/60'}`
                  } backdrop-blur-xl`}
                >
                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm truncate ${
                        chat.isActive 
                          ? (isDark ? 'text-blue-300' : 'text-blue-700')
                          : (isDark ? 'text-gray-200' : 'text-gray-900')
                      }`}>
                        {chat.title}
                      </h3>
                      <p className={`text-xs mt-1 line-clamp-1 ${
                        chat.isActive 
                          ? (isDark ? 'text-blue-200/70' : 'text-blue-600/70')
                          : (isDark ? 'text-gray-400' : 'text-gray-500')
                      }`}>
                        {chat.lastMessage || "No messages yet"}
                      </p>
                    </div>
                    <button
                      onClick={(e) => deleteChat(chat.id, e)}
                      className={`opacity-0 group-hover:opacity-100 p-1 ${isDark 
                        ? 'text-gray-400 hover:text-red-400' 
                        : 'text-gray-400 hover:text-red-600'
                      } transition-all duration-200`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
