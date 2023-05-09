import axios from "axios";
import { baseUrl } from "../../index";
axios.defaults.withCredentials=true;

export const login=(email,password,navigate)=>async (dispatch)=>{
    try{

    dispatch({type:"LOGIN_REQUEST"});

    const body={email,password};
    const config={
        withCredentials:true,
        headers:{"Content-Type":"application/json"}};
    const api=`${baseUrl}/api/v1/user/login`;
    const {data}= await axios.post(api,body,config);
if(data.success)
   { dispatch({type:"LOGIN_SUCCESS",payload:data.user});

        setTimeout(() => {
            
            navigate("/");
        }, 1000);}
        else {
            dispatch({type:"LOGIN_FAIL",payload:data.msg});
        }

        }
        catch(error){
            dispatch({type:"LOGIN_FAIL",payload:error.message});
        }
   
  }
export const register=(name,email,password,navigate)=>async (dispatch)=>{
    try{

    dispatch({type:"REGISTER_REQUEST"});

    const body={name,email,password};
    const config={
        withCredentials:true,
        headers:{"Content-Type":"application/json"}};
    const api=`${baseUrl}/api/v1/user/register`;
    const {data}= await axios.post(api,body,config);

    // setTimeout(() => {

       
    //     navigate("/");
    // }, 1000);
if(data.success){
    dispatch({type:"REGISTER_SUCCESS",payload:data.user});
}
else {
    dispatch({type:"REGISTER_FAIL",payload:data.msg});
}
        }
        catch(error){
            dispatch({type:"REGISTER_FAIL",payload:error.message});
        }
   
  }

//   -------- logout action ------------------

export const logout=()=>async (dispatch)=>{
    try{

    dispatch({type:"LOGOUT_REQUEST"});

    const config={withCredentials:true,headers:{"Content-Type":"application/json"}};
    const api=`${baseUrl}/api/v1/user/logout`;
    const {data}= await axios.get(api,config);
        if(data.success)
    dispatch({type:"LOGOUT_SUCCESS"});
    else {
        dispatch({type:"LOGOUT_FAIL",payload:data.msg});    }

        }
        catch(error){
            dispatch({type:"LOGOUT_FAIL",payload:error.message});
        }
   
  }

//   --------------- get profile handlers------------

export const getProfile = (id)=>async (dispatch)=>{
    try{

    // console.log("get profile is called");
    const config = {
        withCredentials:true,
      headers: {
        "Content-Type": "application/json",
      }
    };
    const api = `${baseUrl}/api/v1/user/profile/${id}`;
    const {data}= await axios.get(api,config);
    if(data.success)
    {
        dispatch({type:"GET_PROFILE_SUCCESS",payload:data.data});
        // console.log("data from proifle ",data);
    }
    else{
        dispatch({type:"GET_PROFILE_FAIL",payload:data});
    }
  }
  catch(err){
    dispatch({type:"GET_PROFILE_FAIL",payload:err.message});
  }
  }

//   --------------- get post of following users --------------------

export const getFollowingUsersPost = (id)=>async (dispatch)=>{
    try{
        dispatch({type:"GET_FOLLOWING_USERS_POST_REQUEST"});

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        withCredentials: true
        };
        const api = `${baseUrl}/api/v1/post/feedpost`;
        const {data}= await axios.get(api,config);
        if(data.success)
        {
            dispatch({type:"GET_FOLLOWING_USERS_POST_SUCCESS",payload:data.posts});
        }
        else{
            dispatch({type:"GET_FOLLOWING_USERS_POST_FAIL",payload:data});
        }
    }
    catch(err){
        dispatch({type:"GET_FOLLOWING_USERS_POST_FAIL",payload:err.message});
    }
}


// -------- delete user account-----------

export const deleteUserAccount=()=>async(dispatch)=>{
try{
dispatch({type:"DELETE_ACCOUNT_REQUEST"});
const api=`${baseUrl}/api/v1/user/delete/profile`;
const config={
    withCredentials:true,
    headers: {
        "content-type": "application/json"
    }
}
const {data}=await axios.get(api, config);
if(data.success){
    dispatch({type:"DELETE_ACCOUNT_SUCCESS",payload:data.msg});
}
else{
    dispatch({type:"DELETE_ACCOUNT_FAIL",payload:data.msg});
}
}
catch(err){
    dispatch({type:"DELETE_ACCOUNT_FAIL",payload:err.message});
}
}


// ------- change user password --------------------------------

export const changePassword =(oldPassword,newPassword)=>async(dispatch)=>{
    try{
        dispatch({type:"CHANGE_PASSWORD_REQUEST"});
        const api=`${baseUrl}/api/v1/user/udpate/password`;
        const config={
            withCredentials:true,
            headers: {
                "content-type": "application/json"
            }
        }
        const body={
            oldPassword,newPassword
        }
        const {data}=await axios.post(api,body, config);
        if(data.success){
            dispatch({type:"CHANGE_PASSWORD_SUCCESS",payload:data.msg});
        }
        else{
            dispatch({type:"CHANGE_PASSWORD_FAIL",payload:data.msg});
        }
    }
    catch(err){
        dispatch({type:"CHANGE_PASSWORD_FAIL",payload:err.message});
    }
}


// ------------- EDIT USER PROFILE --------------------------------

export const editUserProfile=(name,email,pic)=>async(dispatch)=>{

    try{
        dispatch({type:"EDIT_PROFILE_REQUEST"});
        const api=`${baseUrl}/api/v1/user/update/profile`;
        const config={
            withCredentials:true,
            headers: {
                "content-type": "application/json"
            }
        }
        const body={
            name,email,imageUrl:pic
        }
        const {data}=await axios.post(api,body, config);
        if(data.success){
            dispatch({type:"EDIT_PROFILE_SUCCESS",payload:data.msg});
        }
        else{
            dispatch({type:"EDIT_PROFILE_FAIL",payload:data.msg});
        }
    } 
    catch(err){
        dispatch({type:"EDIT_PROFILE_FAIL",payload:err.message});
    }
}