import { io } from "socket.io-client";

const socket = io(
  "https://saveher.onrender.com"
);

export default socket;