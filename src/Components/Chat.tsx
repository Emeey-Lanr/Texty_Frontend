import ChattingSpace from "./ChattingSpace"
import CreateGroup from "./CreateGroup"
import Friends from "./Friends"
import Navbar from "./Navbar"
import RecomendedGroups from "./RecomendedGroups"

import Sidebar from "./Sidebar"
import SideBarModal from "./SideBarModal"
const Chat = () => {
  return (
    <div className="chat-div">

      {/* <RecomendedGroups />
      <ChattingSpace /> */}
      <SideBarModal />
    <Friends/>
      {/* <CreateGroup/> */}
      <Navbar/>
      <Sidebar />
     
      
    </div>
  )
}

export default Chat