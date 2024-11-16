import React from "react";
import Profile from "../../components/Profile/Profile";
import { Search } from "lucide-react";

const DashboardHeader = ({ userName }) => {
  return (
    <>
      <div className="flex flex-row justify-between max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Swagatam {userName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Your personalized learning companion at MITS, Gwalior
          </p>
        </div>

        <div className="">
          <Profile />
        </div>
      </div>

      {/* <div className=" mb-8">
        <input
          type="text"
          placeholder="Search for study materials, ask questions..."
          className="w-full p-4 pl-12 rounded-lg border focus:outline-none bg-searchbg focus:ring-2 focus:ring-neutral-400"
        />
        <Search className="absolute left-4 top-4 text-gray-400" size={20} />
      </div> */}
    </>
  );
};

export default DashboardHeader;
