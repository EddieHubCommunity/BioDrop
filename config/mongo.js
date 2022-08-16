import mongoose from "mongoose";

const connectMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI).then(() => console.error("DB connected")).catch((err) => console.error("DB not connected",err));
    }catch(err){
        console.error("DB Not connected",err)
    }
}

export default connectMongo;
