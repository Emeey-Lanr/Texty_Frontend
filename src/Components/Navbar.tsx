import "../styles/navbar.css"
import { appContext } from "../App"
import {useContext} from "react"
import { FaSearch, FaTrash, FaBell, FaPeopleCarry, FaPlus } from "react-icons/fa"
import boxer from "../images/boxer.jpg"
import { Link, Navigate, useNavigate} from "react-router-dom"
import { useSelector } from "react-redux"
import { BiNews } from "react-icons/bi"
  const Navbar = () => {
    const { showSideBarBtn, groupChatOrPrivateChatOpening, setGroupChatOrPrivateChatOpening, setShowGroupModal, } = useContext(appContext)
    const groupStatus = useSelector((state: any) => state.chat.value) 
let navigate = useNavigate()
    const goToSerachBtn = () => {
      setGroupChatOrPrivateChatOpening(0)
      navigate("/search")
      
    }
    return (
    
    <div className="navbar">
   
      <button className="open_sidebar" onClick={showSideBarBtn}>
          <span></span><span></span><span></span>
      </button>
       <div className="navbar_new_post">
            <Link to="/" className="new_post_link">
            <BiNews className="icon" />
            
            </Link>
          </div>
      <div className="navbar_group_details">
        <div className="search_div">
          <button onClick={()=>goToSerachBtn()}  style={{border:"none", background:"none"}}>
            <FaSearch style={{color:"white"}}/>
          </button>
          </div>
          {
            groupChatOrPrivateChatOpening === 1 && <div className="navbar_img_name_space">
         
          <button >
               <img src={boxer} alt="" />
          </button>
          <span>AdeWale</span>
         </div>
          }
           {
            groupChatOrPrivateChatOpening === 2 && <div className="navbar_img_name_space">
         
          <button >
               <img src={boxer} alt="" />
          </button>
          <span>Pinna Group</span>
         </div>
         }
          
          <div className="navbar_group_action_div">
            {groupChatOrPrivateChatOpening === 1 &&  <button className="navbar_group_action_indicators">
            <div>
            <span></span><span></span><span></span>
        
              </div>
            </button> }
            {groupChatOrPrivateChatOpening === 2 &&  <button className="navbar_group_action_indicators">
            <div>
            <span></span><span></span><span></span>
        
              </div>
            </button> }
            <>
              {groupChatOrPrivateChatOpening === 1 && <div className="navbar_group_action">
                <button>
                  <FaBell style={{ paddingRight: "10px" }} />
                </button>
                <button>
                  <FaPeopleCarry style={{ paddingRight: "10px" }} /> View Profile
                </button>
                <button>
                  <FaPlus style={{ paddingRight: "10px" }} /> Block
                </button>
                <button>
                  <FaTrash style={{ paddingRight: "10px" }} />   Delete Chat
                </button>
              </div>}

              {groupChatOrPrivateChatOpening === 2 &&  <div className="navbar_group_action">
            <button onClick={()=>setShowGroupModal(1)}>
              <FaBell  style={{paddingRight:"10px"}}/> Notifications
            </button>
            <button onClick={()=>setShowGroupModal(2)}>
              <FaPeopleCarry style={{paddingRight:"10px"}}/> Group Details
            </button>
            <button>
              <FaPlus style={{paddingRight:"10px"}} /> Invite a friend
            </button>
            <button>
             <FaTrash style={{paddingRight:"10px"}} />   Delete Group
            </button>
          </div>}
            </>
        
            
      
        </div>
      </div>
     </div>
  )
}

export default Navbar