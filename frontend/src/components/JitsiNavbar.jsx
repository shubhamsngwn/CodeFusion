import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { api_base_url, toggleClass } from "../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JitsiNavbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  const toggleMode = () => {
    console.log("Light Mode Enabled")
  };

  const handleEndInterview = () => {
    toast.success("Interview Ended", { position: "top-right", autoClose: 3000 });
    // Delay navigation to let toast show up
    setTimeout(() => {
      navigate("/home");
    }, 3500);
  };

  return (
    <>
      <ToastContainer /> {/* ✅ ToastContainer to display notifications */}
      <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <img className="w-[150px] cursor-pointer" src={logo} alt="Logo" />
        </div>
        <div className="links flex items-center gap-2">
          <button
            onClick={handleEndInterview}
            className="btnBlue !bg-red-500 min-w-[120px] ml-2 hover:!bg-red-600"
          >
            End Interview
          </button>

          <Avatar
            onClick={() => toggleClass(".dropDownNavbar", "hidden")}
            name={data ? data.user.username : ""}
            size="40"
            round="50%"
            className="cursor-pointer ml-2"
          />
        </div>

        <div className="dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] w-[150px] h-[160px]">
          <div className="py-[10px] border-b-[1px] border-b-[#fff]">
            <h3 className="text-[17px]" style={{ lineHeight: 1 }}>
              {data ? data.user.username : "Guest"}
            </h3>
          </div>
          <i
            onClick={toggleMode}
            className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
            style={{ fontStyle: "normal" }}
          >
            <MdLightMode className="text-[20px]" /> Light mode
          </i>
          <i
            onClick={() => setIsGridLayout(!isGridLayout)}
            className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
            style={{ fontStyle: "normal" }}
          >
            <BsGridFill className="text-[20px]" /> {isGridLayout ? "List" : "Grid"} layout
          </i>
        </div>
      </div>
    </>
  );
};

export default JitsiNavbar;
