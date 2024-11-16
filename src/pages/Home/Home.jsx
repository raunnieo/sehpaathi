import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-boxbg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Student
              <br />
              engagement
              <br />
              made <span className="text-spantext">easy</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              Engage students and automate attendance in in-person, online, and
              hybrid classes.
            </p>
            <button
              className="bg-buttonbg text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-buttonbghover transition-colors"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Right side - Stats and Network diagram */}
          <div className="flex flex-col gap-8">
            <img
              src="src\assets\gif.gif"
              alt="SEHPAATHI Logo"
              className="h-auto w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
