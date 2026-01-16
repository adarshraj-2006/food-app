import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

//db connections
connectDB();

// Serve uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "uploads")));

// API routes
console.log("Loading food routes...");
app.use("/api/food", foodRouter);
app.use("/api/uploads", express.static(path.join(__dirname, "/uploads")));

// Health check
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
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
