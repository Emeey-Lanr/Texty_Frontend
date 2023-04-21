import "../styles/user.css"
import boxer from "../images/boxer.jpg"
import {useEffect, useState, useContext, useRef, useReducer} from "react"
import { BiHeart, BiTrash, BiImageAdd, BiPlus, BiChat } from "react-icons/bi"
import { useParams, } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import Create from "./Create"
import PostModal from "./PostModal"
import Friends from "./Friends"
import { appContext, } from "../App"
import { io, Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux"
import {collectUserProfile} from "../Features/Profile"
import axios from "axios"
const UserProfile = () => {
  const { userEndPoint, setPostModalStatus, setUsername, getUserProfile, noUserFound } = useContext(appContext)
  const socket = useSelector((state: any) => state.socket.value)
  const userProfileDetails = useSelector((state: any) => state.userprofile.value)
 
  
  const [m, setM] = useState(0)
  let id = useParams()


  
  useEffect(() => {
    getUserProfile(`${id.id}`, "")
    console.log(userProfileDetails, "Kjhgfdfghjklkjhgf")
    socket.on("hello", (data: Object) => {
      console.log(data)
    })
    if (socket) {
      socket.on("get", (nn: string) => {
        setUsername(nn)
      })
    }
  }, [])
  
  
  // const socket = Socket(appEndPoint)
 
  // useEffect(() => {
  //   socket.current.on("hello", (data: object) => {
  //     console.log(data)
  //   })
  //   // socket.emit("name", {name:"oyelowo"})
  //   // console.log(id.id)
  // }, [])
  const openPost = () => {
    setPostModalStatus(true)
    socket.emit("shit", { name: "Emmeey" })
    
  }
  const preventBtn = () => {
    alert(20)
  
    setM(2)

  }
  return (
    <>
      {noUserFound ? <>
        <div>
          <p>No user found</p>
        </div>
      </> :
        <>
        
          <div className="user_profile_div">
   
            <div className="background_pic">

            </div>
            <div className="user_pic" >
              <img src={boxer} alt="" />

            </div>
            <div className="user_username">
              <h2>{userProfileDetails.username}</h2>
            </div>
            <div className="following_followers">
              <button>{userProfileDetails.following.length} Following</button>
              <button>{userProfileDetails.followers.length} Folowers</button>
            </div>
            <div className="about_Me">
              <div className="caption_edit_div">
                <div>
                  <h3>About Me</h3>
                </div>
                 <div>
                  {userProfileDetails.username === userProfileDetails.registerdUserIdentification ? <button>Edit</button> : <button>{<BiChat/>}</button>}
                </div>
             
            
              </div>
       
              <p>  de  praesentium architecto soluta officia quae earum cupiditate neque ullam? Nostrum ab consequuntur ad nesciunt?</p>
        
            </div>
            <div className="post_heading">
              <h2>POST</h2>
            </div>
            <div className="post_container">
        
              <button className="post_div" onClick={() => openPost()}>
                <div className="posted">
                  <p>I'm not fine, It's good to okay</p>
                </div>
                <div className="poster">
                  <div className="username_img">
                    <img src={boxer} alt="" />
                    <span>Emeey Lanr</span>
                  </div>
          
                  <div className="postaction" style={{ position: "relative" }}>
                    <button onClick={() => preventBtn()}><BiHeart /> <span>12k</span></button> <button><BiChat /> <span>12k</span></button>
                    {userProfileDetails.username === userProfileDetails.registerdUserIdentification && <button><BiTrash /></button>}
                  </div>
            
                </div>
              </button>

        
            </div>
     
      
          </div>
          {/* <Friends /> */}
          <PostModal />
          <Create />
          <Navbar />
          <Sidebar />
        </>}
      
     
    </>
 
   
  )
}

export default UserProfile