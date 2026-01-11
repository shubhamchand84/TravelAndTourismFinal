const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://travelandtourismfinal-1.onrender.com',  // Actual frontend URL',   // Alternative frontend URL
  'https://travelandtourismfinalbackenddd.onrender.com' // Backend URL (for self-reference)
];

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { 
    origin: allowedOrigins,
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

// CORS middleware configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
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
