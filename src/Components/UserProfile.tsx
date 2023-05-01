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
import {collectUserProfile, followUser} from "../Features/Profile"
import axios from "axios"
import UserNotification from "./UserNotification"
import { useNavigate } from "react-router-dom"
// import { followerUser} from "../Features/Profile"


const UserProfile = () => {
  const { userEndPoint, setPostModalStatus, setUsername, getUserProfile, noUserFound, } = useContext(appContext)
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
  const followedUserLookedFor = () => {
     socket.on("followedUserLookedFor", (data:any) => {
      console.log(data, "Jhgfdfghjk")
      dispatch(followUser(data.lookedForUserFollowers))
    })
  }

  // This is meant for the user looked for if he or she
  // is online and he's in user profile he recieve the increasement in his followers
  const ifFollowed = () => {
    socket.on("followedNotification", (data:{addedFollowers:{}[] | []}) => {
      dispatch(followUser(data.addedFollowers))
    })
  }
  useEffect(() => {
    if (socket) {
      followedUserLookedFor()
      ifFollowed()
    
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
        socket.emit("followUserSearchedForFromProfile", {ownerUsername:userProfileDetails.registerdUserIdentification, userTheyTryingToFollow:userProfileDetails.username} )
        axios.post(`${userEndPoint}/followUser`, {ownerUsername:userProfileDetails.registerdUserIdentification, userTheyTryingToFollow:userProfileDetails.username}).then((result) => {
        if (result.data.status) {
            // getUserProfile(`${id.id}`, "")
        } else {
            
        }
    })
    }
  
  }
  const unfollow = () => {
    
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
                    <button onClick={() => unfollow()} style={{ background: "black", color: "white" }}>Following</button> : <button onClick={() => follow()}>Follow</button>}
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
                  {userProfileDetails.username === userProfileDetails.registerdUserIdentification ? <button>Edit</button> : <button>{<BiChat/>}</button>}
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
          {openFollowersFollowing && <Friends setOpenFollowersFollowing={setOpenFollowersFollowing} openFFNumber={ openFFNumber} setOpenFFNumber={ setOpenFFNumber} />}
          <PostModal />
          <Create />
          <Navbar />
          <Sidebar />
        </>}
      
     
    </>
 
   
  )
}

export default UserProfile