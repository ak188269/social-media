import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editUserProfile, getProfile } from "./Actions/user";
import { ToastContainer, toast } from "react-toastify";
import AcountCircleIcon from "@mui/icons-material/AccountCircle"

import axios from "axios";
import { baseUrl } from "../index";
import { DeleteIcon } from "@chakra-ui/icons";
import Loader from "./Loader";
function EditProfile() {
    const [Name,setName] =useState("");
const [Email,setEmail] =useState("");
const [Image,setImage]=useState(null);
const dispatch=useDispatch();
const navigate=useNavigate();
const {id}=useParams();
  // ---- update handlers ----
  const {user:account}=useSelector((state)=>state.getProfile);
  const {user,loading}=useSelector(state=>state.user);

useEffect(()=>{
  if(user)
  dispatch(getProfile(id));
  const timeOut=setTimeout(()=>{

    // if(!loading)

  },600)
  return clearTimeout(timeOut);
},[user,dispatch,id]);
useEffect(()=>{
 
  if(Image==null)
    setImage(account?.avatar?.url);

},[account,Image]);


  const handleUpdate = async(e) => {
    e.preventDefault();
   dispatch(editUserProfile(Name,Email,Image))

  }

const { loading:editLoading,msg:editMsg,error:editError}=useSelector(state=>state.editUserProfile)

useEffect(()=>{
if(!editLoading && !editError && editMsg){
  toast.success(editMsg,{autoClose:600})
  dispatch({type:"EDIT_PROFILE_CLEAR"});
}
else if(editError && !editLoading){
  toast.error(editError,{autoClose:600})
  dispatch({type:"EDIT_PROFILE_CLEAR"});
}
},[editLoading,editMsg,editError,dispatch])
  const imagePreview =(e)=>{
    e.preventDefault();
    let image=e.target?.files;
    const reader = new FileReader();
    reader.readAsDataURL(image[0]);
    reader.onloadend = () => {
      setImage(reader.result);
    };

  }
  const chooseFile=(e)=>{
    e.preventDefault();
    document.getElementById("profile-photo").click();
    // alert(" selecte file is clicked");
  }
 
  useEffect(()=>{
    setTimeout(() => {
        if(loading===false && user===null){
            navigate("/");
                }
    }, 600);
  
  },[user,loading,navigate]);
const {loading:profileLoading,msg}=useSelector((state)=>state.editUserProfile  );
  useEffect(()=>{
    setTimeout(() => {
        if(profileLoading===false && msg){
            dispatch({type: "EDIT_PROFILE_CLEAR"});
            navigate("/profile/"+user._id);
                }
    }, 600);
  
  },[profileLoading,msg,dispatch,navigate,user?._id]);

  //  -------- deleting profile picture --------------------

  const handleProfilePicDelete=async() => {
    try{
    const api=`${baseUrl}/api/v1/user/delete/profilepic`;
    const config={
        withCredentials: true,
        headers: {
            "content-type": "application/json"
        }
    }
    const {data}=await axios.get(api, config);
    if(data.success){
      toast.success(data.msg,{autoClose:600,theme:"dark"});
      setTimeout(() => {
            navigate("/profile/"+user._id);
    }, 600);
    }
    else{
      toast.error(data.msg,{autoClose:600,theme:"dark"});
    }

  }
  catch(e){

    toast.error(e.message,{autoClose:600,theme:"dark"});
    
  }

  }
  return (
    <>
  
    <ToastContainer/>
     {  editLoading ?  <Loader loadingMsg="Updating ..."/> :
     <form id="update-form"  onSubmit={handleUpdate}>
        <div id="user-profile-pic">
          {/* <img src="user_logo.png"  alt="logo" /> */}
         {Image ? <Link to={Image}><img src={`${Image}`}alt="" /> </Link>: <AcountCircleIcon  style={{backgroundColor:"white" ,borderRadius:"60%",fontSize:`${80}px`}} /> }
          {/* <User fs={60}/> */}
         <span >
          <span style={{marginRight:"10px",
          padding:"5px 10px",
  borderRadius:"5px",         
          backgroundColor:"red"}} onClick={handleProfilePicDelete}>
         <DeleteIcon color={'white'} style={{}}/></span>
          <button id="profile-photo-btn" onClick={chooseFile} style={{}}>Choose</button>
         </span>
          <input type="file" name="" id="profile-photo" style={{display:"none"}} onChange={imagePreview}/>
        </div>
        <h3 id="update-heading">Edit your profile</h3>
        <p style={{color:"black"}}> <span style={{color:"red",fontSize:"15px",fontWeight:"bolder"}}>*</span> Only fill the filed you want to update</p>
        <h5 className="update-labels">
          Name
        </h5>
        <input
          type="text"
          id="name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />

        <h5 className="update-labels">Email id</h5>
        <input
          type="text"
          id="email"
          vlaue={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
       
        <br />
        <button className="main-items my-button" id="form-btn">
          Update
        </button>
      </form>
      }
    </>
  );
}

export default EditProfile;




