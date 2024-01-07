const express = require("express");
const app = express();
const dot = require("dotenv");
const jwt = require('jsonwebtoken');
const User = require("../model/User");
const Post=require("../model/Post");
const cloudinary=require("cloudinary").v2;
const querystring = require('querystring');

// dot.config({ path: "./config.env" });
const secretKey = process.env.JWT_SECRET_KEY;
const expiryTime = 30 * 24 * 60 * 60 * 1000;
// ------------------ registering a user --------------------------
const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user)
            return res.json({ success: false, msg: "User already exist" });
        user = await User.create({
            name, email, password, avatar: { public_id: "sample id", url: "sample url" } ,
            // this will add virat , ranbir and mr modi profile in everyone who creates account this will be bring some post when user logins for the first time

            following : ["659a88981ddc2e8b7ac3f672","659a8c721653f0766e13a3e8","659a8ad81ddc2e8b7ac3f67e"]
        })
        const id = user._id;
        const payload = {
            userInfo: {
                name, id
            }
        };
        const token = jwt.sign(payload, secretKey);
        user=await User.findById(id);
        res.cookie("jwt", token, { maxAge: expiryTime, httpOnly: true });
        res.status(200).json({ success: true, msg: "Account created successfully ✔" ,user:user});
    }
    catch (err) {
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }

}
// --------------------login function --------------------------------
const login = async (req, res) => {
    try{
    const { email, password } = req.body;
    if (req.isVerified === true)
        return res.send({ success: true, msg: "Logged In successfully using jwt✔",user:req.user });
    else {
        let user = await User.findOne({ email }).select(["name", "password","isActive"]);
        if (!user) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }
        const name = user.name;
        const id = user._id;
        const payload = {
            userInfo: {
                name, id
            }
        };
        const token = jwt.sign(payload, secretKey);
        res.cookie("jwt", token, { maxAge: expiryTime, httpOnly: true });
        user=await User.findById(user._id);
        res.status(200).json({ success: true, msg: "Logged In successfully ✔",user});
    }
}
catch(err){
    return res.status(500).json({ success:false,msg: err.message });
}
}
// -------------------- logout funtion ---------------------
const logout = async (req, res) => {
    // if(!req.isVerified){
    //     return res.status(200).json({success:false,msg:"Please login first"});
    // }
   await res.cookie("jwt",null,{maxAge:0,httpOnly:true});
    res.send({ success: true, msg: req.user.name+" Log Out successfully 👍" });
}

// ---------------- updating password -------------------------
const changePassword=async(req,res)=>{
   try{ 
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword){
        return res.json({ success:false,msg: "Please provide valid password" });
    }
    const user= await User.findById(req.user.id).select("password");
    const isMatch=user.matchPassword(oldPassword);
    if(!isMatch){
        return res.json({ success:false,msg: "Incorrect Old password" });
    }
    user.password=newPassword;
    await user.save();
    res.send({ success: true, msg: "Password changed successfully" });
} catch (err) {
    return res.status(500).json({ success:false,msg: err.message });
}
}

//  --------------------- update profile -------------------------
const updateProfile=async (req,res)=>{
try{
    const {name,email,imageUrl}=req.body;
    const user=await User.findById(req.user.id);
    if(!user){
        return res.send({ success: true, msg: "user not found" });
    }
    if(name){
        user.name=name;
    }
    if(email){
user.email=email;
}
    if(imageUrl){
        if(user?.avatar.public_id)
         await cloudinary.uploader.destroy(user.avatar.public_id);
        const myCloud=await cloudinary.uploader.upload(imageUrl,{folder:"avatars"});
  // Generate a URL for the cropped image
  const croppedImageUrl =cloudinary.url(myCloud.public_id, {aspect_ratio: "1:1", background: "#262c35", border: "5px_solid_rgb:ffffff", gravity: "auto", radius: "max", width: 1000, crop: "fill"})
     user.avatar={public_id:myCloud.public_id, url:croppedImageUrl};
    }
    await user.save();
    return   res.send({ success: true, msg: "Profile updated successfully" ,user});
}
catch (err) {
    return res.json({ success:false,msg: "Error updating " });
}
}
//  ------------------ forgot password -----------------------------------------
const forgotPassword=async(req,res)=>{
    try{ 
        const {email,newPassword}=req.body;
        const user= await User.findOne({email}).select("password");
        if(!user){
            return res.json({ success:false,msg: "Email not found" });

        }
        user.password=newPassword;
        await user.save();
        res.send({ success: true, msg: "Password changed successfully" });
    } catch (err) {
        return res.status(500).json({ success:false,msg: err.message });
    }
}

