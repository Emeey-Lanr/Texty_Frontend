import "../styles/user.css"
import boxer from "../images/boxer.jpg"
import noImg from "../images/noImage.png"
import {useEffect, useState, useContext, useRef, useReducer} from "react"
import { BiHeart, BiTrash, BiImageAdd, BiPlus, BiChat } from "react-icons/bi"
import { useParams, } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import Create from "./Create"
import PostModal from "./PostModal"
import Friends from "./Friends"
import { appContext, } from "../App"
import { io, Socket } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux"
import {
  collectUserProfile, followUser, unfollowViaProfile, unfollowFollowingR,
  unfollowFollowingViaAnotherUserFFlistR, likesUserPost, commentProfileR, unBlockedVPR,
} from "../Features/Profile"
import axios from "axios"
import UserNotification from "./UserNotification"
import { useNavigate } from "react-router-dom"
import ActionModal from "./ActionModal"
import ChattingSpace from "./ChattingSpace"
import {setOrOpenChat} from "../Features/Message"
import Chat from "./Chat"
import ProfileEdit from "./ProfileEdit"
import { POST } from "../Features/HomePost"
import {getCurrentPost} from "../Features/CurrentPost"
import { FaComment, FaHeart } from "react-icons/fa"
import LoginSpinner from "./LoginSpinner"
// import { followerUser} from "../Features/Profile"


