/**
 * ================================
 *  Backend Server (Render Ready)
 * ================================
 * - Node.js + Express
 * - MongoDB Atlas
 * - Vercel Frontend + Admin
 * - CORS: ALLOW ALL (dev/debug)
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
const PORT = process.env.PORT || 4000;

// --------------------------------
// 🔥 CORS (ALLOW ALL — SINGLE SOURCE)
// --------------------------------
app.use(
  cors({
    origin: true,        // allow all origins
    credentials: true,   // allow cookies / auth
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token", "X-Requested-With"],
  })
);

// Preflight support (Express v5 safe)
app.options(/.*/, cors());

// --------------------------------
// Global Middleware
// --------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------------------
// Environment Debug (safe)
// --------------------------------
console.log("🔍 Environment Check:");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Missing");
console.log("PORT:", PORT);

// --------------------------------
// Database Connection
// --------------------------------
connectDB();

// --------------------------------
// Static Files
// --------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// --------------------------------
// API Routes
// --------------------------------
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Admin stats (protected)
app.get("/api/stats", authMiddleware, adminAuth, getDashboardStats);

// --------------------------------
// Health Check (Render requirement)
// --------------------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "alive" });
});

// Root test
app.get("/", (req, res) => {
  res.send("✅ API Working");
});

// --------------------------------
// 404 Handler
// --------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// --------------------------------
// Start Server
// --------------------------------
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// --------------------------------
// Global Error Handling
// --------------------------------
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});
