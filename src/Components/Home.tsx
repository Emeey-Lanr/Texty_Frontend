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
import { POST } from "../Features/HomePost"
import { socketHomePost } from "../Features/HomePost"
import { useDispatch } from "react-redux"
import {getCurrentPost} from "../Features/CurrentPost"
const Home = () => {
    const { setRouteIdentification, getUserProfile, incomingMessageDetails, setGroupChatOrPrivateChatOpening,  setPostModalStatus, newPostAlert, setNewPostAlert, newPostForFollowersFunction, userNewPostFunction } = useContext(appContext)
    const socket = useSelector((state: any) => state.socket.value)
    const homePost = useSelector((state: any) => state.home_post.value)
    let dispatch = useDispatch()
    useEffect(() => {
        getUserProfile("-;;'kjg", "home")
        setRouteIdentification("home")
        setGroupChatOrPrivateChatOpening(0)
        
    }, [])
    const socketHomePostFunction = () => {
        socket.on("homePost", (data: any) => {
            console.log(data.post)
           dispatch(socketHomePost(data.post))
       })
    }
    useEffect(() => {
        if (socket) {
            socketHomePostFunction()
            incomingMessageDetails()
            newPostForFollowersFunction()
            userNewPostFunction()
        }
        
    })
    const scrollToTopBtn = () => {
          window.scrollTo({
            top: 0,
           behavior: 'smooth',
            
        })
    }
    const openPost = (name:string, time:string) => {
        setPostModalStatus(true)
        dispatch(
      getCurrentPost(homePost.find((details: { postedBy: string, time: string })=>details.postedBy === name && details.time === time)))
    }
    interface HOMEPOST {

    }
    return (
        <>
            <div className="home_div">
                {newPostAlert && <div className="home_newPost_view_div"   style={{position:"sticky", top:"0"}}>
                    <button className="home_newPost_view_btn" onClick={()=>scrollToTopBtn()}>
                        New Post
                    </button>
                </div>}
           
                {homePost.map((details:POST) => (
                    <div className="home_post">
                    
                    <div className="date">
                        <span>17hours ago</span>
                    </div>
                    <div className="caption_div" onClick={()=>openPost(details.postedBy, details.time)}>
                            <p>{details.text}</p>
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
                                <button><FaHeart /><span>{details.likes.length > 0  && details.likes.length}</span></button><button  onClick={()=>openPost(details.postedBy,details.time)}><FaComment /><span>{details.comment.length > 0 && details.comment.length}</span></button>
                        </div>
                    </div>
                </div>
                )) }
            </div>
            <PostModal/>
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