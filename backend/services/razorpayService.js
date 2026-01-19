import Razorpay from "razorpay";
import { EXCHANGE_RATE, DELIVERY_CHARGE } from "../config/constants.js";

const createRazorpayOrder = async (amount) => {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: (amount + DELIVERY_CHARGE) * EXCHANGE_RATE * 100, // amount in the smallest currency unit (paise)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await instance.orders.create(options);
        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export { createRazorpayOrder };
