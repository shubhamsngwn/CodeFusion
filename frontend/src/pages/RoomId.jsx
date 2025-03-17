import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../images/logo.png";
import Editior from "./Editior";

export default function RoomId() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("ROOM ID or Username is required", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    navigate(`/home`, {
      state: { username },
    });
  };

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("New Room ID Created!", { position: "top-center" });
  };

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="homePageWrapper">
      <ToastContainer />
      <div className="formWrapper">
        <img src={logo} alt="Logo" />
        <h4 className="mainLabel">Paste Invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox1"
            placeholder="ROOM ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox1"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            JOIN
          </button>
          <span className="createInfo">
            If you don't have an invite, create &nbsp;
            <a href="#" onClick={createNewRoom} className="createNewBtn">
              Create New ROOM ID
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built By <a href="https://github.com/shubhamsngwn">Shubham</a>
        </h4>
      </footer>
    </div>
  );
}
