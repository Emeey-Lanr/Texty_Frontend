import "../styles/user.css"
import { CiChat1 } from "react-icons/ci"
import boxer from "../images/boxer.jpg"
import {useState} from "react"
const Friends = () => {
    const [requestFriends, setRequestFriends] = useState<number>(0)
    const friendsBtn = () => {
        setRequestFriends(0)
        
    }
    const requestBtn = () => {
        setRequestFriends(1)
        
    }
  return (
      <div className="friends_space">
          <div className="friends_heading">
              <button onClick={()=>friendsBtn()} style={requestFriends === 0 ? {borderBottom:"3px solid black"}:{borderBottom:"none"}}>
                  <p>Followers</p>
              </button>
              <button onClick={()=>requestBtn()} style={requestFriends !== 0 ? {borderBottom:"3px solid black"}:{borderBottom:"none"}} >
                  <p>Following</p>
              </button>
          </div>
        
              {/* Friends */}
          {requestFriends === 0 ?
              <div className="friends_details_div">
              <div className="friends_details">
                  <div className="friends_img_div">
                      <img src={boxer} alt="" />
                  </div>
                  <div className="friend_body_div">
                      <div className="friends_body_name_chat">
                      <div className="friends_body_name">
                          <h4>Oyelowo Emmanuel</h4>
                          <p><span>13k Following</span><span style={{paddingLeft:"10px"}}>12k Followers</span></p>
                          </div>
                          <div className="friends_body_chat">
                              <button>
                                  <CiChat1 />
                              </button>
                          </div>
                      </div>
                  <div className="friends_btn_action">
                      <button>Follow</button>
                      <button style={{ marginLeft: "10px" }}>Block</button>
                     
                      {/* <button>Unblock</button>
                      <button>UnFollow</button> */}
                 </div>
                      <div className="friends_about_me">
                          <div className="heading">
                              <p>About Me</p>
                      </div>
                      <div className="details">
                           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur blanditiis voluptatem laboriosam. Et dolorum, voluptate eius quia optio assumenda voluptatem?</p>
                      </div>
                         
                      </div>
                
                  </div>
              
                  </div>
                  
                  </div>:
              <div className="following_user_div">
                  <div className="following_user_details">
                      <div className="following_user_head">
                          <div className="img_div">
                              <img src={boxer} alt="" />
                          </div>
                          <div className="name_div">
                              <h2>Walle</h2>
                              <p>I'm a jungle nigga, who does what we wants when he wants to</p>
                          </div>
                      </div>
                      <div className="following_user_action">
                          <button style={{fontSize:"1.2rem", display:"flex",justifyContent:"center", alignItems:"center"}}>
                             <CiChat1/>
                          </button>
                          <button style={{ marginLeft: "10px" }}>unfollow</button>
                            <button style={{marginLeft:"10px"}}>Block</button>
                          
                      </div>
                      
                  </div>
                  
                
                
              </div>}
              
          
         
    </div>
  )
}

export default Friends