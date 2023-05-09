import {createSlice}from "@reduxjs/toolkit"

interface MessageArrayInterface {
    sender: string;
    time: string;
    img_url: string;
    message: string;
}
interface PrivateMesageInterFace {
    id: string;
    opener: string;
    reciever: string;
    roomId: string;
    message: MessageArrayInterface[] | [];
}
const messageValue:PrivateMesageInterFace[] = [

]


export const messageSlice = createSlice({
    name: "messageSlice" ,
    initialState: { value: "" },
    reducers: {
        
    }
})

export default messageSlice.reducer
