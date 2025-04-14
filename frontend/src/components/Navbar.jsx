import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { api_base_url, toggleClass } from "../helper";

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
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
        // console.log("User Data:", data); // ✅ Debugging line
        if (data.success) {
          setData(data);
          // console.log("Testing API data", data.user.username);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => console.error("Fetch error:", err)); // ✅ Catch network errors
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("roomId");
    window.location.reload();
  };

  const toggleMode = () => {
    console.log("Toggle Mode")
    // const bdy = document.querySelector("#root");
    // bdy.style.backgroundColor = "white";
  }

  const handleMockInterview = () => {
    navigate("/jitsi");
    setTimeout(() => {
      navigate("/home")
    }, 5*60*1000);
  }

  const handleRoomMembers = () => {
    console.log("Testing Room Members")
    navigate("/RoomMembers");
  }

  const handleConnect = () => {
    navigate("/roomId")
  }

  return (
    <>
      <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <img className="w-[150px] cursor-pointer" src={logo} alt="" />
        </div>
        <div className="links flex items-center gap-2">
        <button
            onClick={handleConnect}
            className="btnBlue !bg-red-500 min-w-[120px] ml-2 hover:!bg-red-600"
          >
            Connect
          </button>
        <button
            onClick={handleMockInterview}
            className="btnBlue !bg-red-500 min-w-[120px] ml-2 hover:!bg-red-600"
          >
            Mock Interview
          </button>
          <button
            onClick={logout}
            className="btnBlue !bg-red-500 min-w-[120px] ml-2 hover:!bg-red-600"
          >
            Logout
          </button>
          <Avatar
            onClick={() => {
              toggleClass(".dropDownNavbar", "hidden");
            }}
            name={data ? data.user.username : ""}
            size="40"
            round="50%"
            className=" cursor-pointer ml-2"
          />
        </div>

        <div className="dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] w-[150px] h-[160px]">
          <div className="py-[10px] border-b-[1px] border-b-[#fff]">
            <h3 className="text-[17px] test" style={{ lineHeight: 1 }}>
              {data ? data.user.username : "else"}
            </h3>
          </div>
          <i
            onClick={toggleMode} //working on it
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
            <BsGridFill className="text-[20px]" />{" "}
            {isGridLayout ? "List" : "Grid"} layout
          </i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
