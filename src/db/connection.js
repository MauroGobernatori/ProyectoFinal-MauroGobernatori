import mongoose from "mongoose";
import 'dotenv/config';

export const connectionString = process.env.MONGO_URL;

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB database");
    } catch (error) {
        console.log(`ERROR => ${error}`);
    }      
}