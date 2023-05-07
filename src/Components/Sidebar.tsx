import "../styles/sidebar.css"
import { appContext } from "../App"
import {useContext, useRef, useEffect} from "react"
import {FaBell, FaTimes, FaTrash, FaUserFriends,} from "react-icons/fa"
import Logo from "./Logo"
import boxer from "../images/boxer.jpg"
import { BiPlus, BiSearch, BiLogOut, BiTrash, BiUserCircle, BiBell } from "react-icons/bi"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux"
import { link } from "fs"
import { useDispatch } from "react-redux"
import {getFollowedNotification} from "../Features/Profile"

const Sidebar = () => {
  // interface comingAppDetails {
  //    hideSideBar:string
  //       setHideSideBar:React.Dispatch<React.SetStateAction<string>>
  // }
  // const appEndPoint: string = "http://localhost:2001"
  // let socket = useRef<Socket>()
  let location = useLocation()
  let navigate = useNavigate()
  let dispatch = useDispatch()
 
  const userDetail = useSelector((state: any) => state.userprofile.value)
  const socket = useSelector((state:any)=>state.socket.value)
  // const socket
  // useEffect(() => {
  //   socket.current = io(appEndPoint)
  //   socket.current.on("hello", (data:string) => {
  //     console.log(data)
  //   })
  //   if (socket.current) {
      
  //   }
  // },[])
  useEffect(() => {
    console.log(userDetail)
  },[])
  useEffect(() => {
    if (socket) {
      socket.on("followedNotification", (data: { notification: {}[] | [], error:boolean }) => {
        if (!data.error) {
          dispatch(getFollowedNotification(data.notification))
        }
      })

    }
  })

  const { 
    routeIdentification
    , hideSideBar,
    setHideSideBar,
    hidebarBool,
    hideSideBarBtn,
    setOpenPrePost,
   username
  } = useContext(appContext)
  const OpenPrePostBtn = () => {
    setOpenPrePost(true)
    hideSideBarBtn()
  }
 
  const checkNotification = () => {
    
    if (location.pathname !== "/notification") {
      navigate("/notification")
    } 

    // if (routeIdentification !== "usernotification") {
      
    // }
  }
  const openFFChat = () => {
     if (location.pathname !== "/chat") {
      navigate("/chat")
    } 
  }
  const openGroupChat = () => {
    
  }

  return (
   
    <div className={`sidebar_div ${hidebarBool ? hideSideBar : "sidebar_animation"}`}>
        <div className="exit">
        <button onClick={hideSideBarBtn}>
          <FaTimes className="exit_btn_icon"/>
          </button>
      </div>
      <div className="app_logo">
        <div style={{
          display: "flex", justifyContent: "center"}}>
           <div className="app_logo_div">
            <div></div>
        </div>
        </div>
       
      <div className="group_identification_add_chat">
          <button  onClick={()=>OpenPrePostBtn()}>
            <BiPlus className="create"/> <span>Create </span>
          </button>
          {/* <button style={{borderLeft:"1px solid black"}}>
              <BiSearch className="search"/> <span>Search</span>
          </button> */}
        </div>
      </div>
      <div className="group_identification">
        <div className="group_ff_chat_indication">
          <button onClick={() => openFFChat()} style={{ borderBottom: "3px solid white" }}>FF Chats
            <span>10</span>
          </button><button onClick={() => openGroupChat()}>Group Chats
            <span>10</span>
          </button>
        </div>
        
        <div className="group_chat">
          
          <Link className="link" to={`/chat/${`emeey`}`}>
          <span className="group_img_div">
              <img src={boxer} alt="" /> <span>{username }</span>
          </span>
          <span className="notifications">
            <div className="notifying_bell">
          
                <FaBell />
                    <div className="dot"></div>
            </div>
            <div className="unreadmessage">
             <span> 12</span>
            </div>
          </span>
          </Link>
          
       </div>
  
       
        

      </div>
      <div className="user_Profile_details" style={{marginBottom:"100px"}}>
        <button onClick={() => checkNotification()} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          
          <FaBell />
          <>
            {userDetail.loggedInUserNotification.length > 0 && 
              <>{userDetail.loggedInUserNotification.filter((details: { checked: boolean }) => details.checked === false).length > 0 &&
                <span className="number_Of_Notification">
                  {userDetail.loggedInUserNotification.filter((details: { checked: boolean }) => details.checked === false).length}
                </span>
              }
            </>
               
          } 
        </>
         
         <span>Notification</span>
        </button>
        <button><BiUserCircle/> <span>Profile</span></button>
        <button>
          <BiLogOut/> <span>Logout</span>
        </button>
          <button>
          <BiTrash/> <span>Delete Account</span>
      </button>
      </div>
    
          
    </div>
  )
}

export default Sidebar