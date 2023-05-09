import { createReducer } from "@reduxjs/toolkit";

const postReducer=createReducer({},{
    POST_REQUEST: (state)=>{
        return{
            posts:null,
            error:null,
            loading:true
        }
    },
    POST_SUCCESS: (state,action)=>{
        return{
            loading:false,
            posts:action.payload,
            error:null
        }
    },
    POST_FAIL: (state,action)=>{
        return{
            loading:false,
            error:action.payload,
            posts:null
        }
    }
})

// ---------create new post -----------

export const createNewPostReducer=createReducer({},{
    CREATE_NEW_POST_REQUEST: (state)=>{
        return{
            post:null,
            error:null,
            loading:true
        }
    },
    CREATE_NEW_POST_SUCCESS: (state,action)=>{
        return{
            loading:false,
            post:action.payload,
            error:null,
        }
    },
    CREATE_NEW_POST_FAIL: (state,action)=>{
        return{
            loading:false,
            error:action.payload,
            post:null,
        }
    },
    CREATE_NEW_POST_CLEAR: (state,action)=>{
        return{
            loading:null,
            error:null,
            post:null
        }
    }
})
//  ------------------ like dislike --------------------------------
export const likeReducer=createReducer({},{
    LIKE_REQUEST: (state,action)=>{
        return {
            loading:true,
            error:null,
            msg:null,
        }
    },
    LIKE_SUCCESS: (state,action)=>{
        return {
            loading:false,
            error:null,
            msg:action.payload
        }
    },
    LIKE_FAIL:(state,action)=>{
        return {
            loading:false,
            error:action.payload,
            msg:null
        }
    }

})

// ----------comment on post reducer---------------

export const commentReducer=createReducer({},{
    COMMENT_REQUEST: (state,action)=>{
        return {
            loading:true,
            error:null,
            msg:null,
        }
    },
    COMMENT_SUCCESS: (state,action)=>{
        return {
            loading:false,
            error:null,
            msg:action.payload
        }
    },
    COMMENT_FAIL:(state,action)=>{
        return {
            loading:false,
            error:action.payload,
            msg:null
        }
    }

})
export default postReducer;