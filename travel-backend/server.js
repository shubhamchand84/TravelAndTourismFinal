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
    origin: [
      'http://localhost:3000', 
      'http://localhost:3001',
      'https://travelandtourismfinal-1.onrender.com',
      'https://travelandtourismfinal.onrender.com'
    ],
    credentials: true 
  },
  path: "/socket.io/"
});

const imageRoutes = require("./routes/image");
const { router: authRoutes } = require("./routes/auth");
const contentRoutes = require("./routes/content");
const packageRoutes = require("./routes/packages");
const bookingRoutes = require("./routes/bookings");
const paymentRoutes = require("./routes/payments");
const reviewRoutes = require("./routes/reviews");
const supportRoutes = require("./routes/support");

// New travel routes
const travelPackageRoutes = require("./routes/travelPackages");

app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://travelandtourismfinal-1.onrender.com',
    'https://travelandtourismfinal.onrender.com'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use("/uploads", express.static("uploads"));
app.use("/api/images", imageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/support", supportRoutes);

// New travel routes
app.use("/api/travel-packages", travelPackageRoutes);

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
