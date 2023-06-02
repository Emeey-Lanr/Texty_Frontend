import { createSlice } from "@reduxjs/toolkit";

import { UserProfile } from "../Interface/UserProfile"




const userProfileIntialState: UserProfile = {
     blockedState:false,
      blockedNumber:0,
    registerdUserIdentification: "",
    registeredUserImgUrl: "",
    registeredUserBlocked:[],
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
    blocked:[],
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
        },
        blockAndUnBlockUserR: (state, action) => {
            state.value.registeredUserBlocked = action.payload
        },
        unBlockedVPR: (state, action) => {
            // we replace the former with the latter
            state.value.registeredUserBlocked = action.payload.userBlocked
            // we check if the profile is still the same with the user theywnat to unblock
            if (state.value.username === action.payload.userToBeUnBlocked) {
                console.log(1)
                // we check if the user still has you in his blocked list i.e the user searched for
                const searchIfUserIsBlocked = action.payload.userToBeUnBlockedBlocked.find((details:{username:string})=>details.username === state.value.registerdUserIdentification)
                // if that user does 
                if (searchIfUserIsBlocked) {
                    console.log(2)
                    // that using incoming blcoked will be replaced by the current on
                    state.value.blocked = action.payload.userToBeUnBlockedBlocked
                    // we set our blocked number identification to 3 and blocked state to true which means you are blocked
                    // by the person you wnat to unblock
                    state.value.blockedNumber = 3
                    state.value.blockedState = true
                } else if (state.value.registeredUserBlocked.find((details:{username:string})=>details.username === action.payload.userToBeUnBlocked)) {
                    state.value.blockedNumber = 2
                    state.value.blockedState = true
                    console.log(4)
                } else {
                    console.log(3)
                    // this the opposite of what is above which means
                    // you are not blocked by the person you've un blocked
                    state.value.blockedNumber = 1
                    state.value.blockedState = false
                }
            }
            
            
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
    commentProfileR,
    blockAndUnBlockUserR,
    unBlockedVPR
} = userProfileSlice.actions
export default userProfileSlice.reducer