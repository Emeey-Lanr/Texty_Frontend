import { createSlice } from "@reduxjs/toolkit"
import { io, Socket } from "socket.io-client"
import { useRef } from "react"
const appEndPoint:string = "http://localhost:2001"
const socket =  io(appEndPoint)

export const socketIoSlice = createSlice({
    name: "socket",
    initialState: { value: socket },
    reducers: {
        
    }
})


export default socketIoSlice.reducer