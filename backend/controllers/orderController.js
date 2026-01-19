import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { createRazorpayOrder } from "../services/razorpayService.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { FRONTEND_URL } from "../config/constants.js";
import crypto from "crypto";

// place order from frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const razorpayOrder = await createRazorpayOrder(req.body.amount);

        return successResponse(res, "Order Placed", {
            order_id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            db_order_id: newOrder._id
        }, 201);

    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error placing order");
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature, success } = req.body;
    try {
        if (success === "true") {
            const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
            hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
            const generated_signature = hmac.digest("hex");

            if (generated_signature === razorpay_signature) {
                await orderModel.findByIdAndUpdate(orderId, { payment: true });
                return successResponse(res, "Paid");
            } else {
                return errorResponse(res, "Invalid Signature", 400);
            }
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            return errorResponse(res, "Not Paid", 400);
        }
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error verifying order");
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        return successResponse(res, "Orders Fetched", orders);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error fetching user orders");
    }
}

// listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        return successResponse(res, "All Orders Fetched", orders);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error fetching all orders");
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        return successResponse(res, "Status Updated");
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error updating status");
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
