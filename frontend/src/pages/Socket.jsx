import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    transports: ["websocket"]
});

socket.on("connect", () => {
    console.log("✅ Connected to server. Socket ID:", socket.id);
});

export default socket;
