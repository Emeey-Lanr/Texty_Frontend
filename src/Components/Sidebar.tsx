import "../styles/sidebar.css"
import { appContext } from "../App"
import {useContext} from "react"
import {FaBell, FaTimes, FaTrash, FaUserFriends,} from "react-icons/fa"
import Logo from "./Logo"
import boxer from "../images/boxer.jpg"
import {BiPlus, BiSearch, BiLogOut, BiTrash, BiUserCircle, BiBell} from "react-icons/bi"
const Sidebar = () => {
  interface comingAppDetails {
     hideSideBar:string
        setHideSideBar:React.Dispatch<React.SetStateAction<string>>
  }
  const { hideSideBar, setHideSideBar, hidebarBool, hideSideBarBtn } = useContext(appContext)

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
          <button>
            <BiPlus className="create"/> <span>Create </span>
          </button>
          {/* <button style={{borderLeft:"1px solid black"}}>
              <BiSearch className="search"/> <span>Search</span>
          </button> */}
        </div>
      </div>
      <div className="group_identification">
        
        <div className="group_chat">
          
        <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
            <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
            <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
          <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
          <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
          <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
          <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
          <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
          <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
          <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
          <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
          <button>
          <span className="group_img_div">
               <img src={boxer} alt="" /> <span>Winner gold</span>
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
      <div className="user_Profile_details">
        <button>
             <FaUserFriends/> Friends
        </button>
          <button>
          <FaBell/> <span>Notification</span>
        </button>
        <button>
          <BiUserCircle/> <span>Profile</span>
        </button>
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