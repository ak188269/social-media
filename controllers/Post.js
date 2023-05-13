const Post=require("../model/Post")
const User=require("../model/User")
const cloudinary=require("cloudinary");
// ------------------- creating a post -----------------------------------------------------
const createPost= async(req,res)=>{

try{
    if(!req.isVerified){
            return res.status(200).json({success:false,msg:"Please login first"});
        
    }
    const {caption,image}=req.body;
    let postImage={public_id:"",url:""};
    if(image){
     const myCloud =  await cloudinary.uploader.upload(image,{folder:"posts"});
     postImage={public_id:myCloud.public_id,url:myCloud.secure_url};
    }
const newPost= await Post.create({
    caption:caption,
    image:postImage,
    owner:req.user._id
})
const user= await User.findById(req.user._id);
user.posts.push(newPost._id);
const latestPost=await Post.findById(newPost._id).populate(['owner','likes','comments']);
await user.save();
res.status(200).json({
    success:true,
    msg:"Post uploaded successfully",
    post:latestPost,
})
}catch(err){
    res.status(500).json({
        success:false,
        msg:err.message
    })
}
}

// -------------------- liking and disliking a post ----------------------------
const likeandunlike= async (req,res)=>{
try{
    const post=await Post.findById(req.params.id);
    if(!post){
        return res.status(500).json({success:false,msg:"No such post"});
        }
    if(post.likes.includes(req.user.id))
    {
        let index=post.likes.indexOf(req.user.id);
    post.likes.splice(index,1);
    await post.save();
    return res.status(200).json({success:true,msg:"Post unliked"});
    }else{
        post.likes.push(req.user.id);
        await post.save();
        return res.status(200).json({success:true,msg:"Post liked"});
    }
}catch(err){
    return res.status(500).json({success:false,msg:err.message});
}
}

//  ---------------------------------- deleting post -----------------------------------
const deletePost= async (req,res)=>{
    try{
    const id=req.params.id;
let post=await Post.findById(id);
if(!post){
    return res.status(500).json({success:false,msg:"No such post"});
}

if(post.owner.toString()!==req.user.id.toString()){
    return res.status(500).json({success:false,msg:"You don`t have access"});

}
await post.deleteOne({_id:id});
const user= await User.findById(req.user.id);
const index=user.posts.indexOf(id);
user.posts.splice(index,1);
await user.save();
return res.status(200).json({success:true,msg:"Post deleted"});
    }catch(err){
        return res.status(500).json({success:false,msg:err.message});
    }
}

// -------------- getting all post of following user  ----------------

const getFeedPost=async (req,res)=>{
   try{
    const fiveMin=new Date(new Date()-60000*5).toISOString();
    const loggedInUser = await User.findById(req.user.id);
const posts= await Post.find({$or:[{owner:{$in:loggedInUser.following}},{$and:[{owner:req.user.id},{createdAt:{$gte:fiveMin}}]}]}).populate(["owner","likes","comments.user"]);
    res.status(200).json({success:true, msg :"successfully fetched post ",posts:posts.reverse()});
}catch(err){
    return res.status(500).json({success:false,msg:err.message});
}
}


// ------------------------ updating caption --------------------------------------------
const updateCaption=async(req,res)=>{
try{
    const post= await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({success:false, msg :"Post not found"});

    }
    if(post.owner.toString()!==req.user.id.toString()){
        return res.json({success:false, msg :"You don`t have access"});

    }
const {caption}=req.body;
post.caption=caption;
await post.save();
 return res.status(200).json({success:true, msg :"caption updated successfully"});
}
catch(err){
    return res.status(500).json({success:false,msg:err.message});
}
}

//  -------------------------------------- addding comment on post ----------------------------------------------
const commentOnPost=async(req,res)=>{
    try{
        const {comment}=req.body;
      const post= await Post.findById(req.params.id);
      if(!post){
        return res.json({success:false,msg:"Post not found"});

      }
      post.comments.push({user:req.user.id,comment});
      await post.save();
     return res.status(200).json({success:true, msg :"comment added successfully"});
    }
    catch(err){
        return res.status(500).json({success:false,msg:err.message});
    }
    }

    // ----------------- deleting comment only if comment is on your post ---------------
    const deleteComment=async(req,res)=>{
      try{
        const post= await Post.findById(req.params.id);
        const {commentId}=req.body;
        if(!post){
            return res.status(404).json({success:false,msg:"Post not found"});
    
          }
          const comments=post.comments;
          let flag=true;
          if(post.owner.toString()===req.user.id){
          comments.forEach(async (comment,index)=>{
            if(comment._id.toString()===commentId.toString()){
                flag=false;
post.comments.splice(index,1);
await  post.save();
         return res.status(200).json({success:true, msg :"comment deleted"});
            }
          })
        }
          if(flag){
              return res.status(200).json({success:false, msg :"You cannot delete this comment"});

          }
        }
        catch(err){
            return res.status(500).json({success:false,msg:err.message});
        }

    }
    // ------get single post through id ----------
    const getSinglePost=async(req,res)=>{
        try{
            const post= await Post.findById(req.params.id).populate(["owner","comments.user","likes"]);
            if(!post){
                return res.json({success:false,msg:"Post not found"});
            }
            return res.status(200).json({success:true,msg:"Post fetched successfully",post});
        }
        catch(err){
            return res.status(500).json({success:false,msg:err.message});
        }
    }
module.exports={createPost,likeandunlike,deletePost, getFeedPost,updateCaption,commentOnPost,deleteComment,getSinglePost}