import { createSlice } from "@reduxjs/toolkit";


export interface POST {
  text: string;
  img_url: string;
  postedBy: string;
  comment: [];
  likes: string[];
    poster_imgUrl?: string;
      time: number 
    }

const post:POST[] = []

export const homePostSlice = createSlice({
    name: "homePostSlice",
    initialState: { value: post },
    reducers: {
        socketHomePost: (state:{value:POST[]}, action) => {
            state.value = action.payload.reverse()
            
        },
        followerNewHomePost: (state:{value:POST[]}, action) => {
            // the seconds inthe time and psted by make a difference and that's checked to prevent
            // multi pushing
            const check = state.value.filter((details) => details.postedBy === action.payload.postedBy && details.time === action.payload.time)
             
            if (check.length < 1) {
                // user doesn't exist
                state.value.push(action.payload) 
                state.value.reverse()
            } 
        },
        userNewHomePost: (state, action) => {
            state.value = action.payload.reverse()  
           
        },
        getLikesHomePost: (state, action) => {
            const currentPostLiked = state.value.find((details) => details.postedBy === action.payload.postedBy && details.time === action.payload.time)
             if (currentPostLiked) {
                currentPostLiked.likes = action.payload.likesBox
             }
        },
        commentHomePostR: (state, action) => {
                const currentPostLiked = state.value.find((details) => details.postedBy === action.payload.postedBy && details.time === action.payload.time)
             if (currentPostLiked) {
                currentPostLiked.comment = action.payload.commentBox
             }
        },
        deleteHomePost: (state, action) => {
            state.value = action.payload
        }

    }
})



export const {socketHomePost, followerNewHomePost, userNewHomePost,getLikesHomePost, commentHomePostR, deleteHomePost} = homePostSlice.actions
export default homePostSlice.reducer