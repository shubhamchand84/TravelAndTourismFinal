const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { 
    origin: "http://localhost:3000",
    credentials: true 
  },
  path: "/socket.io/"
});

const imageRoutes = require("./routes/image");
const { router: authRoutes } = require("./routes/auth");
const contentRoutes = require("./routes/content");

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/images", imageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("new-comment", (data) => {
    io.emit("receive-comment", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(process.env.PORT || 5001, () => {
  console.log(`Server running on port ${process.env.PORT || 5001}`);
});
