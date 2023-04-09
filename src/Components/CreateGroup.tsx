import "../styles/chat.css"
import img from "../images/boxer.jpg"
import {BiX} from"react-icons/bi"
const CreateGroup = () => {
  return (
      <div className="create_group_modal">
          <div className="create_group_modal_div">
              <div className="create_group_exit">
                  <button>
                      <BiX className="icon"/>
                  </button>
              </div>
              <div className="create_group_details">
                  <div className="create_group_imgupload_div">
                  <label id="group_image">
                      <img src={img} alt="" />
                      <input type="file" hidden id="group_image" />
                  </label>
              </div>
              <div className="create_group_input">
                  <p>Enter group name</p>
                  <input type="text" />
              </div>
              <div className="create_group_btn">
                  <button>
                      
                  </button>
              </div>
                  
              </div>
                 
              
              
            
          </div>
          
   </div>
  )
}

export default CreateGroup