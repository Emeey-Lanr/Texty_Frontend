import React, { createContext, useContext, ReactNode } from "react"
import { io, Socket } from "socket.io-client"
let serverApiRoute:string = "https://texty-api.onrender.com";
let localApiRoute:string = "http://localhost:2001";
interface SocketContextInterFace {
    socket:Socket | null
}
interface ComponentProps {
    children:ReactNode
}
const SocketContext = createContext<SocketContextInterFace>({ socket: null })
export const useSocket =()=>  useContext(SocketContext)

export const SocketProvider:React.FC<ComponentProps> = ({ children }) => {
    const socket = io(serverApiRoute);
    return (
        <SocketContext.Provider value={{socket}}>
             {children}
        </SocketContext.Provider>

    )
}

