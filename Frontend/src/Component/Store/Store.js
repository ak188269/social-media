import {configureStore} from "@reduxjs/toolkit"
import userReducer, { changePasswordReducer, editUserProfileReducer, followUserReducer, getFollowingUsersPostReducer, getUserProfile, searchUserReducer } from "../Reducer/userReducer";

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
    followUser:followUserReducer,
    searchUser:searchUserReducer
}})
// store.subscribe(()=>console.log(store.getState()));
export default store;
