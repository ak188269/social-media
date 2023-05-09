import {configureStore} from "@reduxjs/toolkit"
import userReducer, { changePasswordReducer, editUserProfileReducer, getFollowingUsersPostReducer, getUserProfile } from "../Reducer/userReducer";
import {counter} from "../Reducer/userReducer";
import postReducer, { commentReducer, createNewPostReducer, likeReducer } from "../Reducer/postReducer";
const store=configureStore({reducer:{
    user:userReducer,
    post:postReducer,
    followingUserPost:getFollowingUsersPostReducer,
    getProfile:getUserProfile,
    like:likeReducer,
    comment:commentReducer,
    changePassword:changePasswordReducer,
    editUserProfile:editUserProfileReducer,
    createNewPost:createNewPostReducer,
    counter:counter
}})
// store.subscribe(()=>console.log(store.getState()));
export default store;
