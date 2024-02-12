import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.log("Error connecting MongoDB", error.message);
  }
};

export default connectToMongoDB;
