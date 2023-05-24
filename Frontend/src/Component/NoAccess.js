import { Button } from '@chakra-ui/button'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function NoAccess() {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {user,loading,error,msg:Usermsg}=useSelector(state=>state.user)
  
  useEffect(()=>{
if(!loading && !error && !user){

 if(Usermsg){


    toast.success(Usermsg,{position:"top-center",theme:"dark",autoClose:400});
    if(Usermsg[0]==='L')
    dispatch({type:"LOGOUT_CLEAR"});
    else
    dispatch({type:"DELETE_ACCOUNT_CLEAR"});
 }
}
else if(error && user){
 alert("Try again");
}

 },[dispatch,error,user,loading,navigate,Usermsg]);



  return (
    <>
    <ToastContainer/>
     <h1
        style={{textAlign:"center",transform:"translateY(30vh)",fontSize:"2.5rem"}}
        > 👎<br /> Don`t have access to this page
        <br />
      <Link to="/login"> <Button color='red'>Login</Button></Link>
        </h1>
    </>
  )
}

export default NoAccess