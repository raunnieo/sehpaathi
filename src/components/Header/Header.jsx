import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const headerItems = [
    {
      name: "Home",
      href: "",
    },
    {
      name: "About",
      href: "about",
    },
    {
      name: "Sign In",
      href: "signin",
    },
    {
      name: "Sign Up",
      href: "signup",
    },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-row justify-between max-w-7xl mx-auto px-4 items-center">
        <div className="flex flex-row items-center">
          <div className="p-0">
            <img
              src="\src\assets\logo.png"
              alt="SEHPAATHI Logo"
              className="h-20 w-auto"
            />
          </div>
          <div className="p-4 text-4xl font-bold">SEHPAATHI</div>
        </div>
        <div className="flex flex-row">
          {headerItems.map((item, index) => (
            <button
              key={index}
              className="p-2 px-5 m-2 hover:bg-buttonbghover rounded-full bg-buttonbg text-white"
              onClick={() => navigate(`/${item.href}`)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
