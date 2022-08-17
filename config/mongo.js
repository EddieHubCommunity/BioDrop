import mongoose from "mongoose";

const connectMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected")
    }catch(err){
        console.error("DB Not connected",err)
    }
}

export default connectMongo;
