import {createReducer} from "@reduxjs/toolkit"

const userReducer =createReducer({},(builder)=>{
builder.addCase("LOGIN_REQUEST",(state,action)=>{
    return {
        user:null,
        error:null,
        loading:true
    }
})
.addCase("LOGIN_SUCCESS",(state,action)=>{
    return {
        user:action.payload,
        loading:false,
        error:null,
        msg:"Logged in  successfully"
    }
})

.addCase("LOGIN_FAIL",(state,action)=>{
    return {
        user:null,
       error:action.payload,
        loading:false,
   }
})
.addCase("LOGIN_CLEAR",(state,action)=>{
    return {
        ...state,
       error:null,
        loading:false,
msg:null
   }
})

// ---------registered handlers--------------
.addCase("REGISTER_REQUEST",(state,action)=>{
    return {
        error:null,
        loading:true
    }
})
.addCase("REGISTER_SUCCESS",(state,action)=>{
    return {
        ...state,
        error:null,
        user:action.payload,
        loading:false,
        msg:"Registered successfully"

    }
})
.addCase("REGISTER_FAIL",(state,action)=>{
    return {
       error:action.payload,
        loading:false,
    }
})
.addCase("REGISTER_CLEAR",(state,action)=>{
return{
loading:false,
error:null,
user:state.user,
msg:null
}
})

// ----------logout ----------------------------------------
.addCase("LOGOUT_REQUEST",(state,action)=>{
    return{
        error:null,
        loading:true
    }
})

.addCase("LOGOUT_SUCCESS",(state,action)=>{
    return{
user:null,
        error:null,
        loading:false,
        msg:"Log out Successfully" 

    }
})

.addCase("LOGOUT_FAIL",(state,action)=>{
    return{
        ...state,
        error:action.payload,
        loading:false
    }
})
.addCase("LOGOUT_CLEAR",(state,action)=>{
    return{
        user:null,
        error:null,
        loading:false,
        msg:null
    }
})
// ----------delete acccount ----------------------------------------
.addCase("DELETE_ACCOUNT_REQUEST",(state,action)=>{
    return{
        ...state,
        error:null,
        loading:true
    }
})
.addCase("DELETE_ACCOUNT_SUCCESS",(state,action)=>{
    return{
user:null,
        error:null,
        loading:false,
        msg:"Account deleted successfully"
    }
})
.addCase("DELETE_ACCOUNT_FAIL",(state,action)=>{
    return{
       ...state,
        error:action.payload,
        loading:false
    }
})
.addCase("DELETE_ACCOUNT_CLEAR",(state,action)=>{
    return{
     
    }
})

})

// -------------- getting any user profile through params --------------

export const getUserProfile=createReducer({},(builder)=>{
    // -----get user profile-----------

builder.addCase("GET_PROFILE_REQUEST",(state,action)=>{
    return{
        user:null,
        error:null,
        loading:true
    }
})

.addCase("GET_PROFILE_SUCCESS",(state,action)=>{
    return{
        user:action.payload,
        loading:false,
        error:null
    }
})

.addCase("GET_PROFILE_FAIL",(state,action)=>{
    return{
        user:null,
        error:action.payload,
        loading:false
    }
}
)
})

export const getFollowingUsersPostReducer=createReducer({},builder=>{
    builder.addCase("GET_FOLLOWING_USERS_POST_REQUEST",(state,action)=>{
        return {
            loading:true,
            error:null
        }
    })
    .addCase("GET_FOLLOWING_USERS_POST_SUCCESS",(state,action)=>{
        return {
            posts:action.payload,
            loading:false,
            error:null
        }
    }
    )
    .addCase("GET_FOLLOWING_USERS_POST_FAIL",(state,action)=>{
        return {
            error:action.payload,
            loading:false,
        }
    }
    )
    .addCase("GET_FOLLOWING_USERS_POST_RESET",(state,action)=>{
        return {
            posts:false,
            loading:false,
            error:null
        }
    })
})

// ----change password reducer --------------------

export const changePasswordReducer = createReducer({},builder=>{
    builder.addCase("CHANGE_PASSWORD_REQUEST",(state,action)=>{
        return{
            error:null,
            loading:true
        }
    })
    .addCase("CHANGE_PASSWORD_SUCCESS",(state,action)=>{
        return{
            error:null,
            loading:false,
            msg:action.payload
        }
    })
    .addCase("CHANGE_PASSWORD_FAIL",(state,action)=>{
        return{
            ...state,
            error:action.payload,
            loading:false
        }
    })
    .addCase("CHANGE_PASSWORD_CLEAR",(state,action)=>{
        return{
loading:null,
error:null,
msg:null
        }
    })
})

// -------- update/edit user profile --------------------

export const editUserProfileReducer = createReducer({},builder=>{
    builder.addCase("EDIT_PROFILE_REQUEST",(state,action)=>{
        return{
            error:null,
            loading:true
        }
    })
    .addCase("EDIT_PROFILE_SUCCESS",(state,action)=>{
        return{
            error:null,
            loading:false,
            msg:action.payload
        }
    })
    .addCase("EDIT_PROFILE_FAIL",(state,action)=>{
        return{
            ...state,
            error:action.payload,
            loading:false
        }
    })
    .addCase("EDIT_PROFILE_CLEAR",(state,action)=>{
        return{
        loading:null,
        error:null,
        msg:null
        }
    })
})

export const followUserReducer=createReducer({},builder=>{
    builder.addCase("FOLLOW_USER_REQUEST",(state,action)=>{
        return{
loading:true,
error:null,
msg:null
        }
    })
    .addCase("FOLLOW_USER_SUCCESS",(state,action)=>{
        return{
loading:false,
error:null,
msg:action.payload
        }
    })
    .addCase("FOLLOW_USER_FAIL",(state,action)=>{
        return{
loading:false,
error:action.payload,
msg:null

        }
    })
    .addCase("FOLLOW_USER_CLEAR",(state,action)=>{
        return{
            loading:false,
            error:null,
            msg:null
            
        }
    })
})


//  search for other users ----------
export const  searchUserReducer=createReducer({},(builder)=>{
builder.addCase("SEARCH_REQUEST",(state,action)=>{
    return{
        loading:true
    }
})
.addCase("SEARCH_SUCCESS",(state,action)=>{
    return{
loading:false,
people:action.payload
    }
})
.addCase("SEARCH_FAIL",(state,action)=>{
    return{
loading:false,
people:null,
error:action.payload
    }
})
.addCase("SEARCH_CLEAR",(state,action)=>{
    return{
loading:null,
people:null,
error:null
    }
})

})

export default userReducer