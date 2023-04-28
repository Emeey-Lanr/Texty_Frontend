
import "../styles/user.css"
import boxer from "../images/boxer.jpg"
import {useEffect, useState} from "react"
import { url } from "inspector"
import Sidebar from "./Sidebar"
import SideBarModal from "./SideBarModal"
import Navbar from "./Navbar"
import { appContext } from "../App"
import { useContext } from "react"
const UserNotification = () => {
  const { setRouteIdentification } = useContext(appContext)
  useEffect(() => {
    setRouteIdentification("notification")
  },[])
  return (
    <>
      <div className="userNotificationDiv">
      <div className="heading_demacation_div">
         <div className="userNofication_heading">
          <p>Notification</p>
         </div>
         <div className="demacation">

          </div>
      </div>
      <div className="user_notification_div">
          <div className="user_notification_img_text_description">
            <div className="user_notification_img_div">
                <img src={boxer} alt="" />
            </div>
            <div className="user_notification_text_div">
              <p>Wale Speldid follow you</p>
            </div>
          </div>
          
      </div>
      </div>
      <Navbar/>
      <SideBarModal/>
      <Sidebar/>
    </>
  )
}

export default UserNotification