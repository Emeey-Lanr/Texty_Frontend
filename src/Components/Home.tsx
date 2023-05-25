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
import { socketHomePost,getLikesHomePost,commentHomePostR } from "../Features/HomePost"
import { useDispatch } from "react-redux"
import { getCurrentPost } from "../Features/CurrentPost"
import { BiHeart, BiChat } from "react-icons/bi"


const Home = () => {
    const { setRouteIdentification, getUserProfile, incomingMessageDetails,
        setGroupChatOrPrivateChatOpening, setPostModalStatus, newPostAlert, setNewPostAlert, newPostForFollowersFunction, userNewPostFunction, likeUnlikeSocketFunction } = useContext(appContext)
      const socket = useSelector((state: any) => state.socket.value)
    const homePost = useSelector((state: any) => state.home_post.value)
    const userProfileDetails = useSelector((state: any) => state.userprofile.value)
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

        
    const incomingLikesSocketFunction = () => {
         const dispatchFunction = (postedBy:string, time:string, likesBox:string) => {
          dispatch(getLikesHomePost({postedBy: postedBy, time:time, likesBox:likesBox}))
    }

    socket.on("likeOrUnlike1", (data: any) => {
      console.log(data)
  
      dispatchFunction(data.postedBy, data.time, data.likes)
    })
     socket.on("likeOrUnlike2", (data: any) => {
        console.log(data.likes)
       dispatchFunction(data.postedBy, data.time, data.likes)
     })
    }
     const incomingCommentSocketFunction = () => {
    const dispatchFunction = (postedBy:string, time:string, commentBox:string) => {
          dispatch(commentHomePostR({postedBy: postedBy, time:time, commentBox}))
    }

    socket.on("comment1", (data: any) => {
      console.log(data)
  
      dispatchFunction(data.postedBy, data.time, data.likes)
    })
     socket.on("comment2", (data: any) => {
       dispatchFunction(data.postedBy, data.time, data.likes)
    })
  }
    useEffect(() => {
        if (socket) {
            socketHomePostFunction()
            incomingMessageDetails()
            newPostForFollowersFunction()
            userNewPostFunction()
            incomingLikesSocketFunction()
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
            
                <div className="home_post_container">
  
                    {homePost.map((details: POST) => (
                        <button className="home_post_div" disabled={true} onClick={() => openPost(details.postedBy, details.time)}>
                            <div className="home_posted" onClick={() => openPost(details.postedBy, details.time)}>
                                <p>{details.text}</p>
                            </div>
                            <div className="home_poster">
                                <div className="home_username_img">
                                    <img onClick={() => alert(20)} src={boxer} alt="" />
                                    <span style={{color:"white"}}>{details.postedBy}</span>
                                </div>
          
                                <div className="home_postaction" style={userProfileDetails.username === userProfileDetails.registerdUserIdentification ? {position:"relative", gridTemplateColumns:"30% 30% 30%" }: { position: "relative",}}>
                                    <>
                                        {details.likes.find((data) => data === userProfileDetails.registerdUserIdentification) ?
                                            <button onClick={()=>likeUnlikeSocketFunction("unlike", details.time, details.postedBy, "unlike")}>
                                                <FaHeart style={{ color: "red" }} /> <span>{details.likes.length > 0 && details.likes.length}</span>
                                            </button> :
                                            <button onClick={() => likeUnlikeSocketFunction("like", details.time, details.postedBy, "like")}><BiHeart /> <span>{Number(details.likes.length) > 0 && details.likes.length}</span></button>
                                        }
                                    </>
                                    <button onClick={() => openPost(details.postedBy, details.time)}><BiChat /> <span>{details.comment.length > 0 && details.comment.length}</span></button>
                    
                                </div>
            
                            </div>
                        </button>
                    ))}

            </div>
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