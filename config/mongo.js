import mongoose from "mongoose";

let hasConnection = false;
const connectMongo = async () => {
  if (hasConnection) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    hasConnection = true;
    console.log("DB connected");
  } catch (err) {
    hasConnection = false;
    console.error("DB Not connected", err);
  }
};

export default connectMongo;
