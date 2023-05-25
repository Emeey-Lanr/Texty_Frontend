import { createSlice } from "@reduxjs/toolkit";

import { UserProfile } from "../Interface/UserProfile"




const userProfileIntialState: UserProfile = {
    registerdUserIdentification: "",
    registeredUserImgUrl: "",
    userId: '0',
     notuserId:'0',
    username: "",
    about_me: "",
    img_url: "",
    background_img_url:"",
    followers: [],
    following: [],
    ifUserFollowing: [],
    ifUserFollowers:[],
    post: [],
    socketPost:[],
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
        },
        newUserPost: (state, action) => {
            if (state.value.registerdUserIdentification === state.value.username) {
                state.value.post = action.payload.reverse()
            }
            
        },
        // If is by user logged in 
        likesUserPost: (state, action) => {

                //   let v = state.value.find((details) => details.postedBy === action.payload.postedBy && details.time === action.payload.time)
                state.value.post.map((details) => {
                    if (details.postedBy === action.payload.postedBy && details.time === action.payload.time) {
                        details.likes = action.payload.likesBox
                    }
               
                })
         
            
        },
        commentProfileR: (state, action) => {
             state.value.post.map((details) => {
                    if (details.postedBy === action.payload.postedBy && details.time === action.payload.time) {
                        details.comment = action.payload.commentBox
                    }
               
                })
        }
       
    }

    
})


export const {
    collectUserProfile,
    followUser,
    getFollowedNotification,
    unfollowViaProfile,
    unfollowFollowingR,
    unfollowFollowingViaAnotherUserFFlistR,
    newUserPost,
    likesUserPost,
    commentProfileR
} = userProfileSlice.actions
export default userProfileSlice.reducer