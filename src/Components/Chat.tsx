import ChattingSpace from "./ChattingSpace"


// import Search from "./Search"

import { useParams } from "react-router-dom"


const Chat = () => {
  const name = useParams()

  return (
    <div className="chat-div">

 
      <ChattingSpace /> 
     
  
    </div>
  )
}

export default Chat