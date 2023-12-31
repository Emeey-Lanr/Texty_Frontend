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
    const socket = io(`${process.env.REACT_APP_API_URL}`);
    return (
        <SocketContext.Provider value={{socket}}>
             {children}
        </SocketContext.Provider>

    )
}

