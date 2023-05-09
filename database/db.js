const mongoose=require("mongoose");
const uri=process.env.DATABASE_URL;
const connectToDatabase= async ()=>{
await mongoose.connect(`${uri}`);
    console.log("connected to database");
}
module.exports=connectToDatabase;