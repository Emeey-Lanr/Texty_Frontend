import { FaCheck, FaPenAlt, FaSpinner, FaTimes } from "react-icons/fa"
import "../styles/user.css"
import { BiCamera } from "react-icons/bi"
import boxer from "../images/boxer.jpg"
import noImg from "../images/noImage.png"
import { useState, useContext, useEffect } from "react"
import { appContext } from "../App"
import { useSelector } from "react-redux"
import axios from "axios"
const ProfileEdit = () => {
    const { getUserProfile,userEndPoint,about_meText, setAbout_MeText, openEditProfile, setOpenEditProfile} = useContext(appContext)
    const [about_meState, setAbout_Me_State] = useState<boolean>(false)
   
    const userProfileDetails = useSelector((state: any) => state.userprofile.value)

   
    const editAbout_MeBtn = () => {
        setAbout_Me_State(true)
        setAbout_MeText(userProfileDetails.about_me)
    }
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    const [switchAction, setSwitchAction] = useState<boolean>(false)
    const updateStateFunction = () => {
          setErrorStatus(true)
                   setAbout_Me_State(false)
            setSwitchAction(false)  
    }
    const updateAboutMeBtn = async () => {
        try {
            setSwitchAction(true)
            const updateUser = await axios.put(`${userEndPoint}/updateAboutMe`, { username: userProfileDetails.registerdUserIdentification, aboutme: about_meText })
          
               getUserProfile(`${userProfileDetails.registerdUserIdentification}`, "")
               updateStateFunction()  
           
          
        } catch (error) {
              updateStateFunction()
            console.log(error)
        }
        setSwitchAction(true)
        
      
    }
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
                        {errorStatus && <div className="profile_edit_error_message">
                                <button onClick={()=>setErrorStatus(false)}><FaTimes/></button>
                         
                            <div>
                                <p>An error occured</p>
                             </div>
                        </div>}
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
                  <p>About Me : </p>
              </div>
              <div className="profile_edit_edit_space_div">
                      {about_meState ?  <>
                        <textarea disabled={switchAction} onChange={(e)=>setAbout_MeText(e.target.value)} value={about_meText}></textarea>
                               <button onClick={()=>setAbout_Me_State(false)}>
                              <FaTimes/>
                          </button>
                                    <>
                                        {!switchAction   ?   <button onClick={()=>updateAboutMeBtn()} >
                              <FaCheck/>
                                        </button>:
                                        <button>
                                            <FaSpinner className="spin" />
                                        </button>}
                                    </>
                     
              </>:
                          <>
                              
                  <p>{userProfileDetails.about_me}</p>
                          <button onClick={()=>editAbout_MeBtn()}>
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