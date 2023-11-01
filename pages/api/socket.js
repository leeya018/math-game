import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("join-room", (room) => {
        const roomClients = io.sockets.adapter.rooms.get(room) || new Set();
        if (roomClients.size < 4) {
          socket.join(room);
          console.log(`User joined room ${room}`);
        } else {
          console.log(`Room ${room} is full`);
        }
      });
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
  res.end();
};

export default SocketHandler;
