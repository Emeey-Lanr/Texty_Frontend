import { createSlice } from "@reduxjs/toolkit";

import { UserProfile } from "../Interface/UserProfile"
import { useNavigate } from "react-router-dom";
import { useContext } from "react"
import { appContext } from "../App";
import axios from "axios";
// const {userEndPoint} = useContext(appContext)
// let navigate = useNavigate()

const userProfileIntialState: UserProfile = {
    registerdUserIdentification:"",
    id:0,
    username: "",
    about_me: "",
    img_url:"",
    followers: [],
    following: [],
    ifUserFollowing: [],
    ifUserFollowers:[],
    post: [],
    homePost: [],
    isLoggedIn: false,
    loggedInUserNotification:[]
    
} 

const follwerUserData = {
    ownerUsername: "",
    userTheyTryingToFollow:""
}
// const check = (userEndPoint:string, refresh:()=>void,ownerUsername:string, userTheyTryingToFollow:string) => {
//     axios.post(`${userEndPoint}/followUser`, {ownerUsername:ownerUsername, userTheyTryingToFollow}).then((result) => {
//         if (result.data.status) {
//             refresh()
//         } else {
            
//         }
//     })
// }

export const userProfileSlice = createSlice({
    name: "userprofileslice",
    initialState: { value: userProfileIntialState, },
    reducers: {
        collectUserProfile: (state, action) => {
            state.value = action.payload
        },
        followUser: (state, action) => {
            state.value.followers = action.payload
        },
        getFollowedNotification: (state, action) => {
            state.value.loggedInUserNotification = action.payload

        },
        
        // unfollow via profile
        unfollowViaProfile: (state, action) => {
            state.value.followers = action.payload
        },
        // This works unfollowing and following reducers works when user is logged in
        unfollowFollowingR: (state, action) => {
            state.value.following = action.payload
        },
        unfollowFollowingViaAnotherUserFFlistR: (state, action) => {
            state.value.ifUserFollowing = action.payload
        }

    }
})


export const {
    collectUserProfile,
    followUser,
    getFollowedNotification,
    unfollowViaProfile,
    unfollowFollowingR,
    unfollowFollowingViaAnotherUserFFlistR
} = userProfileSlice.actions
export default userProfileSlice.reducer