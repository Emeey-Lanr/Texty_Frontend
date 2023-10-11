import React, { createContext, useContext, ReactNode } from "react"
import { io, Socket } from "socket.io-client"
let API_URL:string = "https://texty-api.onrender.com";
// let API_URL: string = "http://localhost:2001";
interface SocketContextInterFace {
    socket:Socket | null
}
interface ComponentProps {
    children:ReactNode
}
const SocketContext = createContext<SocketContextInterFace>({ socket: null })
export const useSocket =()=>  useContext(SocketContext)

export const SocketProvider:React.FC<ComponentProps> = ({ children }) => {
    const socket = io(API_URL);
    return (
        <SocketContext.Provider value={{socket}}>
             {children}
        </SocketContext.Provider>

    )
}

