import { FaArrowDown, FaArrowUp, FaTimes } from "react-icons/fa"
import "../styles/followUser.css"
import { useState, useContext, useEffect } from "react"
import { appContext } from "../App"
import { useSelector } from "react-redux"
import { suggestedUserProfile } from "../Redux/SuggestedUser"
import noIMG from "../images/noImage.png"
import { useSocket } from "../Socket";
const FollowUser = () => {
  const {
    suggestedUserF,
    icon,
    hide,
    slide,
    alwaysOpenSuggested,
    followFunction,
    unfollowFunction,
  } = useContext(appContext);
  const { socket } = useSocket();
  const suggested = useSelector((state: any) => state.suggested_user.value);  
   const userProfileDetails = useSelector(
     (state: any) => state.userprofile.value
  );  

  useEffect(() => {
    if (socket) {
      suggestedUserF()
    }
  })
  const followUser = (follow:string) => {
    if(userProfileDetails.registerdUserIdentification === userProfileDetails.username){
    followFunction(
      "followSocket2",
      userProfileDetails.registerdUserIdentification,
      follow,
      "followed you"
    )
    } else {
      followFunction(
      "followSocket1",
      userProfileDetails.registerdUserIdentification,
      follow,
      "followed you"
    )
    }
    
  }
  const unfollowBtn = (unfollow:string) => {
     if (
       userProfileDetails.registerdUserIdentification ===
       userProfileDetails.username
     ) {
       unfollowFunction(
         "unfollowSocket2",
         userProfileDetails.registerdUserIdentification,
         unfollow

       );
     } else {
       unfollowFunction(
         "unfollowSocket1",
         userProfileDetails.registerdUserIdentification,
         unfollow
       );
     }
    
  }
  const check = () => {
    console.log( userProfileDetails)
  }

  return (
    <>
      {suggested.length > 0 && <div className={`follow_a_user_parent ${hide} ${alwaysOpenSuggested}`}>
        <div className="top_heading">
          <div>
            <button onClick={() => slide()}>
              <FaArrowDown className={icon} />
            </button>
          </div>
          <div onClick={() => check()} className="heading_follow_a_user">
            <h2>Suggested User</h2>
          </div>
        </div>

        {suggested.map((details: suggestedUserProfile) => (
          <div className="follow_a_user">
            <div className="description">
              <img
                src={details.img_url === "" ? noIMG : details.img_url}
                alt=""
              />
              <div>
                <h3>{details.username}</h3>
                <p>{details.about_me}</p>
              </div>
            </div>
            <div className="action">
              {userProfileDetails.ifUserFollowing.find(
                (data: { username: string }) =>
                  data.username === details.username
              ) ? (
                <button
                  onClick={() => unfollowBtn(details.username)}
                  className="unfollow"
                >
                  Unfollow
                </button>
              ) : (
                <button onClick={() => followUser(details.username)}>
                  Follow
                </button>
              )}
            </div>
          </div>
        ))}
      </div>}
    </>
  );
}

export default FollowUser