import mongoose from "mongoose";

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        console.log("⏳ Connecting to MongoDB Atlas...");
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Error!");
        console.error(`- Error Message: ${error.message}`);
        console.error("- Solution: GO TO MONGODB ATLAS -> NETWORK ACCESS -> ADD IP ADDRESS -> ALLOW ACCESS FROM ANYWHERE (0.0.0.0/0)");
    }
}