const { likeandunlike, createPost, deletePost, getFeedPost, updateCaption, commentOnPost, deleteComment, getSinglePost } = require("../controllers/Post");
const Post=require("../model/Post")
const auth=require("../middleware/Auth")
const router=require("express").Router();
router.post("/upload",auth,createPost);
router.route("/like/:id").get(auth,likeandunlike)
.put(auth,updateCaption)
.delete(auth,deletePost)
router.get("/get/:id",getSinglePost)
router.get("/feedpost",auth,getFeedPost);
router.route("/comment/:id").post(auth,commentOnPost)
.delete(auth,deleteComment);


module.exports=router;