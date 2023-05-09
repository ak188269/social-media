import React, { useEffect, useState } from 'react'
import "./UploadPost.css";
import { Textarea} from '@chakra-ui/react'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from './Actions/post';
import Loader from './Loader';
function UploadPost() {
  const navigate=useNavigate();
  const [postImage,setPostImage]=useState("");
  const [caption,setCaption]=useState("");
  const dispatch=useDispatch();

  const {loading,error,post}=useSelector(state=>state.createNewPost);

  useEffect(()=>{
    if(!loading && !error && post){
      toast("Post uploaded successfully",{position:"top-center",type:"success",theme:"dark",autoClose:600});
      dispatch({type:"CREATE_NEW_POST_CLEAR"});
      setTimeout(()=>{
        navigate("/");
       

      },1000)
    }
    else if(!loading && error && !post){
      toast(error,{position:"top-center",type:"error",theme:"dark",autoClose:600});
      dispatch({type:"CREATE_NEW_POST_CLEAR"});
    }
   
  },[dispatch,loading,error,post,navigate]);


    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!caption && !postImage){
          toast("Nothing to post",{position:"top-center",type:"info",theme:"dark",autoClose:600});
          return;
        }
     dispatch(createNewPost(caption,postImage));
      //  setTimeout(() => {
      //   navigate("/")
      //  }, 1000);
      
    }

const handleFile=(e)=>{
e.preventDefault();
let image=e.target?.files;
const reader = new FileReader();
reader.readAsDataURL(image[0]);
reader.onloadend = () => {
  setPostImage(reader.result);
};
}
const selectFile=(e)=>{
  e.preventDefault();
  document.getElementById("post-image").click();
}

  return (
   <>
       <ToastContainer />
{loading ? <Loader loadingMsg='Uploading ...'/> :
    <section id="upload-post">
    <form action="" onSubmit={handleSubmit} id="up-form">

 <Textarea placeholder='write caption here....' id='caption' _focusVisible={"none"} value={caption} onChange={(e)=>setCaption(e.target.value)}/>
 <AddPhotoAlternateIcon onClick={selectFile} w={"100px"} style={{margin:"10px 0px",cursor:"pointer",fontSize:"50px"}}/>
<input type="file" name="" id="post-image" onChange={handleFile}/>
{postImage && <img src={postImage} alt="" placeholder='hello'/>}
  <button  id="upload-btn" style={{marginTop:"20px"}}>Upload</button>
    </form>
    </section>
}

   </>
  )
}

export default UploadPost