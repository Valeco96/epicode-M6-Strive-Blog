import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
    console.log("database connesso");
  } catch (error) {
    console.log(error);
  }
}
