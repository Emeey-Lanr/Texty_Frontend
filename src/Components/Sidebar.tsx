import "../styles/sidebar.css"
import { appContext } from "../App"
import {useContext, useRef, useEffect, useState} from "react"
import {FaBell, FaTimes, FaTrash, FaUserFriends,} from "react-icons/fa"
import Logo from "./Logo"
import boxer from "../images/boxer.jpg"
import { BiPlus, BiSearch, BiLogOut, BiTrash, BiUserCircle, BiBell } from "react-icons/bi"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux"
import { link } from "fs"
import { useDispatch } from "react-redux"
import { getFollowedNotification } from "../Features/Profile"
import {getCurrentMessageId} from "../Features/Message"
import axios from "axios"


const Sidebar = () => {
  
  // let socket = useRef<Socket>()
  let location = useLocation()
  let navigate = useNavigate()
  let dispatch = useDispatch()
 
  const userDetail = useSelector((state: any) => state.userprofile.value)
  const socket = useSelector((state:any)=>state.socket.value)
  const messageStore = useSelector((state:any)=>state.privatemessagechat.value)
  
  // PrivateChat or Group Chat
  const [privateChatOrGroupChat, setPrivateChatOrGroupChat] =useState<boolean>(true)
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
    username,
    setActionModalId,
    setOpenActionModal,

    setGroupChatOrPrivateChatOpening,
    messageEndPoint
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

  // switch btn
  const openFFChat = () => {
    setPrivateChatOrGroupChat(true)
    //  if (location.pathname !== "/chat") {
    //   navigate("/chat")
    // } 
  }
  const openGroupChat = () => {
   setPrivateChatOrGroupChat(false)
    
  }

  // chat opening btn
  const privateChatBtn = async (name:string) => {

    setGroupChatOrPrivateChatOpening(1)
    dispatch(getCurrentMessageId(name))
    socket.emit("updatechecked", {owner:userDetail.registerdUserIdentification, notowner:name})
    const updatcheck = await axios.post(`${messageEndPoint}/updatechecked`, {owner:userDetail.registerdUserIdentification, notowner:name})
    
  }

  const groupChatBtn = () => {
    setGroupChatOrPrivateChatOpening(2)
    
  }
  const openModalActionFunction = (state:boolean, id:number)=>{
     setOpenActionModal(state)
    setActionModalId(id)
  }
  const logoutBtn = () => {
   openModalActionFunction(true, 1)
    
  }
  const deleteAccountBtn = () => {
    openModalActionFunction(true, 2)
    
  }
  const profileCheck = () => {
    console.log(userDetail.registerdUserIdentification)
    navigate(`/${userDetail.registerdUserIdentification}`)


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
        <div className="group_ff_chat_indication" style={{paddingBottom:"5px"}}>
          <button onClick={() => openFFChat()} style={ privateChatOrGroupChat ? { borderBottom: "3px solid white" } : { borderBottom: "none" } }>FF Chats
           {messageStore.unCheckedMessageNumber > 0 && <span> {messageStore.unCheckedMessageNumber}</span>}
          </button><button style={!privateChatOrGroupChat ? { borderBottom: "3px solid white" } : { borderBottom: "none" }} onClick={() => openGroupChat()}>Group Chats
            <span>10</span>
          </button>
        </div>
        <>
          {privateChatOrGroupChat ?
            //PRIVATE CHAT  //////////////////////////////////////////////////////////////////////////////
            <div className="group_chat">
              {messageStore.allMessage.map((name:{owner:string, notowner:string,notowner_imgurl:string, message:{checked:boolean, text:string}[] })=>(
 <div>
                <button className="link"  onClick={()=>privateChatBtn(name.notowner)}>
          <span className="group_img_div">
                      <img src={boxer} alt="" />   <div>
                        <h3>{name.notowner}</h3>
                        <p>{name.message[name.message.length - 1].text}</p>
                      </div>
          </span>
          <span className="notifications">
            {/* <div className="notifying_bell">
          
                <FaBell />
                    <div className="dot"></div>
            </div> */}
                      {name.message.filter((details)=> details.checked === false).length > 0  &&  <div className="unreadmessage">
                        <span>{name.message.filter((details)=> details.checked === false).length }</span>
                      </div>}
          </span>
          </button>
          </div>
              ))}
          
          
          
            </div>
            
            :
            //GROUP CHAT  //////////////////////////////////////////////////////////////////////////////
            <div className="group_chat">
              <div>
                <button className="link" onClick={()=>groupChatBtn()} >
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
          </button>
          </div>
          
          
        </div>
          }
          
        </>
        
        
        
  
       
        

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
        <button onClick={()=>profileCheck()}><BiUserCircle/> <span>Profile</span></button>
        <button onClick={()=>logoutBtn()}>
          <BiLogOut/> <span>Logout</span>
        </button>
          <button onClick={()=>deleteAccountBtn()}>
          <BiTrash/> <span>Delete Account</span>
      </button>
      </div>
    
          
    </div>
  )
}

export default Sidebar