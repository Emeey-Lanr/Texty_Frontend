import { createSlice } from "@reduxjs/toolkit";
import { io, Socket, } from "socket.io-client";

interface InitialState{
    socket:null | any,
    isConnected: boolean,
    errorMessage:null
}
const initialState:InitialState = {
    socket:null,
    isConnected:false,
    errorMessage:null,
}
const appEndPoint: string = "http://localhost:2001"
const socket = "http://localhost:2001";

export const socketSlice = createSlice(
    {
        name: "socketio",
        initialState:{value:socket},
        reducers: {
       
            
        }
    }
) 

// export const { connectSocket } = socketSlice.actions
export default socketSlice.reducer