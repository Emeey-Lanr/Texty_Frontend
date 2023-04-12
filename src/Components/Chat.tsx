import ChattingSpace from "./ChattingSpace"
import CreateGroup from "./CreateGroup"
import Friends from "./Friends"
import Navbar from "./Navbar"
import RecomendedGroups from "./Home"

import Sidebar from "./Sidebar"
import SideBarModal from "./SideBarModal"
import UserNotification from "./UserNotification"
import UserProfile from "./UserProfile"
import Home from "./Home"

const Chat = () => {
  return (
    <div className="chat-div">
<Home/>
   
      {/* <ChattingSpace />  */}
      <SideBarModal />
      {/* <Friends/> */}
      {/* <UserNotification /> */}
      {/* <UserProfile/> */}
      {/* <CreateGroup/> */}
      <Navbar/>
      <Sidebar />
  n    
    </div>
  )
}

export default Chat