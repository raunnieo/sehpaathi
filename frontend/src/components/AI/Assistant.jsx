import { useEffect, useRef } from "react";
import { Bot, Send, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../contexts/useTheme";
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIAssistant = ({ messages, aiInput, setAiInput, handleSendMessage, isTyping }) => {
  const { isDark } = useTheme();
  const messagesEndRef = useRef(null);
  const [copiedMap, setCopiedMap] = useState({});
    // Add CSS for custom scrollbar
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: ${isDark ? '#374151' : '#f1f1f1'};
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: ${isDark ? '#6b7280' : '#c1c1c1'};
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: ${isDark ? '#9ca3af' : '#a8a8a8'};
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [isDark]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCopy = async (text, id) => {
    try {
      // Write to clipboard
      await navigator.clipboard.writeText(text);
  
      // Mark the copied state for the specific block
      setCopiedMap((prev) => ({ ...prev, [id]: true }));
  
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedMap((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };  // Wrapper component for copyable blocks
  const CopyableBlock = ({ children, content, className = "" }) => {
    // Generate a unique ID for the block
    const id = useRef(Math.random().toString(36).substr(2, 9));
  
    return (
      <div className={`relative group ${className}`}>
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleCopy(content, id.current)}
            className={`p-1.5 rounded-full transition-colors backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-700/80 hover:bg-gray-600/80 border border-gray-600/50'
                : 'bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200/50'
            }`}
            title="Copy content"
          >
            {copiedMap[id.current] ? (
              <Check size={14} className={isDark ? "text-green-400" : "text-green-600"} />
            ) : (
              <Copy size={14} className={isDark ? "text-gray-300" : "text-gray-600"} />
            )}
          </button>
        </div>
        {children}
      </div>
    );
  };

  CopyableBlock.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.string.isRequired,
    className: PropTypes.string,
  };const components = {
    p: ({ children }) => (
      <p className={`mb-4 whitespace-pre-wrap break-words leading-relaxed ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}>
        {children}
      </p>
    ),
    
    ol: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4 space-y-3">{children}</ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc ml-6 mb-4 space-y-3">{children}</ul>
    ),
    li: ({ children }) => (
      <li className={isDark ? 'text-gray-200' : 'text-gray-800'}>{children}</li>
    ),
    
    h1: ({ children }) => (
      <h1 className={`text-2xl font-bold mb-4 mt-6 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className={`text-xl font-bold mb-3 mt-5 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className={`text-lg font-bold mb-2 mt-4 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>{children}</h3>
    ),
    
    strong: ({ children }) => (
      <strong className={`font-bold ${
        isDark ? 'text-blue-400' : 'text-blue-700'
      }`}>{children}</strong>
    ),
    em: ({ children }) => (
      <em className={`italic ${
        isDark ? 'text-purple-400' : 'text-purple-600'
      }`}>{children}</em>
    ),
    
    code: ({ inline, className, children }) => {
      const match = /language-(\w+)/.exec(className || '');
      const content = String(children).replace(/\n$/, '');
      
      return !inline ? (
        <CopyableBlock content={content} className="relative">
          <SyntaxHighlighter
            style={isDark ? atomDark : oneLight}
            language={match ? match[1] : 'text'}
            PreTag="div"
            className="rounded-lg mb-4"
          >
            {content}
          </SyntaxHighlighter>
        </CopyableBlock>
      ) : (
        <code className={`px-1.5 py-0.5 rounded font-mono text-sm ${
          isDark 
            ? 'bg-gray-700 text-pink-400' 
            : 'bg-gray-100 text-pink-500'
        }`}>
          {children}
        </code>
      );
    },
    
    pre: ({ children }) => (
        <pre>{children}</pre>
    ),
    
    blockquote: ({ children }) => (
      <CopyableBlock 
        content={children}
        className={`border-l-4 border-blue-500 pl-4 italic my-4 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        <blockquote>{children}</blockquote>
      </CopyableBlock>
    ),
  };  const MessageBubble = ({ message, index }) => {
    const isUser = message.sender === "user";

    return (
      <div
        className={`flex items-start space-x-2 mb-4 ${
          isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
        }`}
      >
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
            <Bot size={18} className="text-white" />
          </div>
        )}
        <div
          className={`relative px-4 py-3 rounded-2xl backdrop-blur-sm ${
            isUser
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none max-w-[80%] shadow-lg"
              : `${isDark 
                  ? "bg-gray-800/70 border border-gray-700/50 text-gray-200" 
                  : "bg-white/70 border border-gray-200/50 text-gray-800"
                } shadow-lg rounded-bl-none max-w-[80%]`
          }`}
        >
          {/* Glass effect overlay for AI messages */}
          {!isUser && (
            <div className={`absolute inset-0 rounded-2xl rounded-bl-none ${
              isDark 
                ? 'bg-gradient-to-br from-gray-700/20 to-gray-800/20'
                : 'bg-gradient-to-br from-white/20 to-gray-50/20'
            }`}></div>
          )}
          
          <div className="prose prose-sm max-w-none relative">
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              <ReactMarkdown components={components}>
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
          {!isUser && (
            <button
              onClick={() => handleCopy(message.text, `message-${index}`)}
              className={`absolute bottom-2 right-2 p-1.5 rounded-full transition-colors backdrop-blur-sm ${
                isDark 
                  ? 'bg-gray-700/80 hover:bg-gray-600/80 border border-gray-600/50'
                  : 'bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200/50'
              }`}
              title="Copy message"
            >
              {copiedMap[`message-${index}`] ? (
                <Check size={14} className={isDark ? "text-green-400" : "text-green-600"} />
              ) : (
                <Copy size={14} className={isDark ? "text-gray-300" : "text-gray-600"} />
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  MessageBubble.propTypes = {
    message: PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
  };
  return (
    <div className={`rounded-xl shadow-2xl border overflow-hidden h-[600px] flex flex-col backdrop-blur-xl relative ${
      isDark 
        ? 'bg-gray-800/70 border-gray-700/50'
        : 'bg-white/70 border-gray-200/50'
    }`}>
      {/* Background glass effect */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800/30 to-gray-900/30'
          : 'bg-gradient-to-br from-white/30 to-gray-50/30'
      }`}></div>

      <div className={`relative p-4 border-b flex-shrink-0 backdrop-blur-sm ${
        isDark 
          ? 'border-gray-700/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10'
          : 'border-gray-200/50 bg-gradient-to-r from-blue-50/80 to-purple-50/80'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h3 className={`font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Sehpaathi AI</h3>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              A friendly ChatBot customised for your college
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} index={index} />
          ))}
          {isTyping && (
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <Bot size={18} className="text-white" />
              </div>
              <div className={`px-4 py-3 rounded-2xl rounded-bl-none backdrop-blur-sm shadow-lg ${
                isDark 
                  ? 'bg-gray-800/70 border border-gray-700/50'
                  : 'bg-white/70 border border-gray-200/50'
              }`}>
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className={`relative p-4 border-t flex-shrink-0 backdrop-blur-sm ${
        isDark 
          ? 'border-gray-700/50 bg-gray-800/50'
          : 'border-gray-200/50 bg-white/50'
      }`}>
        <div className="flex space-x-4">
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Ask anything about your studies..."
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm backdrop-blur-sm transition-all ${
              isDark 
                ? 'bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400'
                : 'bg-white/50 border-gray-200/50 text-gray-900 placeholder-gray-500'
            }`}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!aiInput.trim() || isTyping}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all backdrop-blur-sm ${
              aiInput.trim() && !isTyping
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                : `${isDark 
                    ? "bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/50"
                    : "bg-gray-100/50 text-gray-400 cursor-not-allowed border border-gray-200/50"
                  }`
            }`}
          >
            <Send size={18} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <p className={`mt-2 text-xs text-center ${
          isDark ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Press Enter to send your message
        </p>
      </div>
    </div>  );
};

AIAssistant.propTypes = {
  messages: PropTypes.array.isRequired,
  aiInput: PropTypes.string.isRequired,
  setAiInput: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired,
};

export default AIAssistant;