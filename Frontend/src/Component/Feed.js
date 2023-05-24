import Post from "./Post";
import "./Feed.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingUsersPost } from "./Actions/user";
import Loader from "./Loader";
import { toast } from "react-toastify";

const Feed=()=>{
   const dispatch =useDispatch();
   const {loading:likeLoading,msg,error:likeError}=useSelector((state)=>state.like);
   useEffect(()=>{
    if(likeError){
        toast(msg,{position:"top-center",type:"error",theme:"dark",autoClose:600});
        dispatch({type:"LIKE_CLEAR"});
        
    }
    else if(!likeLoading &&!likeError && msg){
        
        toast(msg,{position:"top-center",type:"success",theme:"dark",autoClose:600});
        dispatch({type:"LIKE_CLEAR"});
    }
},[likeError,msg,likeLoading,dispatch]);


    useEffect(()=>{

        dispatch(getFollowingUsersPost());
        
        // dispatch
    },[dispatch]);
    const {posts,loading,error}=useSelector((state)=>state.followingUserPost);


    return(
        <>
    <section id="posts">
{
    loading? <Loader/> : (!error && posts && 
    (posts.length>0 ? <>
       {/* <Link to={"/upload/post"} style={{marginTop:"10px" ,position:"absolute" , right:"0",top:"100px"}}>
       <Button colorScheme="red">New Post</Button>
       </Link> */}
     
   {posts.map((post,ind)=> <Post key={ind}
        postId={post._id}
        userId={post?.owner?._id}
        name={post.owner.name} profileImg={post.owner.avatar.url} postImg={post.image.url} likes={post.likes} comments={post.comments} caption={post.caption}
        />
    
    )}
  
    </>
    
    : <div style={{transform:"translateY(40vh)",fontWeight:"bolder",fontSize:"2rem"}}>Follow  users to see more posts</div>
    )
    )
}


    </section>
 
       </>
        
    )
}
export default Feed; 




