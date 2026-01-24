import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

foodRouter.post("/add", async (req, res) => {
  const food = new Food({
    name: "Burger",
    price: 120,
    category: "Fast Food",
    image: "burger.png",
  });
  await food.save();
  res.json({ success: true });
});


// Public route
foodRouter.get("/list", listFood);

// Admin only routes
foodRouter.post("/add", authMiddleware, adminAuth, upload.single("image"), addFood);
foodRouter.post("/remove", authMiddleware, adminAuth, removeFood);

export default foodRouter;