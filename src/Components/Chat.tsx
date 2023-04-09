import ChattingSpace from "./ChattingSpace"
import CreateGroup from "./CreateGroup"
import Navbar from "./Navbar"
import RecomendedGroups from "./RecomendedGroups"

import Sidebar from "./Sidebar"
import SideBarModal from "./SideBarModal"
const Chat = () => {
  return (
    <div className="chat-div">

      {/* <RecomendedGroups /> */}
      <ChattingSpace />
      <SideBarModal />
   
      {/* <CreateGroup/> */}
      <Navbar/>
      <Sidebar />
     
      
    </div>
  )
}

export default Chat