const UserProfile = () => {
  const { userEndPoint, setPostModalStatus,
    setUsername, getUserProfile,
    noUserFound,userProfileLoading,  followFunction, unfollowFunction,
    setGroupChatOrPrivateChatOpening, incomingMessageDetails,
    setOpenEditProfile, likeUnlikeSocketFunction, blocked, blockedNumber,incomingBlockedSocket} = useContext(appContext)
  let naviagte = useNavigate()
  let dispatch = useDispatch()
  const socket = useSelector((state: any) => state.socket.value)
  const userProfileDetails = useSelector((state: any) => state.userprofile.value)
  const [openFollowersFollowing, setOpenFollowersFollowing] = useState<boolean>(false)
  const [checkIfFollowing, setCheckIfFollowing] = useState([])
  // the number used to open either follwers or following
  const [openFFNumber, setOpenFFNumber] = useState<number>(0)
  
  const [m, setM] = useState(0)
  let id = useParams()



  
  useEffect(() => {
    getUserProfile(`${id.id}`, "")
 
  }, [])
  // this meant for the user looking for another user
  // to show the user looked for followers have increased when he follows
  // Both are meant for following
  // used when user registeredUsername is the same as the user
  const followSocket = () => {
    socket.on("followedUserLookedFor", (data: any) => {
      console.log(data.loggedInUser, data)
      // This errors happens based on the user yo want to follow is not found as the backend
      if(!data.error){
      // if (data.loggedInUser === userProfileDetails.username) {
      
      //    console.log("You are the one on your profile", data)
      // } else {
        dispatch(followUser(data.lookedForUserFollowers))
      //  console.log("you are not the one on your profile")
    //  }
      } else {
        alert("an error occured")
     }
              
   })
     
      
  }
  const followSocket2Function = () => {
    socket.on("userFollowingWhenFollowing", (data:any)=>{
      if(!data.error){
          dispatch(unfollowFollowingR(data.followingDetails))
      }else{
        alert("an error occured couldn't follow")
      }
    })
    
  }
  const followSocket3Function = () => {
    socket.on("followingViaAnotherPersonFFlist", (data: any) => {
      if (!data.error) {
        dispatch(unfollowFollowingViaAnotherUserFFlistR(data.followingDetails))
      } else {
        alert("an error occured, couldn't follow")
      }
    })
  }
 

  // This is meant for the user looked for if he or she
  // is online and he's in user profile he recieve the increasement in his followers
  const ifFollowed = () => {
    socket.on("followedNotification", (data:any) => {
      console.log(data.loggedInUser)
      if (!data.error) {
        if (data.loggedInUser === userProfileDetails.username) {
          dispatch(followUser(data.addedFollowers))
        }
      }
      
    })
  }


  const unFollowedSocket = () =>{
    socket.on("unFollowed", (data: any) => {
      console.log(data)
      if (!data.error) {
       
          dispatch(unfollowViaProfile(data.userTheyWantToUnFollowFollowers))
      
      } else {
        alert("an error occured, couldn't unfollow")
      }
       
      
      
    })
  }

  const unfollowSocket2Function = () => {
    socket.on("userFollowingWhenUnFollowing", (data: any) => {
      if (!data.error) {
        dispatch(unfollowFollowingR(data.userLoggedInFollowing))
      } else {
        alert("an error occur couldn't unfollow")
      }
    })
  }
  const unfollowSocket3Function = () => {
    socket.on("unfollowingViaAnotherPersonFFlist", (data: any) => {
      if (!data.error) {
        dispatch(unfollowFollowingViaAnotherUserFFlistR(data.userLoggedInFollowing))
      } else {
        alert("an error occured, couldn't unfollow")
      }
    })
  }

  const incomingLikesSocketFunction = () => {
    const dispatchFunction = (postedBy:string, time:string, likesBox:string) => {
          dispatch(likesUserPost({postedBy: postedBy, time:time, likesBox:likesBox}))
    }

    socket.on("likeOrUnlike1", (data: any) => {
      console.log(data)
  
      dispatchFunction(data.postedBy, data.time, data.likes)
    })
     socket.on("likeOrUnlike2", (data: any) => {
       dispatchFunction(data.postedBy, data.time, data.likes)
    })
  }
   const incomingCommentSocketFunction = () => {
    const dispatchFunction = (postedBy:string, time:string, commentBox:string) => {
          dispatch(commentProfileR({postedBy: postedBy, time:time, commentBox}))
    }

    socket.on("comment1", (data: any) => {
      console.log(data)
  
      dispatchFunction(data.postedBy, data.time, data.likes)
    })
     socket.on("comment2", (data: any) => {
       dispatchFunction(data.postedBy, data.time, data.likes)
    })
  }
  const blockedVPFunction = () => {
    socket.on("blockedVP", (data:any) => {
      console.log(data)
       dispatch(unBlockedVPR({ userBlocked: data.userDetails, userToBeUnBlocked:data.userBlockedUsername, userToBeUnBlockedBlocked:data.userBlockedDetails}))
    })
  }
  const unblockedVPFunction = () => {
    socket.on("unblockedVP", (data: any) => {
      console.log(data, "you've unblocked this nigga")
       dispatch(unBlockedVPR({ userBlocked: data.userDetails, userToBeUnBlocked:data.userBlockedUsername, userToBeUnBlockedBlocked:data.userBlockedDetails}))
    })
  }
  useEffect(() => {
    if (socket) {
      followSocket()
      followSocket2Function()
      followSocket3Function()
      ifFollowed()
      unFollowedSocket()
      unfollowSocket2Function()
      unfollowSocket3Function()
      incomingMessageDetails()
      incomingLikesSocketFunction()
      incomingCommentSocketFunction()
      incomingBlockedSocket()
      blockedVPFunction()
      unblockedVPFunction()
   
    }
     
  
    
  })
  
  
  // const socket = Socket(appEndPoint)
 
  // useEffect(() => {
  //   socket.current.on("hello", (data: object) => {
  //     console.log(data)
  //   })
  //   // socket.emit("name", {name:"oyelowo"})
  //   // console.log(id.id)
  // }, [])
  const openPost = (name:string, time:string) => {
    setPostModalStatus(true)
    dispatch(
      getCurrentPost(userProfileDetails.post.find((details: { postedBy: string, time: string })=>details.postedBy === name && details.time === time)))
    // socket.emit("shit", { name: "Emmeey" })
    
  }
  
  const openFollowers = () => {
    setOpenFollowersFollowing(true)
    setOpenFFNumber(0)
  }
  const openFollowing = () => {
    setOpenFollowersFollowing(true)
    setOpenFFNumber(1)
    
  }
  const followerDetail = {
    accountOwner: "",
    personTheyWantToFollow:"",
  }

  // const followerUserEndPoint = 

  const follow = () => {
  
    if (userProfileDetails.registerdUserIdentification !== "") {
      // this check if probably you are among the searched for user followers that means you are following the search for user nad if he not folloing you
      // the notification should be "followed back not follows you"
      let notificationWords = ""
      if (userProfileDetails.followers.find((name: { username: string }) => name.username === userProfileDetails.registerdUserIdentification)) {
        notificationWords = "followed you"
      } else {
        notificationWords = "follows you"
      }

       followFunction("followSocket1" ,userProfileDetails.registerdUserIdentification, userProfileDetails.username, notificationWords)
     
      
    }
  
  }

  
  const unfollow = () => {
    console.log(userProfileDetails.registerdUserIdentification, userProfileDetails.username)
    unfollowFunction("unfollowSocket1",userProfileDetails.registerdUserIdentification, userProfileDetails.username)
  }
  const chatWithBtn = () => {
    dispatch(setOrOpenChat({ name:userProfileDetails.username, notuser_imgUrl: userProfileDetails.img_url}))
    setGroupChatOrPrivateChatOpening(1) 
  }
  // const likesBtn = (name:string, time:string) => {
  //  socket.emit("like", {user:userProfileDetails.registerdUserIdentification, postedBy:name, time:time, route:"profile"})

  // }
  const unlikeBtn = (name:string, time:string) => {
    
  }
  
  const unblockBtn = () => {
    if (userProfileDetails.blockedNumber === 2) {
          const blockUser =  axios.put(`${userEndPoint}/unBlockUser`, { userLoggedIn: userProfileDetails.registerdUserIdentification, userToBeBlocked:userProfileDetails.username  })
      socket.emit("unblockVP", {userToBeUnblocked:userProfileDetails.username, user:userProfileDetails.registerdUserIdentification})
    }
    
  }
  const blockVPBtn = () => {
    const blockUser = axios.put(`${userEndPoint}/blockUser`, { userLoggedIn: userProfileDetails.registerdUserIdentification, userToBeBlocked: userProfileDetails.username  })
      socket.emit("blockVP", {userToBeUnblocked:userProfileDetails.username, user:userProfileDetails.registerdUserIdentification}) 
  }
  const [magicT, setMagicT] = useState("magicT1")
  const magicDivBtn = () => {
    if(magicT === "magicT1" ){
 setMagicT("magicT2")
    }else{
       setMagicT("magicT1")
    }
   
    
  }
  return (
    <>
      {!userProfileLoading ? (
        <div className="userProfileLoading_div">
          {/* <LoginSpinner/> */}
          <button onClick={() => magicDivBtn()}>move...</button>
          <div className={`${magicT}`}></div>
        </div>
      ) : (
        <>
          {noUserFound ? (
            <>
              <div>
                <p>No user found</p>
              </div>
            </>
          ) : (
            <>
              <div className="user_profile_parent_div">
                <div className="user_profile_parent_div1"></div>
                <div className="user_profile_div">
                  <div
                    className="background_pic"
                    style={{ backgroundImage: `url(${boxer})` }}
                  >
                    <div
                      className=""
                      style={{ backgroundColor: "#0000004a" }}
                    ></div>
                  </div>
                  <div className="user_pic">
                    <img
                      src={
                        userProfileDetails.img_url === ""
                          ? noImg
                          : userProfileDetails.img_url
                      }
                      alt=""
                    />
                  </div>
                  <div className="user_username">
                    <h2>{userProfileDetails.username}</h2>
                    <div className="state_indication_div">
                      {userProfileDetails.username !==
                        userProfileDetails.registerdUserIdentification && (
                        <>
                          {userProfileDetails.blockedState ? (
                            <>
                              {(userProfileDetails.blockedNumber === 2 ||
                                userProfileDetails.blockedNumber === 3) && (
                                <button
                                  className="bfu"
                                  onClick={() => unblockBtn()}
                                  style={{ background: "red", color: "white" }}
                                >
                                  Blocked
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              {userProfileDetails.followers.find(
                                (name: { username: string }) =>
                                  name.username ===
                                  userProfileDetails.registerdUserIdentification
                              ) ? (
                                <button
                                  className="bfu"
                                  onClick={() => unfollow()}
                                  style={{
                                    background: "black",
                                    color: "white",
                                  }}
                                >
                                  Following
                                </button>
                              ) : (
                                <button
                                  className="bfu"
                                  onClick={() => follow()}
                                >
                                  Follow
                                </button>
                              )}
                            </>
                          )}
                        </>
                      )}

                      {/* {userProfileDetails.username !== userProfileDetails.registerdUserIdentification && <button>Following</button>} */}
                      {userProfileDetails.username !==
                        userProfileDetails.registerdUserIdentification && (
                        <div className="follow_unfollow_block_space">
                          <button className="follow_unfollow_block_space_action_show_btn">
                            <span></span>
                            <span></span>
                            <span></span>
                          </button>
                          <div className="fub_div">
                            <>
                              {userProfileDetails.followers.find(
                                (name: { username: string }) =>
                                  name.username ===
                                  userProfileDetails.registerdUserIdentification
                              ) ? (
                                <button
                                  className=""
                                  onClick={() => unfollow()}
                                  style={{
                                    background: "black",
                                    color: "white",
                                  }}
                                >
                                  Following
                                </button>
                              ) : (
                                <button className="" onClick={() => follow()}>
                                  Follow
                                </button>
                              )}
                            </>
                            <></>
                            <>
                              {userProfileDetails.registeredUserBlocked.find(
                                (name: { username: string }) =>
                                  name.username === userProfileDetails.username
                              ) ? (
                                <button onClick={() => unblockBtn()}>
                                  Unblock
                                </button>
                              ) : (
                                <button onClick={() => blockVPBtn()}>
                                  Block
                                </button>
                              )}
                            </>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {userProfileDetails.blockedState ? (
                    <>
                      <div className="block_user">
                        <div>
                          {userProfileDetails.blockedNumber === 2 && (
                            <p>
                              you blocked <br /> @ {userProfileDetails.username}
                            </p>
                          )}
                          {userProfileDetails.blockedNumber === 3 && (
                            <p>
                              @{userProfileDetails.username} <br></br>has
                              blocked you
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="following_followers">
                        <button onClick={() => openFollowing()}>
                          {userProfileDetails.following.length} Following
                        </button>
                        <button onClick={() => openFollowers()}>
                          {userProfileDetails.followers.length} Folowers
                        </button>
                      </div>
                      <div className="about_Me">
                        <div className="caption_edit_div">
                          <div>
                            <h3>About Me</h3>
                          </div>
                          <div>
                            {userProfileDetails.username ===
                            userProfileDetails.registerdUserIdentification ? (
                              <button onClick={() => setOpenEditProfile(true)}>
                                Edit
                              </button>
                            ) : (
                              <button onClick={() => chatWithBtn()}>
                                {<BiChat />}
                              </button>
                            )}
                          </div>
                        </div>

                        <p>{userProfileDetails.about_me}</p>
                      </div>
                      <div className="post_heading">
                        <h2>POST</h2>
                      </div>
                      <div className="post_container">
                        {userProfileDetails.post.length > 0 ? (
                          userProfileDetails.post.map((details: POST) => (
                            <button
                              className="post_div"
                              disabled={true}
                              onClick={() =>
                                openPost(details.postedBy, details.time)
                              }
                            >
                              <div
                                className="posted"
                                onClick={() =>
                                  openPost(details.postedBy, details.time)
                                }
                              >
                                <p>{details.text}</p>
                              </div>
                              <div className="poster">
                                <div className="username_img">
                                  <img
                                    onClick={() => alert(20)}
                                    src={
                                      userProfileDetails.img_url === ""
                                        ? noImg
                                        : userProfileDetails.img_url
                                    }
                                    alt=""
                                  />
                                  <span style={{ color: "white" }}>
                                    {userProfileDetails.username}
                                  </span>
                                </div>

                                <div
                                  className="postaction"
                                  style={
                                    userProfileDetails.username ===
                                    userProfileDetails.registerdUserIdentification
                                      ? {
                                          position: "relative",
                                          gridTemplateColumns: "30% 30% 30%",
                                        }
                                      : {
                                          position: "relative",
                                          gridTemplateColumns: "30% 30%",
                                        }
                                  }
                                >
                                  <>
                                    {details.likes.find(
                                      (data) =>
                                        data ===
                                        userProfileDetails.registerdUserIdentification
                                    ) ? (
                                      <button
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                        onClick={() =>
                                          likeUnlikeSocketFunction(
                                            "unlike",
                                            details.time,
                                            details.postedBy,
                                            "unlike"
                                          )
                                        }
                                      >
                                        <FaHeart style={{ color: "red" }} />{" "}
                                        <span style={{fontSize:"0.7rem", padding:"0 3px"}}>
                                          {details.likes.length > 0 &&
                                            details.likes.length}
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          likeUnlikeSocketFunction(
                                            "like",
                                            details.time,
                                            details.postedBy,
                                            "like"
                                          )
                                        }
                                      >
                                        <BiHeart style={{fontSize:"1.8rem"}} />{" "}
                                        <span>
                                          {Number(details.likes.length) > 0 &&
                                            details.likes.length}
                                        </span>
                                      </button>
                                    )}
                                  </>
                                  <button
                                   
                                    onClick={() =>
                                      openPost(details.postedBy, details.time)
                                    }
                                  >
                                    <FaComment />{" "}
                                    <span style={{ fontSize: "0.5rem", padding:"0 4px" }}>
                          
                                      {details.comment.length > 0 &&
                                        details.comment.length}
                                    </span>
                                  </button>
                                  {/* {userProfileDetails.username ===
                                    userProfileDetails.registerdUserIdentification && ( */}
                                    <button>
                                      <div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                      </div>
                                    </button>
                                  {/* )} */}
                                </div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {openFollowersFollowing && (
                <Friends
                  setOpenFollowersFollowing={setOpenFollowersFollowing}
                  openFFNumber={openFFNumber}
                  setOpenFFNumber={setOpenFFNumber}
                />
              )}
              <ChattingSpace />
              <PostModal />
              <Create />
              <Navbar />
              <Sidebar />
              <ActionModal />
              <ProfileEdit />
            </>
          )}
        </>
      )}
    </>
  );
}

export default UserProfile