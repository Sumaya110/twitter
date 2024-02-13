import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    // after the connection.....
  });

  console.log("Setting up socket");
}