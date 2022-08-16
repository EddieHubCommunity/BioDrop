import mongoose from "mongoose";

const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI).then((data) => console.log("Hello connected")).catch((res) => console.log("Here is error"));

console.log("Connected or not",connectMongo)

export default connectMongo;
