import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";

const getDashboardStats = async (req, res) => {
    try {
        const users = await userModel.countDocuments({});
        const foods = await foodModel.countDocuments({});
        const orders = await orderModel.countDocuments({});

        // Calculate total sales
        const allOrders = await orderModel.find({});
        const totalSales = allOrders.reduce((acc, order) => {
            return order.payment ? acc + order.amount : acc;
        }, 0);

        res.json({
            success: true,
            data: {
                users,
                foods,
                orders,
                totalSales
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching stats" });
    }
}

export { getDashboardStats };
