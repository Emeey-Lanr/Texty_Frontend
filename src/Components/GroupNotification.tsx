import { FaTimes } from "react-icons/fa"
import "../styles/chat.css"
import { useContext } from "react"
import { appContext } from "../App"
const GroupNotification = () => {
        const {setShowGroupModal} = useContext(appContext)
  return (
      <div className="group_notification_info">
          <div className="group_notifictaion_div">
              <div className="group_notification_header">
                  <div className="group_notification_header_exist">
                      <button onClick={()=>setShowGroupModal(0)}>
                          <FaTimes/>
                      </button>
                  </div>
                  <div className="group_notification_heading_description">
                      <h2>Notification</h2>
                  </div>
                  <div className="">
                      
                  </div>
              </div>
              <div className="group_notification_body">
                  
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  <div className="joined">
                          <p>Dayo  joined your group</p>
                  </div>
                  
              </div>
          </div>
          
    </div>
  )
}

export default GroupNotification