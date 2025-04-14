import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../images/logo.png";
import socket from "../socket";
import { v4 as uuidv4 } from 'uuid';

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
    const uuid = uuidv4();
    socket.emit("join-room", { roomId, uuid, username }, (response) => {
      console.log("roomid" + roomId)
      console.log("uuid" + uuid)
      console.log("username" + username)
      if (response.error) {
        toast.error(response.error, {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        navigate(`/home`, {
          state: { username, roomId, uuid },
        });
      }
    });
  };

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      joinRoom();
    }
  };

  const cancel = () => {
    navigate("/home");
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

          {/* Buttons wrapper with flex */}
          <div
            className="buttonGroup"
            style={{
              display: "flex",
              gap: "6px",
              marginTop: "10px",
              justifyContent: "center",
            }}
          >
            <button className="btn joinBtn" onClick={joinRoom}>
              JOIN
            </button>
            <button className="btn joinBtn" onClick={cancel}>
              CANCEL
            </button>
          </div>
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
