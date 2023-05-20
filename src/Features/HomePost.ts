import { createSlice } from "@reduxjs/toolkit";


export interface POST {
    text: string;
    time: string;
    img_url: string;
    postedBy: string;
    comment: [];
    likes: [];
}

const post:POST[] = []



export const homePostSlice = createSlice({
    name: "homePostSlice",
    initialState: { value: post },
    reducers: {
        socketHomePost: (state:{value:POST[]}, action) => {
            state.value = action.payload
        },
        followerNewHomePost: (state:{value:POST[]}, action) => {
            // the seconds inthe time and psted by make a difference and that's checked to prevent
            // multi pushing
            const check = state.value.filter((details) => details.postedBy === action.payload.postedBy && details.time === action.payload.time)
             console.log(action.payload.postedBy, action.payload.time)
            if (check.length < 1) {
                console.log("user doesn't exist1")
                state.value.push(action.payload) 
            } else {
                  console.log("user exist")
        }
       
           
        },
        userNewHomePost: (state, action) => {
          state.value = action.payload  
        }
    }
})



export const {socketHomePost, followerNewHomePost, userNewHomePost} = homePostSlice.actions
export default homePostSlice.reducer