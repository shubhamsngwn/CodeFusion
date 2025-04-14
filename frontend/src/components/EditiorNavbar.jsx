import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import Client from "./Client";

const EditiorNavbar = ({ uniqId }) => {
  const location = useLocation();
  const [clients, setClients] = useState([
    { socketId: 1, username: "Shubham Sangwan" },
    { socketId: 2, username: "Ujjwal" },
    { socketId: 3, username: "Vijay" },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const projectTitle = location.state?.title || "Untitled Project";

  return (
    <div className="relative">
      <div className="EditiorNavbar relative flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        {/* Logo */}
        <div className="logo z-10">
          <img className="w-[150px] cursor-pointer" src={logo} alt="Logo" />
        </div>

        {/* Centered Project Title */}
        <p className="absolute left-1/2 transform -translate-x-1/2 text-white font-medium">
          File / <span className="text-[gray]">{projectTitle}</span>
        </p>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4 z-10">
          <div className="bg-[#2c2c2c] text-white px-4 py-2 rounded-md text-sm">
            Room ID:{" "}
            <span className="text-[#00ffae] font-mono">
              {uniqId || "Loading..."}
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-[10px] bg-[#007BFF] text-white rounded-md text-[20px] hover:bg-[#0056b3] transition"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-[250px] h-full bg-[#1E1E1E] text-white p-5 shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          <FiX />
        </button>

        <h1 className="mt-[50px] text-xl mb-5">Room Members</h1>
        <div className="flex flex-wrap justify-center items-center">
          {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditiorNavbar;
