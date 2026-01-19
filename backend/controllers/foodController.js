import foodModel from "../models/foodModel.js";
import fs from "fs";
import { successResponse, errorResponse } from "../utils/response.js";

// Add food item
const addFood = async (req, res) => {
    try {
        // Handle optional image
        let image_filename = null;
        if (req.file) {
            image_filename = req.file.filename;
        }

        const { name, description, price, category } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category) {
            return errorResponse(res, "All fields are required", 400);
        }

        // Validate price
        if (isNaN(price) || Number(price) <= 0) {
            return errorResponse(res, "Price must be a positive number", 400);
        }

        // Create food document
        const food = new foodModel({
            name,
            description,
            price: Number(price),
            category,
            image: image_filename
        });

        await food.save();
        return successResponse(res, "Food Added", food, 201);

    } catch (error) {
        console.error("Add Food Error:", error);
        return errorResponse(res, "Error adding food item");
    }
};

// all food items
const listFood = async (req, res) => {
    try {
        const food = await foodModel.find({});
        return successResponse(res, "Food items fetched", food);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error fetching food items");
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return errorResponse(res, "Food item not found", 404);
        }

        // Remove image file if it exists
        if (food.image) {
            fs.unlink(`uploads/${food.image}`, () => { });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        return successResponse(res, "Food Removed");
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error removing food item");
    }
}

export { addFood, listFood, removeFood };
