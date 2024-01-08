import Post from "./Post";
import "./Feed.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingUsersPost } from "./Actions/user";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { Button } from "@chakra-ui/button";
import User from "./User";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
const Feed=()=>{
   const dispatch =useDispatch();
   const {loading:likeLoading,msg,error:likeError}=useSelector((state)=>state.like);
   const {user} = useSelector((state)=>state.user);
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
    
    <div className="feed-container">

        <div id="feed-left-section">

        <User direction={"row"} id={user?._id} name={user?.name } fs={40} image={user?.avatar?.url}/>

        <div style={{display:"flex",gap : "6px",alignItems:"center", color:"rgb(39, 109, 222)"}}>
        <HomeIcon/>
        <a href={`/`} >
            Home   
            </a>
        </div>
        <div style={{display:"flex",gap : "6px",alignItems:"center"}}>
        <PeopleAltIcon/>
        <a href={`/profile/${user?._id}`} >
            Followers   
            </a>
        </div>
        
        <div style={{display:"flex",gap : "6px",alignItems:"center"}}>
        <PeopleIcon/>
        <a href={`/profile/${user?._id}`} >
            Followings   
            </a>
        </div>

        <div style={{display:"flex",gap : "6px",alignItems:"center"}}>
        <DashboardIcon/>
        <a href={`/profile/${user?._id}`} >
         Your Posts   
            </a>
        </div>

        <div style={{display:"flex",gap : "6px",alignItems:"center"}}>
        <ArticleIcon/>
        <a href={`#`} >
            Pages   
            </a>
        </div>
        <div style={{display:"flex",gap : "6px",alignItems:"center"}}>
        <OndemandVideoIcon/>
        <a href={`#`} >
            Videos   
            </a>
        </div>
        <div style={{display:"flex",gap : "6px",alignItems:"center"}}>
        <GroupsIcon/>
        <a href={`#`} >
            Groups   
            </a>
        </div>
        <div style={{display:"flex",gap : "6px",alignItems:"center"}}>
        <CalendarMonthIcon/>
        <a href={`#`} >
            Events   
            </a>
        </div>

         <a href={"/upload/post"} style={{marginTop:"10px"}}>
                       <Button colorScheme="blue">New Post</Button>
                       </a>


{/* ----ending---------- */}
        </div>



        <div>
            {loading ? <Loader/> : 
                (!error && posts && 
                    (posts.length>0 ? <>
                       {/* <a href={"/upload/post"} style={{marginTop:"10px" ,position:"absolute" , right:"0",top:"100px"}}>
                       <Button colorScheme="red">New Post</Button>
                       </a> */}
                     
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
        </div>
        <div id="feed-right-section">
            <h1 style={{fontWeight:"600",fontSize:"1.1rem" ,borderBottom:"1px solid black", padding:"5px" , width:"max-content"}}>People you follow</h1>
            {
                user.following.map((people)=>{
                   return (
                    <User direction={"row"} id={people?._id} name={people?.name } fs={40} image={people?.avatar?.url} key={people?._id}/>
                   )
                })
            }
            <a href="/people" style={{color:"blue",cursor:"pointer",marginTop:'10px'}}>Search for more friends</a>
        </div>
    </div>
}


    </section>
 
       </>
        
    )
}
export default Feed; 




