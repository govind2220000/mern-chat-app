import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

/* `app.use(express.json())` is a middleware function in Express that parses incoming requests with
JSON payloads. It allows you to access the request body as a JavaScript object. This middleware is
necessary to handle JSON data sent in the request body. */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    "Access-Control-Allow-Origin": "http://localhost:3000",
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  //root route http://localhost:5000
  connectToMongoDB();
  console.log(`listening on port ${PORT}`);
});

// app.get("/", (req, res) => {
//   res.send("Hello World! with nodemon");
// });
