import "./Post.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import User from "./User";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { commentOnPost, getPost, likePost } from "./Actions/post";
import Loader from "./Loader";
import { ToastContainer, toast} from "react-toastify";
import { Modal ,ModalBody,ModalCloseButton,ModalContent,ModalHeader, ModalOverlay} from "@chakra-ui/react";
import { getFollowingUsersPost } from "./Actions/user";
// import { Dialog, Modal } from "@mui/material";
const Post=({postId,name,profileImg,postImg ,userId,likes,comments,caption})=>{
    const [isLiked,setisLiked]=useState(false);
    const [Likes,setLikes]=useState(0);
const Shares=0;
    const [LikesArray,setLikesArray]=useState([]);
  
    const [Comments,setComments]=useState(0);
    const [CommentsArray,setCommentsarray]=useState([]);
    const [commentValue,setCommentValue]=useState("");
    const [OpenDialog,setOpenDialog]=useState(false);
    const [OpenCommentsDialog,setOpenCommentsDialog]=useState(false);
    
    const dispatch=useDispatch();
    const {id}=useParams();

    const {user}=useSelector((state)=>state.user);
    // --------------- handle likes ---------------------------
    const handleLike=()=>{
   if(!user){
    toast.error("Please login first",{position:"top-center",autoClose:600,theme:"dark"})
    return;
   }
        setisLiked(!isLiked);
        if(id)
    dispatch(likePost(id));
    
    else dispatch(likePost(postId));
    setTimeout(()=>{
        if(id){
            dispatch(getPost(id));
        }
        else
       { 
                dispatch(getFollowingUsersPost());
            }
    },900);
    

    }
    
    // add comments to the post --------------

    const handleComments=()=>{


        if(id)
    dispatch(commentOnPost(id,commentValue));
    
    else dispatch(commentOnPost(postId,commentValue));
      setCommentValue("");
    setTimeout(()=>{
        if(id){
            dispatch(getPost(id));
        }
        else
        dispatch(getFollowingUsersPost());

    },900);
    
    }


   

useEffect(()=>{
    if(likes!==undefined){
        setLikes(likes.length);
        setComments(comments.length);
        setLikesArray(likes);
        setCommentsarray(comments);
        likes?.forEach((item)=>{
            if(item._id===user?._id){
                setisLiked(true);
            }
        });
    }
    if(id)
    dispatch(getPost(id));

},[dispatch,likes,comments,comments?.length,user?._id,id])
const {posts,loading,error}=useSelector((state)=>state.post);
useEffect(()=>{
    if(id && !loading && error==null){
        setLikes(posts?.likes?.length);
        setComments(posts?.comments?.length);
        setLikesArray(posts?.likes);
        setCommentsarray(posts?.comments);
        posts?.likes?.forEach((likedby)=>{
            if(user?._id.toString()===likedby?._id.toString()){
                setisLiked(true);
            }
        });
    }
},[posts,id,loading,error,user?._id]);
const {msg:likeMsg,error:likeError,loading:likeLoading}=useSelector((state)=>state.like);

useEffect(()=>{
    if(id){
if(!likeError && !likeLoading && likeMsg){
    toast.success(likeMsg,{position:"top-center",autoClose:600,theme:"dark"});
    dispatch({type:"LIKE_CLEAR"});
  
}
else if(  likeError && !likeLoading){
    toast.error(likeError,{position:"top-center",autoClose:600,theme:"dark"});
    dispatch({type:"LIKE_CLEAR"});
}
    }
},[likeMsg,likeError,likeLoading,dispatch,id]);
    return(
        <>
        <ToastContainer />
  

      {
loading ? <Loader/>  : error ? (error) :

       (<section id="user-post">
        {/* ----user detials with profile pic ------- */}
<User direction={"row"} id={userId || posts?.owner?._id} name={name || posts?.owner?.name } fs={40} image={profileImg || posts?.owner?.avatar?.url}/>

{/* ----------caption of post ------------------ */}
<div id="caption">
  {caption ? caption : posts?.caption || "this is caption"}
</div>

{/* ----------- post photos ------------------ */}
<div id="post-photo">
<img src={postImg? postImg: posts?.image?.url || ""}alt="post"/>
</div>

{/* ---------------likies and comments and shares ------------ */}

<div id="post-reaction" className="reactions">
{isLiked ? <FavoriteIcon style={{color:"red",cursor:"pointer"}} onClick={handleLike} /> : <FavoriteBorderIcon style={{cursor:"pointer"}} onClick={handleLike}/>}
<ChatBubbleOutlineIcon style={{cursor:"pointer"}} onClick={()=> setOpenCommentsDialog(true)}/>
<ShareIcon style={{cursor:"pointer"}} onClick={()=>alert("coming soon...")}/>

</div>
{/* <hr /> */}
<div id="stats" className="reactions">
   {   <span className="st-items" onClick={()=>LikesArray?.length>0 && setOpenDialog(true)} > {Likes} likes </span>}
        {  <span className="st-items" onClick={()=> setOpenCommentsDialog(true)}>{Comments} comments </span>}
      {  <span className="st-items">{Shares} shares</span>}
</div>
       </section>
       )
      }

      {/* modal  for user who has liked the post */}

      <Modal isOpen={OpenDialog} size={"md"} onClose={()=>setOpenDialog(false)} scrollBehavior="inside">
    <ModalOverlay/>
    <ModalContent >
        <ModalHeader color={"white"} style={{display:"flex"}} bgColor={"red"}
        padding={"8px"}
        >
           Liked by 
        </ModalHeader>
<ModalCloseButton  color={"white"}/>

    
    <ModalBody>
       {
        LikesArray && LikesArray.length>0 && (LikesArray.map((user,ind)=>{
            return(
                <User key={user?._id} direction={"row"}  id={user?._id} image={user?.avatar?.url} name={user?.name} fs={30}/>
            )
        }))
       }
    </ModalBody>
    </ModalContent>
   </Modal>
      {/* modal  for comments  */}

      <Modal isOpen={OpenCommentsDialog} size={"md"} onClose={()=>setOpenCommentsDialog(false)} scrollBehavior="inside" >
    <ModalOverlay/>
    <ModalContent>
        <ModalHeader color={"white"} style={{display:"flex"}} bgColor={"red"}  padding={"8px"}>
           Comments
        </ModalHeader>
<ModalCloseButton  color={"white"}/>
    
    <ModalBody>
        {user && 
        <form action="" id="comment-form">

<textarea value={commentValue} placeholder="your comment ..." rows={"1"} onChange={(e)=>setCommentValue(e.target.value)}/>
<SendIcon type={"submit"} fontSize="large" id="comment-btn" onClick={handleComments}/>



        </form>
}
       {
       CommentsArray &&CommentsArray?.length>0 && (CommentsArray.map((comment,ind)=>{
            return(
               
               <div  key={ind}className="comment-box" style={{margin:"5px 0px"}} >
                <User  direction={"row"}  id={comment?.user?._id} image={comment?.user?.avatar.url}
                 name={""}/>
                <span>
                    <h3 id="user-name">{comment.user?.name}</h3> 
             <span >{comment?.comment}</span>
                </span>
               
               </div>
               
            )
        }))
       }
    </ModalBody>
    </ModalContent>
   </Modal>

   
       </>
        
    )
}
export default Post; 




