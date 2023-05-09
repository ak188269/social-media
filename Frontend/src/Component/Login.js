import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register } from './Actions/user';
import { ToastContainer, toast } from 'react-toastify';
function Login() {
const dispatch=useDispatch();
const navigate=useNavigate();
const [Name,setName] =useState("");
const [Email,setEmail] =useState("");
const [Password,setPassword] =useState("");
const {user,error,loading,msg} = useSelector((state)=>state.user);
useEffect(()=>{
  if(!loading && !error && user && msg) 
 { toast(msg,{type:"success",position:"top-center",autoClose:600});
 dispatch({type:"LOGIN_CLEAR"});
setTimeout(()=>{
  navigate("/");
},600);
}

  else if(!loading && error && error!=="Not logged in")
  toast(error,{type:"error",position:"top-center",autoClose:600});
 

  else if(!loading && !error && user==null && msg)
 { toast(msg,{type:"info",position:"top-center",autoClose:600});
dispatch({type:"LOGOUT_CLEAR"});
}

},[loading,error,user,msg,dispatch,navigate]);
  const handleLogin=(e)=>{
    e.preventDefault();
    let btn=document.getElementById("form-btn");
    
    if(btn.innerText.toString()==="Login"){
      dispatch(login(Email,Password,navigate));

    }
    else {
 dispatch(register(Name,Email,Password,navigate));
    }
  
  }
  const openRegister=()=>{
    let name=document.getElementById("name");
    let user=document.getElementById("user-login");
    let name_label=document.getElementById("name-label");
    let btn=document.getElementById("form-btn");
    let signin_msg=document.getElementById("signin-msg");
    let register_msg=document.getElementById("register-msg");
name.style.display="block";
name_label.style.display="block";
register_msg.style.display="none";
signin_msg.style.display="block";
btn.innerText="Sign Up";
// user.style.transform="none";
user.style.transform="rotateY(360deg)";
  }
  const openSignin=()=>{
    let name=document.getElementById("name");
    let name_label=document.getElementById("name-label");
    let user=document.getElementById("user-login");
    let btn=document.getElementById("form-btn");
    let signin_msg=document.getElementById("signin-msg");
    let register_msg=document.getElementById("register-msg");
    name.style.display="none";
    name_label.style.display="none";
    register_msg.style.display="block";
    signin_msg.style.display="none";
    btn.innerText="Login";
    user.style.transform="none";

    // user.style.transform="rotateY(360deg)";

  }
  return (
    <>
    <ToastContainer/>
    <div id="login-system">
      <section id="side-image"><img src="login-bg.png" alt="" /></section>
    <section id="user">
      <form id="user-login" onSubmit={handleLogin}>
      <div className="main-items user-logo"><img src="user_logo.png" id="user_logo" alt="" />
       </div>
     <h3 id='login-heading'>Start Your journey</h3>
      <h5 id='name-label' style={{display:"none"}}>Name</h5>
      <input type="text" id="name" value={Name} style={{display:"none"}} onChange={(e)=>setName(e.target.value)}/>
    
      <h5>Email id</h5>
      <input type="text"  id='email' vlaue={Email} onChange={(e)=>setEmail(e.target.value)}/>
      <h5>Password</h5>
      <input type="password" name="" value={Password} id="password" onChange={(e)=>setPassword(e.target.value)}/>
      <br />
      <button className='main-items my-button' id='form-btn'>Login</button>
      <p id='register-msg' style={{color
      :"blue", textDecoration:"underline",cursor:"pointer",textAlign:"center"}} onClick={openRegister}>Don`t have account ? Create account</p>
      <p id='signin-msg' style={{color
      :"blue", textDecoration:"underline",cursor:"pointer",textAlign:"center",display:"none"}} onClick={openSignin}>Already have an account ? Sign in</p>
      </form>
    </section>
    </div>

    </>
  )
}

export default Login
