import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // optional: can also use "polling"
});

export default socket;
