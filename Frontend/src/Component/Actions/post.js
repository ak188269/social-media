import axios from "axios";
import { baseUrl } from "../../index";
export const getPost= (id)=>async(dispatch)=>{
    try{
        dispatch({type:"POST_REQUEST"});
    const api=`${baseUrl}/api/v1/post/get/${id}`;
    const config={
        withCredentials:true,
        headers: {'Content-Type': 'application/json'},}
    const {data}=await axios.get(api,config);
dispatch({type:"POST_SUCCESS",payload:data.post});
    }
    catch(err){
dispatch({type:"POST_FAIL",payload:err.message})   ;
}
}

// --------- create new post ----------------

export const createNewPost=(caption,postImage)=>async (dispatch)=>{
    try{
        dispatch({type:"CREATE_NEW_POST_REQUEST"});
    const api=`${baseUrl}/api/v1/post/upload`;
    const config={
        withCredentials:true,
        headers: {'Content-Type': 'application/json'},}
    const body={
        caption,image:postImage
    }
    const {data}=await axios.post(api,
        body,config);
    if(data.success)
dispatch({type:"CREATE_NEW_POST_SUCCESS",payload:data.post});
else {
    dispatch({type:"CREATE_NEW_POST_FAIL",payload:data.msg})   ;

}
    }
    catch(err){
dispatch({type:"CREATE_NEW_POST_FAIL",payload:err.message})   ;
}

}


// ------------- like displie the post ----------------

export const likePost= (id)=>async(dispatch)=>{
    try{
        dispatch({type:"LIKE_REQUEST"});
    const api=`${baseUrl}/api/v1/post/like/${id}`;
    const config={
        withCredentials:true,
        headers: {'Content-Type': 'application/json'},}
    const {data}=await axios.get(api,config);
    if(data.success)
dispatch({type:"LIKE_SUCCESS",payload:data.msg});
else {
    dispatch({type:"LIKE_FAIL",payload:data.msg})   ;

}
    }
    catch(err){
dispatch({type:"LIKE_FAIL",payload:err.message})   ;
}

}

// -------------- comment on post ----------------

export const commentOnPost= (id,comment)=>async(dispatch)=>{
    try{

        dispatch({type:"COMMENT_REQUEST"});
    const api=`${baseUrl}/api/v1/post/comment/${id}`;
    const config={
        withCredentials:true,
        headers: {'Content-Type': 'application/json'},}
    const body={comment};
    const {data}=await axios.post(api,body,config);
    if(data.success)
dispatch({type:"COMMENT_SUCCESS",payload:data.msg});
else {
    dispatch({type:"COMMENT_FAIL",payload:data.msg})   ;

}
    }
    catch(err){
dispatch({type:"COMMENT_FAIL",payload:err.message})   ;
}

}