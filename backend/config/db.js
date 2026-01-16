import mongoose from "mongoose";

export const connectDB =async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/food-del');
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1); // Exit if DB fails
    }
}