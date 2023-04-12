import "../styles/user.css"
import boxer from "../images/boxer.jpg"
import {useState} from "react"
import { BiHeart,BiTrash, BiImageAdd,BiPlus } from "react-icons/bi"
const UserProfile = () => {
  return (
   <div className="user_profile_div">
   
        <div className="background_pic">

        </div>
      <div className="user_pic" >
        <img src={boxer} alt="" />

      </div>
      <div className="user_username">
        <h2>Emeey Lanr</h2>
      </div>
      <div className="following_followers">
        <button>14K Following</button>
        <button>15k Folowers</button>
      </div>
      <div className="about_Me">
        <h3>About Me</h3>
        <p>  de  praesentium architecto soluta officia quae earum cupiditate neque ullam? Nostrum ab consequuntur ad nesciunt?</p>
        <button>Edit</button>
      </div>
      <div  className="post_heading">
        <h2>POST</h2>
      </div>
      <div className="post_container">
        
        <button className="post_div">
            <div className="posted">
          <p>I'm not fine, It's good to okay</p>
        </div>
          <div className="poster">
            <div className="username_img">
             <img src={boxer} alt="" />
            <span>Emeey Lanr</span>
            </div>
          
            <div className="postaction">
          <button><BiHeart/> <span>12k</span></button><button><BiTrash/></button>
            </div>
            
          </div>
      </button>
<button className="post_div">
            <div className="posted">
          <p>I'm not fine, It's good to okay</p>
        </div>
          <div className="poster">
            <div className="username_img">
             <img src={boxer} alt="" />
            <span>Emeey Lanr</span>
            </div>
          
            <div className="postaction">
          <button><BiHeart/> <span>12k</span></button><button><BiTrash/></button>
            </div>
            
          </div>
        </button>
        <button className="post_div">
            <div className="posted">
          <p>I'm not fine, It's good to okay</p>
        </div>
          <div className="poster">
            <div className="username_img">
             <img src={boxer} alt="" />
            <span>Emeey Lanr</span>
            </div>
          
            <div className="postaction">
          <button><BiHeart/> <span>12k</span></button><button><BiTrash/></button>
            </div>
            
          </div>
        </button>
        
      </div>
     
      <button className="create_post">
        <BiPlus/>
    </button>
   
      
    </div>
   
  )
}

export default UserProfile