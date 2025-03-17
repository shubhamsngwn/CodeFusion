import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import { FiDownload } from "react-icons/fi";

const EditiorNavbar = () => {
  const location = useLocation();
  const projectTitle = location.state?.title || "Untitled Project"; // Default title if none is passed

  return (
    <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
      <div className="logo">
        <img className="w-[150px] cursor-pointer" src={logo} alt="Logo" />
      </div>
      <p>File / <span className="text-[gray]">{projectTitle}</span></p>
      <i className="p-[8px] btn bg-white rounded-[5px] cursor-pointer text-[20px]">
        <FiDownload />
      </i>
    </div>
  );
};

export default EditiorNavbar;
