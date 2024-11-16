import { Assistant } from '@mui/icons-material';
import React, { useEffect, useRef } from 'react';

const AIAssistant = ({ messages, aiInput, setAiInput, handleSendMessage }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Sehpaathi is Here to Help!</h2>
      <div className="h-96 border border-gray-300 rounded-lg p-4 mb-4 overflow-y-auto bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`inline-block p-3 rounded-lg shadow-sm ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } max-w-xs md:max-w-md lg:max-w-lg`}
              dangerouslySetInnerHTML={{ __html: message.text }}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          placeholder="Ask anything about your studies..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <Assistant className="mr-1" /> Send
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
