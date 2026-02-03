import userModel from "../models/userModel.js";
import { errorResponse } from "../utils/response.js";

const adminAuth = async (req, res, next) => {
    try {
        const userId = req.userId || (req.body && req.body.userId) || req.headers.userid; // Handle multiple cases safely

        if (!userId) {
            return errorResponse(res, "User ID missing", 400);
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return errorResponse(res, "User not found", 404);
        }

        if (!user.isAdmin) {
            return errorResponse(res, "Unauthorized: Admin access required", 403);
        }

        next();
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Internal Server Error", 500);
    }
}

export default adminAuth;
