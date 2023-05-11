import { createSlice, current } from "@reduxjs/toolkit"


interface MessageInterface {

    sender: string;
    time: string;
    text: string;
    messageImg: string;
    checked:boolean

}
interface currentDetailsInterface {
    
    owner: string;
    notowner: string;
    notowner_imgurl?: string;
    message?: MessageInterface[] | [] ;
    
}

interface MessageValueInterface  {
    unCheckedMessageNumber:number,
    currentName: string;
    currentDetails: currentDetailsInterface;
    allMessage:currentDetailsInterface[] | []
}

const messageValue: MessageValueInterface = {
    unCheckedMessageNumber:0,
    currentName: "",
    currentDetails: {
        owner: "",
        notowner: "",
        notowner_imgurl:"",
        message: [],
    },
    allMessage: [
       
        
    ]
    
}




export const messageSlice = createSlice({
    name: "messageSlice" ,
    initialState: { value: messageValue},
    reducers: {
        loadMessage:(state, action)=>{
            state.value.allMessage = action.payload
            action.payload.map((name:{owner:string, notowner:string, message:MessageInterface[]}) => {
                state.value.unCheckedMessageNumber = name.message.filter((details)=>details.checked === false).length
            })
        },
        setOrOpenChat: (state, action) => {
            let m = true
            state.value.currentName = action.payload.name
            state.value.allMessage.map((name: currentDetailsInterface, id) => {
                if (name.notowner === action.payload.name) {
                    state.value.currentDetails = state.value.allMessage[id]
                    m  = false
                }
            })

             if(m){
             state.value.currentDetails.notowner = action.payload.name
             state.value.currentDetails.notowner_imgurl = action.payload.notuser_imgUrl
             }
            
            
        },
        getCurrentMessageId: (state, action) => {   
             state.value.currentName = action.payload 
              state.value.allMessage.map((name: { owner: string, notowner: string }, id) => {
                  if (name.notowner === action.payload) {
                     state.value.currentDetails = name
                     
                }
            })
        },
        incomingMesageR: (state, action) => {
            state.value.allMessage = state.value.allMessage.filter((name: { owner: string, notowner: string }) => name.notowner !== action.payload.chattingWithName)
            state.value.allMessage.push(action.payload.incomingMessage)

            let value = -1
            state.value.allMessage.map((name: { owner: string, notowner: string }, id) => {
                 
                if (name.notowner === state.value.currentName) {
                    value = id
                }
             })
            
            state.value.currentDetails = state.value.allMessage[value]
            // let value = -1
           
            // state.value.allMessage[value] = action.payload.details
            
        }
        
    }
})

export const {loadMessage,setOrOpenChat, getCurrentMessageId, incomingMesageR} = messageSlice.actions
export default messageSlice.reducer
