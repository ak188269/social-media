import "./Profile.css"
import User from "./User"
import AppsIcon from '@mui/icons-material/Apps';
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import { Link,  useParams} from "react-router-dom";
import { useEffect, useState} from "react";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Loader from "./Loader";
import { getProfile } from "./Actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal ,ModalBody,ModalCloseButton,ModalContent,ModalHeader, ModalOverlay,Drawer,DrawerBody,DrawerOverlay,DrawerCloseButton,DrawerContent,DrawerHeader} from "@chakra-ui/react";
import Settings from "./Settings";
const Profile =()=>{

  // const [FollowingArray,setFollowingArray]=useState([]);
  // const [FollowersArray,setFollowersArray]=useState([]);
  const [OpenFollowingDialog,setOpenFollowingDialog]=useState(false);
    const [OpenFollowersDialog,setOpenFollowersDialog]=useState(false);
    const [openSettings,setOpenSettings]=useState(false);

  const {id}=useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProfile(id));
    setOpenFollowersDialog(false);
    setOpenFollowingDialog(false);
  },[dispatch,id])
  const {loading,user,error}=useSelector((state)=>state.getProfile)

  const {user:loggedInUser}=useSelector(state=>state.user)
    return (
      <>
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
  My name is Ghost I am a ghost roaming on earth and my work is to save from bad ghosts present on earth who torture peoople living here on earth .
  </div>
 {user && ( <div id="user-follow-profile" className="up-items">
<Button  colorScheme="red"  size={"md"}>Follow</Button>
<Button  colorScheme="green" size={"md"}>Message</Button>
<Button  colorScheme="blue" size={"md"}>Email</Button>

  </div>)
  }
  <div id="user-menu" className="up-items">
  <AppsIcon/>
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
        <ModalHeader color={"white"} >
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
        <ModalHeader color={"white"} >
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
    <DrawerHeader color={"white"}>
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