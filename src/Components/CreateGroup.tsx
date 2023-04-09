import "../styles/chat.css"
import img from "../images/boxer.jpg"
import {BiX} from"react-icons/bi"
const CreateGroup = () => {
  return (
      <div className="create_group_modal">
          <div className="create_group_div">
              <div className="create_group_exit">
                  <button>
                      <BiX/>
                  </button>
            </div>
              <div className="name_and_input">
                  <div className="create_group_description">
                      <p>Name</p>
                      <select name="" id="">
                          <option value="">Education</option>
                          <option value="">18+</option>
                          <option value="">Science</option>
                          <option value="">Tech</option>
                          <option value="">Ai</option>
                      </select>
                  </div>
                 
                 
                       <input type="text" />
                  
                 
              </div>
              <div className="btn">
                  <button>Create</button>
              </div>
              
        </div>
        
          
   </div>
  )
}

export default CreateGroup