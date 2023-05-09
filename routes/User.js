const router=require("express").Router();
const {login,register,logout, followUser, unfollowUser, updateProfile, changePassword, deleteProfile, myProfile, getProfile, getAllUsers, forgotPassword, deleteUserProfilePic}=require("../controllers/User");
const auth = require("../middleware/Auth");
router.post("/register",register)
router.route("/login").post(login).get(auth,(req,res)=>{
 res.status(200).json({success:true,user:req.user,msg:"logged in successfully ✔"});
})
router.get("/logout",auth,logout)
router.get("/follow/:id",auth,followUser);
router.post("/update/profile",auth,updateProfile);
router.get("/delete/profilepic",auth,deleteUserProfilePic);
router.post("/udpate/password",auth,changePassword);
router.get("/delete/profile",auth,deleteProfile);
// router.get("/profile/me",auth,myProfile);
router.get("/profile/:id",getProfile);
router.get("/alluser",getAllUsers);
router.post("/forgotPassword",forgotPassword)
module.exports=router