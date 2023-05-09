import boxer from "../images/boxer.jpg"
import { FaTimes } from "react-icons/fa"
import { BiChat, BiPlus, BiLock } from "react-icons/bi"
import { useContext } from "react"
import { appContext } from "../App"
const GroupDetails = () => {
    const {setShowGroupModal} = useContext(appContext)
  return (
      <div className="group_details_info">
          <div className="group_details_info_div">
              <div className="group_details_exit">
                  <button onClick={()=>setShowGroupModal(0)}>
                      <FaTimes/>
                  </button>
              </div>
               <div className="group_details_info_img_div">
              <img src={boxer} alt="" />
          </div>
              <div className="group_description">
                  <div style={{display:"flex",alignItems:"center"}}>
                      <h1>Group</h1> <button style={{border:"none",background:"none",marginLeft:"10px", fontSize:"1.2rem"}}>
                          <BiLock style={{color:"white"}}/>
                      </button>
                  </div>
                  
                  <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem culpa saepe tenetur temporibus non earum, officia praesentium eius. Quo, labore.
                  </p>
                  <div className="group_description_btn">
                      <button>Education</button> <button>Edit</button><button>Exit</button>
                </div>
          </div>
              <div className="group_members">
                  <div className="group_members_heading">
                      <h4>Members</h4>
                  </div>
                  <div className="members_name">
                      <div className="img_name_div">
                          <img src={boxer} alt="" />
                          <p>Wale samuel</p>
                      </div>
                      <div className="btn_div">
                          {/* <button>
                              <BiChat/>
                          </button> */}
                          <button>
                              <BiPlus/> Add
                          </button>
                          {/* <button>
                              Pending
                          </button> */}
                      </div>
                  </div>
                  
          </div>
          </div>
         
          
    </div>
  )
}

export default GroupDetails