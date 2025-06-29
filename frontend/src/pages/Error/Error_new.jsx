import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronRight, Home, Mail, Sparkles } from "lucide-react";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden flex flex-col justify-center items-center text-center px-4">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-12 rounded-3xl shadow-2xl text-white flex flex-col items-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <AlertTriangle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Oops! Something Went Wrong
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
            The page you&apos;re looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <button
              onClick={() => navigate("/")}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Go Back Home
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate("/contact")}
              className="group bg-gray-700/50 border border-gray-600/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700/70 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 backdrop-blur-sm"
            >
              <Mail className="w-5 h-5" />
              Contact Support
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-gray-400 text-sm">
          If the problem persists, please reach out to us for assistance.
        </p>
      </div>
    </div>
  );
};

export default Error;
