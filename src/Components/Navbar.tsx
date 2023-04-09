import "../styles/navbar.css"
import { appContext } from "../App"
import {useContext} from "react"
import { FaSearch, FaTrash, FaBell, FaPeopleCarry, FaPlus } from "react-icons/fa"
import boxer from "../images/boxer.jpg"

  const Navbar = () => {
   const { showSideBarBtn} = useContext (appContext)
  return (
    <div className="navbar">
   
           <button className="open_sidebar" onClick={showSideBarBtn}>
          
          <span></span><span></span><span></span>
      </button>
       {/* <div className="reconmend_search">
              <input type="text" /><button>
                  <FaSearch/>
              </button>
          </div> */}
      <div className="navbar_group_details">
        <div className="search_div">
          <button>
            <FaSearch/>
          </button>
        </div>
        <div className="navbar_img_name_space">
          <button >
               <img src={boxer} alt="" />
          </button>
          <span>Pinna Group</span>
         </div>
          <div className="navbar_group_action_div">
             <button className="navbar_group_action_indicators">
            <div>
            <span></span><span></span><span></span>
            
              </div>
          </button>
          <div className="navbar_group_action">
            <button>
              <FaBell  style={{paddingRight:"10px"}}/> Notifications
            </button>
            <button>
              <FaPeopleCarry style={{paddingRight:"10px"}}/> Group Details
            </button>
            <button>
              <FaPlus style={{paddingRight:"10px"}} /> Invite a friend
            </button>
            <button>
             <FaTrash style={{paddingRight:"10px"}} />   Delete Group
            </button>
          </div>
            
      
        </div>
      </div>
     </div>
  )
}

export default Navbar