import "./Profile.css"
import User from "./User"
import AppsIcon from '@mui/icons-material/Apps';
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import { Link,  useParams} from "react-router-dom";
import { useEffect, useState} from "react";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Loader from "./Loader";
import { followUser, getProfile } from "./Actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal ,ModalBody,ModalCloseButton,ModalContent,ModalHeader, ModalOverlay,Drawer,DrawerBody,DrawerOverlay,DrawerCloseButton,DrawerContent,DrawerHeader} from "@chakra-ui/react";
import Settings from "./Settings";
import { ToastContainer, toast } from "react-toastify";
const Profile =()=>{
  const [OpenFollowingDialog,setOpenFollowingDialog]=useState(false);
    const [OpenFollowersDialog,setOpenFollowersDialog]=useState(false);
    const [openSettings,setOpenSettings]=useState(false);
const [followText,setFollowText]=useState("Follow");
    const {user:loggedInUser}=useSelector(state=>state.user)
  
    const {id}=useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(id)
    dispatch(getProfile(id));
    setOpenFollowersDialog(false);
    setOpenFollowingDialog(false);
  

  },[dispatch,id,loggedInUser])
  const {loading,user,error}=useSelector((state)=>state.getProfile)

  useEffect(()=>{
    setFollowText("Follow");
    user?.followers.forEach(follower => {
      if(follower._id===loggedInUser?._id){
        setFollowText("Unfollow");
      }
    });
  },[dispatch,user,error,loggedInUser?._id])
 
// --- following other user handler-------------

 const {loading:followLoading,error:followError,msg:followMsg}=useSelector((state)=>state.followUser);

 useEffect(()=>{
  if(!followError && !followLoading && followMsg){
    toast.success(followMsg,{position:"top-center",theme:"dark",autoClose:600});
    dispatch(getProfile(id));
  }
  else if(!followLoading && followError){
    toast.error(followMsg,{position:"top-center",theme:"dark",autoClose:600});
  }
  if(followMsg)
  dispatch({type:"FOLLOW_USER_CLEAR"});
 },[followError,followLoading,followMsg,dispatch,id])

//  handler for following someone------

const handleFollowUser=()=>{
dispatch(followUser(id));
}
 

  


    return (
      <>
      <ToastContainer/>
        {/* <div id="box"> */}
        {loading ? <Loader/> : error ?  (<div id="user-not-found" > <PersonOffIcon fontSize="3rem"/>  User does not exist</div>) : (user?.isActive===false  ) ?(<div id="user-not-found" > <PersonOffIcon fontSize="3rem"/>  Account is deleted</div>):
(<section id="user-profile">
<div id="cover-image">
</div>
<div id="up-box">
  <div id="user-stats" className="up-items">
<User direction={"column"} name={user?.name} image={user?.avatar?.url} id={id} fs={90}/>
{/* <span>Posts <br /> {user?.posts ? user.posts?.length : "N/A"} </span> */}
<div id="user-stats-2">
<span onClick={()=>setOpenFollowersDialog(true)}>Followers <br /> {user?.followers ? user?.followers?.length : "N/A"} </span>
<span onClick={()=>setOpenFollowingDialog(true)}>Followings <br /> {user?.following ? user?.following?.length : "N/A"}</span>
{loggedInUser?._id===id && <ManageAccountsIcon fontSize="large" style={{cursor:"pointer"}} onClick={()=>setOpenSettings(true)}/>}
</div>
  </div>
  <div id="user-bio" className="up-items">
  My name is {user?.name} . I love to spend time with myself and work upon my skills . Follow me for my latest post and message me if you wanna talk to me. I love making friends .
  </div>
 {loggedInUser && (loggedInUser?._id!==id) && ( <div id="user-follow-profile" className="up-items">
<Button  colorScheme="red"  size={"md"} onClick={handleFollowUser} >{followText}</Button>
<Button  colorScheme="green" size={"md"} onClick={()=>alert("comming soon...")}>Message</Button>
<Button  colorScheme="blue" size={"md"}>
<Link to={`mailto:${user?.email}`}>Email</Link>
</Button>

  </div>)
  }
  <div id="user-menu" className="up-items">
  <AppsIcon/>
  &nbsp;
  Your posts
  </div>
  <div id="up-posts">
    {
     ( user && user?.posts?.length>0 ) ? ( user.posts.map((post,ind)=>{
      return(
        <Link to={`/post/${post?._id}`} key={post?._id}>
        <img src={post.image?.url} alt="user post " />
        </Link>
      )
    }))
      : "No post till now..."
    }

 
  </div>
  </div>
</section>)}
{/* </div> */}

{/* modal  for showing following list */}

<Modal isOpen={OpenFollowingDialog} size={"md"} onClose={()=>setOpenFollowingDialog(false)} >
    <ModalOverlay/>
    <ModalContent>
        <ModalHeader color={"white"} bgColor={"blackAlpha.900"} padding={"8px"} fontSize={"large"}>
           Following 
        </ModalHeader>
<ModalCloseButton color={"white"}/>
    
    <ModalBody>
       {
        user?.following && user?.following.length>0 ? (user?.following.map((user,ind)=>{
            return(
                <User key={ind} direction={"row"}  id={user?._id} image={user?.avatar?.url} name={user?.name}  />
            )
        })) : "You have not followed anyone"
       }
    </ModalBody>
    </ModalContent>
   </Modal>

     {/* modal  for showing all the followers  */}

     <Modal isOpen={OpenFollowersDialog} size={"md"} onClose={()=>setOpenFollowersDialog(false)} >
    <ModalOverlay/>
    <ModalContent>
        <ModalHeader color={"white"} bgColor={"blackAlpha.900"} padding={"8px"} fontSize={"large"}>
           Followers 
        </ModalHeader>
<ModalCloseButton color={"white"}/>
    
    <ModalBody>
       {
        user?.followers && user?.followers.length>0 ? (user?.followers.map((user,ind)=>{
            return(
                <User key={ind} direction={"row"}  id={user?._id} image={user?.avatar?.url} name={user?.name}  />
            )
        })) : "No user is following you"
       }
    </ModalBody>
    </ModalContent>
   </Modal>
   
   {/* ---darawer for settings --------- */}

   <Drawer
   isOpen={openSettings}
   onClose={()=>setOpenSettings(false)}

  >
   <DrawerOverlay/>
  
    <DrawerContent>
    <DrawerHeader color={"white"} bgColor={"black"}>
      Settings
    </DrawerHeader>
    <DrawerCloseButton color={"white"} style={{borderColor:"white"}}/>
    <DrawerBody>
     <Settings id={id}/>
   </DrawerBody>
    </DrawerContent>
  </Drawer>
        </>
    )
}
export default Profile;