// ---------------------------------following a user ----------------------
const followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user.id);
        if (!userToFollow) {
            return res.json({ success: false, msg: "No user found" });
        }

        // if user is alredy followed then unfollow it 
        if(loggedInUser.following.includes(req.params.id)){

 // deleting user id from followers array
 const ind = userToFollow.followers.indexOf(req.user.id);
 userToFollow.followers.splice(ind, 1);
 await userToFollow.save();


 // deleting usertoUnfollow id from user`s followers array
 const loggedInUser = await User.findById(req.user.id);
 const index = loggedInUser.following.indexOf(req.params.id);
 loggedInUser.following.splice(index, 1);
 await loggedInUser.save();

 return res.status(200).json({ success: true, msg: "You unfollowed " + userToFollow.name });
        }

        // if user is not followed then follow it 
        else{
        userToFollow.followers.push(req.user.id);
        loggedInUser.following.push(req.params.id);
        await userToFollow.save();
        await loggedInUser.save();
        return res.status(200).json({ success: true, msg: "you are following " + userToFollow.name });
        }
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}

// --------------------- deleting user profile ------------------------
const deleteProfile=async (req,res)=>{
   try{ 
    const userProfile=await User.findById(req.user.id);
    if(!userProfile){
        return res.json({success:false,msg:"User not found"})
    }
    const userPosts=userProfile.posts;
    // const userFollowing=userProfile.following;
    // const userFollowers=userProfile.followers;

    // ----deleting this user id frome all the user whom this user was following ---

// for(let i=0;i<userFollowing.length;i++){
//     const id=userFollowing[i];
//     const userFollowed= await User.findById(id);
//     const index=userFollowed.followers.indexOf(userProfile._id);
//     userFollowed.followers.splice(index,1);
//     await userFollowed.save();
// }

//----- deleting this user id from following of the users who were following this user--------

// for(let i=0;i<userFollowers.length;i++){
//     const id=userFollowers[i];
//     const userFollowed= await User.findById(id);
//     const index=userFollowed.following.indexOf(userProfile._id);
//     userFollowed.following.splice(index,1);
//     await userFollowed.save();
// }


//------- deleting user profile--------

    // await userProfile.deleteOne({_id:userProfile._id});
    userProfile.name="Deleted Account";
    userProfile.isActive=false;
    userProfile.email="null@"+req.user.id;
    userProfile.following=null;
    userProfile.followers=null;
    userProfile.password="null@"+req.user.id;
    await cloudinary.uploader.destroy(userProfile.avatar.public_id);
    userProfile.avatar=null;
    await userProfile.save();

    // deleting user all posts 
    userPosts.forEach( async (postId)=>{
        const post=await Post.findById(postId);
        await cloudinary.uploader.destroy(post.image.public_id);
 await post.deleteOne({_id:post._id});
    })

    //  log out user after account is being deleted
    await res.cookie("jwt",null,{maxAge:0,httpOnly:true});
    return res.status(200).json({ success: true, msg: "account deleted successfully" });
}catch (err) {
    return res.json({ success: false, msg: err.message});
}
}

// delete user profile pic ---------

const deleteUserProfilePic = async(req, res) => {

    try{
        const userProfile=await User.findById(req.user.id);
        if(!userProfile){
            return res.json({success:false,msg:"User not found"})
        }
        
        await cloudinary.uploader.destroy(userProfile.avatar.public_id);
        userProfile.avatar={
            public_id: null,
            url: null
        };
        await userProfile.save();
        res.json({success: true,msg:"Profile pic removed successfully"});
    }
    catch (err) {
res.json({ success:false, msg: err.message});
    }
}

// ----------------- geting loged in user profile ----------------

const myProfile=async(req,res)=>{
    try{
const profile = await User.findById(req.user.id)?.populate(["posts","followers","following"]);
return res.status(200).json({success:true,msg:"fetched successfully",data:profile});
    }
    catch (err) {
    return res.json({ success: false, msg: err.message });
}
}

//  ---------------- getting any user profile through its id-------------

const getProfile=async(req,res)=>{
    try{
const profile = await User.findById(req.params.id)?.populate(["posts","followers","following"]);
if(!profile){
    return res.json({success:false,msg:"User not found"})
}
return res.status(200).json({success:true,msg:"fetched successfully",data:profile});
    }
    catch (err) {
    return res.json({ success: false, msg: err.message });
}
}

// ---------- get all users data ----------------------------
const getAllUsers=async(req,res)=>{
    try{
const users = await User.find({});
return res.status(200).json({success:true,msg:"fetched successfully",data:users});
    }
    catch (err) {
    return res.json({ success: false, msg: err.message });
}
}

// ------- get people with name like "name"-----

const getPeople=async (req, res)=>{
try{
    let people=await User.find({"name":{$regex:`${req?.query?.name}`,$options:"i"}});
res.json({success: true,people});
}
catch (err) {
res.json({success: false,msg: err.message});
}
}
module.exports = { login, register, logout, followUser,changePassword,updateProfile,deleteProfile,myProfile ,getProfile,getAllUsers,forgotPassword,deleteUserProfilePic,getPeople};