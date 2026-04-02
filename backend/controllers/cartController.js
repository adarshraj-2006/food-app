import userModel from "../models/userModel.js";
import { successResponse, errorResponse } from "../utils/response.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return errorResponse(res, "User not found", 404);
        }
        let cartData = userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return successResponse(res, "Added To Cart");
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error adding to cart");
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return errorResponse(res, "User not found", 404);
        }
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return successResponse(res, "Removed From Cart");
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error removing from cart");
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return errorResponse(res, "User not found", 404);
        }
        let cartData = userData.cartData;
        return successResponse(res, "Cart Fetched", cartData);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error fetching cart");
    }
}

export { addToCart, removeFromCart, getCart };
