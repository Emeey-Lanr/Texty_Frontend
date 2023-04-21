import { createSlice } from "@reduxjs/toolkit";

import {UserProfile} from "../Interface/UserProfile"
const userProfileIntialState: UserProfile = {
    registerdUserIdentification:"",
    id:0,
    username: "",
    about_me: "",
    img_url:"",
    followers: [],
    following: [],
    checkBothFollowing: [],
    checkBothFollwers:[],
    post: [],
    isLoggedIn:false
    
} 


export const userProfileSlice = createSlice({
    name: "userprofileslice",
    initialState: { value: userProfileIntialState, },
    reducers: {
        collectUserProfile: (state, action) => {
            state.value = action.payload
        }
    }
})


export const  {collectUserProfile}  = userProfileSlice.actions
export default userProfileSlice.reducer