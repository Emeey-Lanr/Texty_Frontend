import { createSlice } from "@reduxjs/toolkit";

import  { POST } from "../Features/HomePost"
const currentPost:POST = {
  text: "",
    time: "",
    img_url: "",
    postedBy: "",
    comment: [],
    likes: [],
}





export const currentPostSlice = createSlice({
    name: "currentPostSlice",
    initialState: { value: currentPost },
    reducers: {
        getCurrentPost: (state, action) => {
            state.value = action.payload
        }
    }
})


export  const {getCurrentPost} = currentPostSlice.actions
export default currentPostSlice.reducer

