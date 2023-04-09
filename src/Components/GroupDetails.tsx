import boxer from "../images/boxer.jpg"
import { FaTimes } from "react-icons/fa"
import {BiChat, BiPlus} from "react-icons/bi"
const GroupDetails = () => {
  return (
      <div className="group_details_info">
          <div className="group_details_info_div">
              <div className="group_details_exit">
                  <button>
                      <FaTimes/>
                  </button>
              </div>
               <div className="group_details_info_img_div">
              <img src={boxer} alt="" />
          </div>
              <div className="group_description">
                  <h1>Group</h1>
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