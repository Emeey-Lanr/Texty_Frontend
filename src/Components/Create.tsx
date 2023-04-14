import "../styles/home.css"
import { FaTimes,FaArrowLeft } from "react-icons/fa"
import {BiImageAdd} from "react-icons/bi"
import boxer from "../images/boxer.jpg"

const Create = () => {
  return (
    <div className="create_group_post">
      {/* <div className="action_div">
        <div className="c_exit">
          <button>
            <FaTimes/>
          </button>
        </div>
        <div className="c_create">
             <button>Post</button><button>Group</button>
        </div>
      
      </div> */}
      <div className="create_post">
        <div className="go_back">
     <FaArrowLeft/>
        </div>
        <div className="input_post_div">
<textarea ></textarea>
        </div>
        {/* <div className="img_post_div">
          <img src={boxer} alt="" />
        </div> */}
        <div className="action_post">
          <label id="upload">
            <BiImageAdd className="icon"/>
            <input type="file" hidden id="upload" />
          </label>
          <button>
            post
          </button>
        </div>

      </div>

    </div>
  )
}

export default Create