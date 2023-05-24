import React, { useEffect } from 'react'
import "./Navbar.css";
import {NavLink,Link, useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

import LoginIcon from '@mui/icons-material/Login';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from './Actions/user';
import { Avatar ,Button} from '@chakra-ui/react';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
function Navbar() {
  const notification=10;
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogOut=async ()=>{
  dispatch(logout());
  }
  const {user,loading,error}=useSelector((state)=>state.user);
useEffect(()=>{

},[user,error,loading]);
let navId='navId';
if(user)
navId="noId";



  return (
   <>
     {/* --------- and navbar starts here--------- */}

     <header id='myheader'>
        <div id="logo" className="items" onClick={()=>navigate("/")}>
          <img src="./spam-logo.png" alt="" />
          </div>
        <nav className="items" id={navId}>
          <NavLink to="/"   className='link' title='Home'> <HomeIcon className='nav-icons'/></NavLink>

          <NavLink to="/people"   className='link' title='About'>
          <PersonSearchIcon />
          </NavLink>

          <NavLink to="/chats"  className='link' title='Message'><ChatBubbleIcon className='nav-icons'/></NavLink>

    <NavLink to="/notification"  className='link' title='Message' style={{position:"relative"}}>

<NotificationsIcon className='nav-icons'/>
<span id="notification-badge">{notification>0 && notification}</span>
    </NavLink>
       
 
        </nav>

      
       {!user ? <Link  to={"/login"}className='items login-area'><Button colorScheme='red' size={"sm"} width={"50px"} fontSize={"10px"} marginLeft={"10px"}>Login</Button></Link> :  (<div className="items"  id='navbar-third-section'>
         <Link to="/upload/post" id="new-post" title='New post'> 
         {/* <button className="new-post-btn" >   */}
          <AddPhotoAlternateIcon id='new-post-icon'/>
          {/* </button> */}
         
         </Link>
         <div id="profile-of-user">
        <Link to={`/profile/${user?._id}`}>
        <Avatar name={user?.name} src={user?.avatar?.url} size={"sm"}
        id="avatar"
         />
         </Link> 
        

         </div>
         <NavLink to={"/login"}   className='link' title={user? "Logout":"Login"}>{user ?  <PowerSettingsNewIcon onClick={handleLogOut} className='nav-icons'/> :<LoginIcon className='nav-icons'/>}</NavLink>
       


        </div>)}
      </header>
   </>
  )
}

export default Navbar