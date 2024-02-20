import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
// http.createServer(app) is used to create a socket server on top of express server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  //The userId we are getting from SocketContext from frontend\src\context\SocketContext.jsx
  const { userId } = socket.handshake.query;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }
  // io.emit() is used to send events to all the connected clients
  io.emit("onlineUsers", Object.keys(userSocketMap));
  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
