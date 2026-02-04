/**
 * ================================
 *  Backend Server (Render Ready)
 * ================================
 * - Node.js + Express
 * - MongoDB Atlas
 * - Frontend/Admin on Vercel
 * - Proper CORS handling
 */

import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Database
import { connectDB } from "./config/db.js";

// Routes
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Controllers & Middleware
import { getDashboardStats } from "./controllers/statsController.js";
import authMiddleware from "./middleware/auth.js";
import adminAuth from "./middleware/adminAuth.js";

// --------------------------------
// App Initialization
// --------------------------------
const app = express();

// Render provides PORT automatically
const PORT = process.env.PORT || 4000;

// --------------------------------
// CORS Configuration (TOP PRIORITY)
// --------------------------------
// This allows your Vercel frontend/admin and local development to access the backend
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked for origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "token", "Authorization", "X-Requested-With"],
  })
);

// --------------------------------
// Global Middleware
// --------------------------------

// Parse incoming JSON bodies
app.use(express.json());

// --------------------------------
// Environment Debug (safe logs)
// --------------------------------
console.log("🔍 Environment Check:");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Missing");
console.log("CLIENT_URL:", process.env.CLIENT_URL || "❌ Missing");
console.log("ADMIN_URL:", process.env.ADMIN_URL || "⚠️ Not set (optional)");

// --------------------------------
// Database Connection
// --------------------------------
connectDB();

// --------------------------------
// Static Files (Image Uploads)
// --------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// --------------------------------
// API Routes
// --------------------------------
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Admin dashboard stats (protected)
app.get("/api/stats", authMiddleware, adminAuth, getDashboardStats);

// --------------------------------
// Health Check (IMPORTANT for Render)
// --------------------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "alive" });
});

// Root test route
app.get("/", (req, res) => {
  res.send("✅ API Working");
});

// --------------------------------
// 404 Handler (Unknown Routes)
// --------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// --------------------------------
// Start Server (Render Compatible)
// --------------------------------
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// --------------------------------
// Global Error Handling
// --------------------------------

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err.message);
  server.close(() => process.exit(1));
});

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});
