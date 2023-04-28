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
    notification:[],
    isLoggedIn:false
    
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

    

        // followerUser: (state, action) => {
        //     switch (state.value.registerdUserIdentification) {
        //         case "": {
        //             return check(action.payload, action.payload, state.value.registerdUserIdentification, state.value.username)
        //             // action.payload.navigate
        //         };
        //         default: {
        //             return action.payload
        //         }
        //     }
        // }
    }
})


export const  {collectUserProfile, }  = userProfileSlice.actions
export default userProfileSlice.reducer