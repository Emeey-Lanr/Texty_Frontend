import ChattingSpace from "./ChattingSpace"
import Sidebar from "./Sidebar"
import SideBarModal from "./SideBarModal"
const Chat = () => {
  return (
    <div className="chat-div">

      <ChattingSpace />
      <SideBarModal/>
      <Sidebar />
      
    </div>
  )
}

export default Chat