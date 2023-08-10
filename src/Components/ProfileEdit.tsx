import { FaArrowLeft, FaCheck, FaPenAlt, FaSpinner, FaTimes } from "react-icons/fa"
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
    const [imgPreview, setImgPreview] = useState<boolean>(false)
    const [imgPreviewedUrl, setImgPreviewedUrl] = useState<string>("")
    const [profileBackground, setProfileBackground] = useState<string>("")
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
    
    const uploadProfileImg = (e:any) => {
        const imgUpload = new FileReader()
      imgUpload.readAsDataURL(e.target.files[0]) 
        imgUpload.onload = () => {
            setImgPreview(true)
            setProfileBackground("Profile Image")
        setImgPreviewedUrl(`${imgUpload.result}`)   
      }
        
        
    
        // imgUpload.onload = () => {
            
        // }
        
    }
    const uploadBackgroundImg = (e: any) => {
       
          const imgUpload = new FileReader();
          imgUpload.readAsDataURL(e.target.files[0]);
        imgUpload.onload = () => {
              setImgPreview(true)
            setProfileBackground("Background Image");
            setImgPreviewedUrl(`${imgUpload.result}`);
          };
        
        
    }
    const uploadImageBtn = () => {
        axios
          .put(`${userEndPoint}/updateImg`, {
            username: userProfileDetails.registerdUserIdentification,
            imgPreviewedUrl,
            profileBackground,
          })
          .then((result) => {})
          .catch((error) => {});
        
    }
    return (
      <>
        {openEditProfile && (
          <div className="profile_edit_div_background">
            <div className="profile_edit_div" style={{}}>
              <div className="profile_edit_exit_action_div">
                <button onClick={() => setOpenEditProfile(false)}>
                  <FaTimes />
                </button>
              </div>
              {errorStatus && (
                <div className="profile_edit_error_message">
                  <button onClick={() => setErrorStatus(false)}>
                    <FaTimes />
                  </button>

                  <div>
                    <p>An error occured</p>
                  </div>
                </div>
              )}
              {<>
                
                {userProfileDetails.background_img_url !== "" ? <div
                  className="profile_edit_background_img"
                  style={{
                    backgroundImage: `url(${boxer})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div>
                    <label id="background">
                      <BiCamera />
                      <input
                        type="file"
                        hidden
                        id="background"
                        onChange={(e) => uploadBackgroundImg(e)}
                      />
                    </label>
                  </div>
                </div>: 
                <div
                  className="profile_edit_background_img"
                  style={{
                    backgroundColor: "#0000004a" 
                  }}
                >
                  <div>
                    <label id="background">
                      <BiCamera />
                      <input
                        type="file"
                        hidden
                        id="background"
                        onChange={(e) => uploadBackgroundImg(e)}
                      />
                    </label>
                  </div>
                </div>
                }
              </>}

              <div className="profile_edit_profile_img">
                <img
                  src={
                    userProfileDetails.registeredUserImgUrl === ""
                      ? noImg
                      : userProfileDetails.registeredUserImgUrl
                  }
                  alt=""
                />
                <label id="profile_img">
                  <BiCamera />
                  <input
                    onChange={(e) => uploadProfileImg(e)}
                    type="file"
                    hidden
                    id="profile_img"
                    accept=".jpeg,.png"
                  />
                </label>
              </div>
              <div className="profile_edit_about_me">
                <div className="profile_edit_about_me_title_caption_div">
                  <p>About Me : </p>
                </div>
                <div className="profile_edit_edit_space_div">
                  {about_meState ? (
                    <>
                      <textarea
                        disabled={switchAction}
                        onChange={(e) => setAbout_MeText(e.target.value)}
                        value={about_meText}
                      ></textarea>
                      <button onClick={() => setAbout_Me_State(false)}>
                        <FaTimes />
                      </button>
                      <>
                        {!switchAction ? (
                          <button onClick={() => updateAboutMeBtn()}>
                            <FaCheck />
                          </button>
                        ) : (
                          <button>
                            <FaSpinner className="spin" />
                          </button>
                        )}
                      </>
                    </>
                  ) : (
                    <>
                      <p>{userProfileDetails.about_me}</p>
                      <button onClick={() => editAbout_MeBtn()}>
                        <FaPenAlt />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {imgPreview && (
              <div className="edit_imgPreview">
                <div className="exitPhase">
                  <button onClick={() => setImgPreview(false)}>
                    <FaArrowLeft />
                  </button>
                  <p className="phase">{profileBackground}</p>
                </div>

                <div className="img_preview_div">
                  <img src={imgPreviewedUrl} alt="" />
                </div>
                <div className="edit_preview_upload_action">
                  <button onClick={() => uploadImageBtn()}>Upload</button>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
}

export default ProfileEdit