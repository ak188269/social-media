import { createReducer } from "@reduxjs/toolkit";

const postReducer=createReducer({},builder=>{
    builder.addCase("POST_REQUEST", (state)=>{
        return{
            posts:null,
            error:null,
            loading:true
        }
    })
    .addCase("POST_SUCCESS",(state,action)=>{
        return{
            loading:false,
            posts:action.payload,
            error:null
        }
    })
    .addCase("POST_FAIL",(state,action)=>{
        return{
            loading:false,
            error:action.payload,
            posts:null
        }
    })
})

// ---------create new post -----------

export const createNewPostReducer=createReducer({},builder=>{
    builder.addCase("CREATE_NEW_POST_REQUEST", (state)=>{
        return{
            post:null,
            error:null,
            loading:true
        }
    })
    .addCase("CREATE_NEW_POST_SUCCESS", (state,action)=>{
        return{
            loading:false,
            post:action.payload,
            error:null,
        }
    })
    .addCase("CREATE_NEW_POST_FAIL",(state,action)=>{
        return{
            loading:false,
            error:action.payload,
            post:null,
        }
    })
    .addCase("CREATE_NEW_POST_CLEAR", (state,action)=>{
        return{
            loading:null,
            error:null,
            post:null
        }
    })
})
//  ------------------ like dislike --------------------------------
export const likeReducer=createReducer({},builder=>{
    builder.addCase("LIKE_REQUEST", (state,action)=>{
        return {
            loading:true,
            error:null,
            msg:null,
        }
    })
    .addCase("LIKE_SUCCESS", (state,action)=>{
        return {
            loading:false,
            error:null,
            msg:action.payload
        }
    })
    .addCase("LIKE_FAIL",(state,action)=>{
        return {
            loading:false,
            error:action.payload,
            msg:null
        }
    })
   .addCase( "LIKE_CLEAR",(state,action)=>{
        return {
            loading:null,
            error:null,
            msg:null
        }
    })

})

// ----------comment on post reducer---------------

export const commentReducer=createReducer({},builder=>{
    builder.addCase("COMMENT_REQUEST",(state,action)=>{
        return {
            loading:true,
            error:null,
            msg:null,
        }
    })
    .addCase("COMMENT_SUCCESS", (state,action)=>{
        return {
            loading:false,
            error:null,
            msg:action.payload
        }
    })
    .addCase("COMMENT_FAIL",(state,action)=>{
        return {
            loading:false,
            error:action.payload,
            msg:null
        }
    })

})
export default postReducer;