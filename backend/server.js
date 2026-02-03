import express from "express";
import 'dotenv/config'
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { getDashboardStats } from "./controllers/statsController.js";
import authMiddleware from "./middleware/auth.js";
import adminAuth from "./middleware/adminAuth.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        process.env.ADMIN_URL,
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000"
    ].filter(Boolean),
    credentials: true
}));

//db connections
connectDB();

// Serve uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "uploads")));

// API routes
console.log("Loading routes...");
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/api/stats", authMiddleware, adminAuth, getDashboardStats);
app.use("/api/uploads", express.static(path.join(__dirname, "/uploads")));

// Health check (Recommended for Render/Vercel)
app.get("/health", (req, res) => {
    res.status(200).json({ status: "alive" });
});

app.get("/", (req, res) => {
    res.send("API Working");
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.path} not found`,
    });
});

// Start server
const server = app.listen(port, "0.0.0.0", () => {
    console.log(`Server Started on Port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});
