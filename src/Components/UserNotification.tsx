
import "../styles/user.css"
import boxer from "../images/boxer.jpg"
import {useEffect, useState} from "react"
import { url } from "inspector"
import Sidebar from "./Sidebar"
import SideBarModal from "./SideBarModal"
import Navbar from "./Navbar"
import { appContext } from "../App"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
const UserNotification = () => {
  const { setRouteIdentification, getUserProfile } = useContext(appContext)
  const userDetail = useSelector((state:any)=>state.userprofile.value)
  useEffect(() => {
    getUserProfile("notification", "notification")
    setRouteIdentification("notification")
  }, [])
 
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
          {userDetail.loggedInUserNotification.map((data:{followed: boolean, checked: boolean, notificationDetails:string, username:string}) => (
            <div className="user_notification_img_text_description">
              <div className="img_text_notification_div">
                 <div className="user_notification_img_div">
              <img src={boxer} alt="" />
            </div>
            <div className="user_notification_text_div">
                <p>{data.notificationDetails}</p>
            </div>
              </div>
              {data.followed && <div className="notification_follow_action">
                <div>
                  {userDetail.following.find((name: { username: string }) => name.username === data.username) ?
                    <button style={{background:"black",color:"white", border:"none", padding:"10px 20px", borderRadius:"30px"} }>Following</button> :
                    <button style={{background:"none", padding:"10px 20px", border:"1px solid black", borderRadius:"30px" }}>Follow</button>}
                </div>
              </div>}
          </div>
          ))}
          
      </div>
      </div>
      <Navbar/>
      <SideBarModal/>
      <Sidebar/>
    </>
  )
}

export default UserNotification