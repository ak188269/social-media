import React, { useEffect } from 'react'
import "./Navbar.css";
import {NavLink,Link, useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LogoutIcon from '@mui/icons-material/Logout';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './Actions/user';

function Navbar() {
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

     <header>
        <div id="logo" className="items" onClick={()=>navigate("/")}>
          <img src="./spam-logo.png" alt="" />
          </div>
        <nav className="items" id={navId}>
          <NavLink to="/"   className='link' title='Home'> <HomeIcon className='nav-icons'/></NavLink>

          <NavLink to="/people"   className='link' title='About'><PeopleAltIcon className='nav-icons'/></NavLink>

          <NavLink to={"/login"}   className='link' title={user? "Logout":"Login"}>{user ? <LogoutIcon onClick={handleLogOut} className='nav-icons'/> :<LoginIcon className='nav-icons'/>}</NavLink>
          <NavLink to={`/profile/${user?._id}` }   className='link' title='Profile'><AccountCircleIcon className='nav-icons'/></NavLink>
          <NavLink to="/chats"  className='link' title='Message'><ChatBubbleIcon className='nav-icons'/></NavLink>

          {/* <NavLink to="#" className={"link"}>
          <Search2Icon className='nav-icons'/>
        </NavLink> */}
        </nav>

      
       {user &&  (<div className="items" title='New post' >
         <Link to="/upload/post" id="btn-area"> 
         <button className="new-post-btn" >    <AddPhotoAlternateIcon id='new-post-icon'/>
          </button>
         
         </Link>
       

        </div>)}
      </header>
   </>
  )
}

export default Navbar