import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const connectDb = async () =>
{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Successfully Connected to Database")
    } catch (error) {
        return res.status(500).json({
            success : false,
            errorMessage : error
        })
    }
}