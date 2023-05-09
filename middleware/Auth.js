const User=require("../model/User")
const jwt =require("jsonwebtoken");
const auth = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if (!token) {
        req.isVerified = false;
        req.user=false;
           res.json({success:false,msg:"Please login first"})
    }
    else {
        let isVerified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("isverified", isVerified);
        req.isVerified = !!isVerified;
        req.user= await User.findOne({_id:isVerified.userInfo.id});
        // console.log("user id auth",req.user);

        return next();
    }
    }
    catch(err){

        res.status(400).json({
            success:false,
            msg:err.message
        })
    }
}
module.exports=auth;