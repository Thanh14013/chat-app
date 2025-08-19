import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error(error);
    }
}