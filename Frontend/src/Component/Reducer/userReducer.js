import {createReducer} from "@reduxjs/toolkit"

const userReducer =createReducer({},{
LOGIN_REQUEST:(state,action)=>{
    return {
        user:null,
        error:null,
        loading:true
    }
},
LOGIN_SUCCESS:(state,action)=>{
    return {
        user:action.payload,
        loading:false,
        error:null,
        msg:"Logged in  successfully"
    }
},

LOGIN_FAIL:(state,action)=>{
    return {
        user:null,
       error:action.payload,
        loading:false,
   }
},
LOGIN_CLEAR:(state,action)=>{
    return {
        ...state,
       error:null,
        loading:false,
msg:null
   }
},

// ---------registered handlers--------------
REGISTER_REQUEST:(state,action)=>{
    return {
        error:null,
        loading:true
    }
},
REGISTER_SUCCESS:(state,action)=>{
    return {
        ...state,
        error:null,
        user:action.payload,
        loading:false
    }
},

REGISTER_FAIL:(state,action)=>{
    return {
       error:action.payload,
        loading:false
    }
},

// ----------logout ----------------------------------------
LOGOUT_REQUEST:(state,action)=>{
    return{
        error:null,
        loading:true
    }
},

LOGOUT_SUCCESS:(state,action)=>{
    return{
user:null,
        error:null,
        loading:false,
        msg:"Log out Successfully" 

    }
},

LOGOUT_FAIL:(state,action)=>{
    return{
        ...state,
        error:action.payload,
        loading:false
    }
},
LOGOUT_CLEAR:(state,action)=>{
    return{
        user:null,
        error:null,
        loading:false,
        msg:null
    }
},
// ----------delete acccount ----------------------------------------
DELETE_ACCOUNT_REQUEST:(state,action)=>{
    return{
        ...state,
        error:null,
        loading:true
    }
},

DELETE_ACCOUNT_SUCCESS:(state,action)=>{
    return{
user:null,
        error:null,
        loading:false
    }
},

DELETE_ACCOUNT_FAIL:(state,action)=>{
    return{
       ...state,
        error:action.payload,
        loading:false
    }
},


})

// -------------- getting any user profile through params --------------

export const getUserProfile=createReducer({},{
    // -----get user profile-----------

GET_PROFILE_REQUEST:(state,action)=>{
    return{
        user:null,
        error:null,
        loading:true
    }
},

GET_PROFILE_SUCCESS:(state,action)=>{
    return{
        user:action.payload,
        loading:false,
        error:null
    }
},

GET_PROFILE_FAIL:(state,action)=>{
    return{
        user:null,
        error:action.payload,
        loading:false
    }
}

})
const value=0;
export const counter =createReducer(value,{
    INC:(state)=>state+1
})

export const getFollowingUsersPostReducer=createReducer({},{
    GET_FOLLOWING_USERS_POST_REQUEST:(state,action)=>{
        return {
            loading:true,
            error:null
        }
    },
    GET_FOLLOWING_USERS_POST_SUCCESS:(state,action)=>{
        return {
            posts:action.payload,
            loading:false,
            error:null
        }
    }
,
    GET_FOLLOWING_USERS_POST_FAIL:(state,action)=>{
        return {
            error:action.payload,
            loading:false,
        }
    }
    ,
    GET_FOLLOWING_USERS_POST_RESET:(state,action)=>{
        return {
            posts:false,
            loading:false,
            error:null
        }
    }
})

// ----change password reducer --------------------

export const changePasswordReducer = createReducer({},{
    CHANGE_PASSWORD_REQUEST:(state,action)=>{
        return{
            error:null,
            loading:true
        }
    },
    
    CHANGE_PASSWORD_SUCCESS:(state,action)=>{
        return{
            error:null,
            loading:false,
            msg:action.payload
        }
    },
    
    CHANGE_PASSWORD_FAIL:(state,action)=>{
        return{
            ...state,
            error:action.payload,
            loading:false
        }
    },
    CHANGE_PASSWORD_CLEAR:(state,action)=>{
        return{
loading:null,
error:null,
msg:null
        }
    }
})

// -------- update/edit user profile --------------------

export const editUserProfileReducer = createReducer({},{
    EDIT_PROFILE_REQUEST:(state,action)=>{
        return{
            error:null,
            loading:true
        }
    },
    
    EDIT_PROFILE_SUCCESS:(state,action)=>{
        return{
            error:null,
            loading:false,
            msg:action.payload
        }
    },
    
    EDIT_PROFILE_FAIL:(state,action)=>{
        return{
            ...state,
            error:action.payload,
            loading:false
        }
    },
    EDIT_PROFILE_CLEAR:(state,action)=>{
        return{
        loading:null,
        error:null,
        msg:null
        }
    }
})
export default userReducer