import React, { createContext, useContext, ReactNode } from "react"
import { io, Socket } from "socket.io-client"
interface SocketContextInterFace {
    socket:Socket | null
}
interface ComponentProps {
    children:ReactNode
}
const SocketContext = createContext<SocketContextInterFace>({ socket: null })
export const useSocket =()=>  useContext(SocketContext)

export const SocketProvider:React.FC<ComponentProps> = ({ children }) => {
    const socket = io("http://localhost:2001");
    return (
        <SocketContext.Provider value={{socket}}>
             {children}
        </SocketContext.Provider>

    )
}

