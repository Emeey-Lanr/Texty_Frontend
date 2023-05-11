import "../styles/home.css"
import { FaPlus, FaSearch, FaUserAlt, FaHeart,FaComment } from "react-icons/fa"
import boxer from "../images/boxer.jpg"
import { Link } from "react-router-dom"
import PostModal from "./PostModal"
import SideBarModal from "./SideBarModal"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import Create from "./Create"
import { useContext, useEffect } from "react"
import { appContext } from "../App"
import Group from "./Group"
import ChattingSpace from "./ChattingSpace"
import { useSelector } from "react-redux"
const Home = () => {
    const { setRouteIdentification, getUserProfile, incomingMessageDetails, setGroupChatOrPrivateChatOpening } = useContext(appContext)
     const socket = useSelector((state: any) => state.socket.value)
    useEffect(() => {
        getUserProfile("-;;'kjg", "home")
        setRouteIdentification("home")
        setGroupChatOrPrivateChatOpening(0)
        
    }, [])
    useEffect(() => {
        if (socket) {
            incomingMessageDetails()
        }
        
    })
    return (
        <>
              <div className="home_div">
          <div className="home_post">
              <div className="date">
                  <span>17hours ago</span>
              </div>
              <div className="caption_div">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, consequatur.</p>
              </div>
              <div className="post_img">
                  <img src={boxer} alt="" />
              </div>
              <div className="action_div">
                  <div className="name_img">
                      <img src={boxer} alt="" />
                      <span>Emeey</span>
                  </div>
                  <div className="action_btn_div">
                      <button><FaHeart/><span>12k</span></button><button><FaComment/><span>12k</span></button>
                  </div>
              </div>
          </div>
            </div>
            <Group />
            <ChattingSpace/>
            <Create/>
            {/* <PostModal/> */}
            <SideBarModal/>
            <Navbar/>
        <Sidebar/>
      </>
    
  )
}

export default Home