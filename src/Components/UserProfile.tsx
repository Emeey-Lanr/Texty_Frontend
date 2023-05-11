import "../styles/user.css"
import boxer from "../images/boxer.jpg"
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
import {collectUserProfile, followUser, unfollowViaProfile, unfollowFollowingR, unfollowFollowingViaAnotherUserFFlistR} from "../Features/Profile"
import axios from "axios"
import UserNotification from "./UserNotification"
import { useNavigate } from "react-router-dom"
import ActionModal from "./ActionModal"
import ChattingSpace from "./ChattingSpace"
import {setOrOpenChat} from "../Features/Message"
import Chat from "./Chat"
// import { followerUser} from "../Features/Profile"


const UserProfile = () => {
  const { userEndPoint, setPostModalStatus, setUsername, getUserProfile, noUserFound,followFunction , unfollowFunction,  setGroupChatOrPrivateChatOpening, incomingMessageDetails} = useContext(appContext)
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
  const openPost = () => {
    setPostModalStatus(true)
    // socket.emit("shit", { name: "Emmeey" })
    
  }
  const preventBtn = () => {
    alert(20)
  
    setM(2)

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
  return (
    <>
      {noUserFound ? <>
        <div>
          <p>No user found</p>
        </div>
      </> :
        <>
        
          <div className="user_profile_div">
   
            <div className="background_pic">

            </div>
            <div className="user_pic" >
              <img src={boxer} alt="" />

            </div>
            <div className="user_username">
              <h2>{userProfileDetails.username}</h2>
              <div>
                {(userProfileDetails.username !== userProfileDetails.registerdUserIdentification) &&
                  <>
                  {userProfileDetails.followers.find((name: { username: string }) => name.username === userProfileDetails.registerdUserIdentification) ?
                    <button onClick={() =>  unfollow()} style={{ background: "black", color: "white" }}>Following</button> : <button onClick={() => follow()}>Follow</button>}
                  </>
                  
                }
                
                {/* {userProfileDetails.username !== userProfileDetails.registerdUserIdentification && <button>Following</button>} */}
              </div>
              
            </div>
            
            
            <div className="following_followers">
              <button onClick={()=>openFollowing()}>{userProfileDetails.following.length} Following</button>
              <button onClick={()=>openFollowers()}>{userProfileDetails.followers.length} Folowers</button>
            </div>
            <div className="about_Me">
              <div className="caption_edit_div">
                <div>
                  <h3>About Me</h3>
                </div>
                 <div>
                  {userProfileDetails.username === userProfileDetails.registerdUserIdentification ? <button>Edit</button> : <button onClick={()=>chatWithBtn()}>{<BiChat/>}</button>}
                </div>
             
            
              </div>
       
              <p>  de  praesentium architecto soluta officia quae earum cupiditate neque ullam? Nostrum ab consequuntur ad nesciunt?</p>
        
            </div>
            <div className="post_heading">
              <h2>POST</h2>
            </div>
            <div className="post_container">
        
              <button className="post_div" onClick={() => openPost()}>
                <div className="posted">
                  <p>I'm not fine, It's good to okay</p>
                </div>
                <div className="poster">
                  <div className="username_img">
                    <img src={boxer} alt="" />
                    <span>Emeey Lanr</span>
                  </div>
          
                  <div className="postaction" style={{ position: "relative" }}>
                    <button onClick={() => preventBtn()}><BiHeart /> <span>12k</span></button> <button><BiChat /> <span>12k</span></button>
                    {userProfileDetails.username === userProfileDetails.registerdUserIdentification && <button><BiTrash /></button>}
                    
                  </div>
            
                </div>
              </button>

        
            </div>
     
      
          </div>
          {openFollowersFollowing && <Friends setOpenFollowersFollowing={setOpenFollowersFollowing} openFFNumber={openFFNumber} setOpenFFNumber={setOpenFFNumber} />}
          <ChattingSpace/>
          <PostModal />
          <Create />
          <Navbar />
          <Sidebar />
          <ActionModal/>
        </>}
      
     
    </>
 
   
  )
}

export default UserProfile