import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const groupStatus = true
export const chatSlice = createSlice({
    name: "chat",
    initialState: { value: groupStatus },
    reducers: {
        createPost: (state, action) => {
           
        }
    }
})


export default chatSlice.reducer





