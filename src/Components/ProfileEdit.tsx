import { FaCheck, FaPenAlt, FaTimes } from "react-icons/fa"
import "../styles/user.css"
import { BiCamera } from "react-icons/bi"
import boxer from "../images/boxer.jpg"
import noImg from "../images/noImage.png"
import { useState, useContext } from "react"
import { appContext } from "../App"
const ProfileEdit = () => {
    const {openEditProfile, setOpenEditProfile} = useContext(appContext)
    const [about_meState, setAbout_Me_State] = useState<boolean>(false)
    return (
      <>
            {openEditProfile && 
            <div className="profile_edit_div_background">
          <div className="profile_edit_div" style={{}}>
              
              <div className="profile_edit_exit_action_div">
                  <button onClick={()=>setOpenEditProfile(false)}>
                      <FaTimes/>
                  </button>
              </div>
              <div className="profile_edit_background_img" style={{backgroundImage:`url(${boxer})`, backgroundPosition:"center", backgroundSize:"cover"}}>
                  <div>
                      

                        <button>
                    <BiCamera/>
                  </button>
                  </div>
                  
                
          </div>
          <div className="profile_edit_profile_img">
                  <img src={noImg} alt="" />
                      <button>
                    <BiCamera/>
                  </button>
          </div>
          <div className="profile_edit_about_me">
              <div className="profile_edit_about_me_title_caption_div">
                  <p>About Me :</p>
              </div>
              <div className="profile_edit_edit_space_div">
                      {about_meState ?  <>
                        <textarea ></textarea>
                               <button onClick={()=>setAbout_Me_State(false)}>
                              <FaTimes/>
                          </button>
                               <button >
                              <FaCheck/>
                  </button>
              </>:
                          <>
                              
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus illum fugit ut dicta qui odit minima sint deleniti repellat a architecto expedita vero excepturi, recusandae nihil. Earum officia a ea.</p>
                          <button onClick={()=>setAbout_Me_State(true)}>
                              <FaPenAlt/>
                  </button>
              </>}
              </div>
          </div>
          </div>
       
          
    </div>
            }
      </>
      
  )
}

export default ProfileEdit