const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const crypto=require("crypto");
const Schema=new mongoose.Schema({
name:{
    type : String,
    required:[true,"Please enter a name"]
},
email:{
    type : String,
    required:[true,"Please enter a email"],
    unique:[true,"Email already registered"]
},
password:{
    type:String,
    required:[true,"Please enter a password"],
    minlength:[6,"Password must be atleast of 6 characters"],
    select:false,
},
avatar:{
   public_id:String,
   url:String
},
posts:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
}],
followers:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
],
following:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
]
,
isActive:{
    type:Boolean,
    default:true
},
lastSeen:{
    type:Date,
    default:Date.now
},
resetPasswordToken:String,
resetPasswordExpiry:Date,

});
Schema.pre("save",async function(next){
    if(this.password && this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
    }
    next();
})
// adding method to match password
Schema.methods.matchPassword=async function(password){
const isMatch= await bcrypt.compare(password.toString(),this.password);
return isMatch;
}

// method to get reset password token
Schema.methods.getResetPasswordToken= function(req,res){
    const token= crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("shah256").update(token).digest("hex"); //this line will hash token
    this.resetPasswordExpiry=Date.now()+10*60*1000;
    // shah256 is hashing algorithm 
    return token;
}
module.exports=mongoose.model("users",Schema);