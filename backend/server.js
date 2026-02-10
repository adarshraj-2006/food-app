/**
 * ================================
 *  Backend Server (Render Ready)
 * ================================
 * - Node.js + Express
 * - MongoDB Atlas
 * - Vercel Frontend + Admin
 * - Correct CORS (NO crashes)
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
// Allowed Origins
// --------------------------------
app.use(
  cors({
    origin: true, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token", "X-Requested-With"],
  })
);

// Preflight support
app.options(/.*/, cors());

// Additional explicit CORS header middleware: ensures responses include
// Access-Control-Allow-* headers when the request Origin matches allowedOrigins.
// This is a safe fallback to help deployments that may run a different build
// or where the `cors` package callback didn't set the header as expected.
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,PATCH,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, token, X-Requested-With"
    );
  }
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// --------------------------------
// Global Middleware
// --------------------------------
app.use(express.json());

// --------------------------------
// Environment Debug (safe)
// --------------------------------
console.log("🔍 Environment Check:");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Missing");
console.log("FRONTEND_URL/CLIENT_URL:", (process.env.FRONTEND_URL || process.env.CLIENT_URL) ? "✅ Set" : "❌ Missing");
console.log("ADMIN_URL:", process.env.ADMIN_URL || "⚠️ Not set");

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
