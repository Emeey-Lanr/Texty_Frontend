import {FC, createContext, useState,useRef, useEffect } from "react";
import IndexPage from "./Components/IndexPage";
import SignIn from "./Components/SignIn";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";
// import {Route, Routes} from "react-router-dom"
import {Route, Routes} from  "react-router-dom"

import UserProfile from "./Components/UserProfile";
import LoginMessageModal from "./Components/LoginMessageModal";
import { appModelContext } from "./Model/AppModelContext";
import Home from "./Components/Home";

import {io, Socket }  from "socket.io-client";
import Search from "./Components/Search";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { collectUserProfile, followUser,newUserPost } from "./Features/Profile"
import {loadMessage, incomingMesageR} from "./Features/Message"

import { useNavigate } from "react-router-dom";
import { get } from "http";
import UserNotification from "./Components/UserNotification";
import Group from "./Components/Group";
import {followerNewHomePost,userNewHomePost} from "./Features/HomePost"


export const appContext = createContext(appModelContext)


const App = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  
  // const socket = useRef(Socket("http"))
  
  // Socket
   const socket = useSelector((state: any) => state.socket.value)
  //Route identification 
  // useEffect(() => {
  //   dispatch(connectSocket())
  // },[  ])
  const [routeIdentification, setRouteIdentification] = useState<string>("")
  const [hideSideBar, setHideSideBar] = useState<string>("hidesidebar")
  const [hidebarBool, setHideBarBool] = useState<boolean>(true)
  const [userEndPoint, setuserEndPoint] = useState<string>("http://localhost:2001/user")
  const [messageEndPoint, setMessageEndPoint] = useState<string>("http://localhost:2001/message")
  // 
  const [loginModalState, setLoginModalState] = useState<boolean>(false)
  const [loginModalMessage, setLoginModalMessage] = useState<string>("")
  // Spinner
  const [spinnerState, setSpinnerState] = useState<boolean>(false)

  // Edit Profile modal state
  const [openEditProfile, setOpenEditProfile] =  useState<boolean>(false)

  
  const showSideBarBtn = () => {
  setHideBarBool(false)

  }
  const hideSideBarBtn = () => {
    setHideBarBool(true)
  }

  // Group, Post Creation status
  const [openPrePost, setOpenPrePost] = useState<boolean>(false)
  const [createPostModal, setCreatePostModal] = useState<number>(0)
  const [createGroupModal, setCreateGroupModal] = useState<boolean>(false)

  // Post Modal
  const [postModalStatus, setPostModalStatus] = useState<boolean>(false)

  // name
  const [username, setUsername] = useState("")

  // get user details 
  // If no user is found 
  const [noUserFound,setNoUserFound] = useState<boolean>(false)
  const verifyUserProfile: string = `${userEndPoint}/verifyUserProfile`
  // const userProfileDetails = useSelector((state: any) => state.userprofile.value)
  
  
  // Action modal for state, includes delete,logout
  const [actionModalId, setActionModalId] = useState<number>(-1)
  const [openActionModal, setOpenActionModal] = useState<boolean>(false)

  // Meant for opening private and group chat 
  const [groupChatOrPrivateChatOpening, setGroupChatOrPrivateChatOpening] = useState<number>(0)
  // For opening notifiaction and group details modal
  const [showGroupModal, setShowGroupModal] =useState<number>(0)

  // New Post Alert
  const [newPostAlert, setNewPostAlert] = useState<boolean>(false)
  const sendUserData = (
    currentUserIdentification: string, registeredUserImgUrl:string, userId: string, notUserId:string, username: string, about_me: string | null, img_url: string | null, background_img_url:string, followers:[], following: [],checkBothFollowing: [],
    checkBothFollowers: [], post: [], isLoggedIn: boolean, loggedInUserNotification:[], userMessages: []) => {
    dispatch(collectUserProfile({
      registerdUserIdentification: currentUserIdentification,
      registeredUserImgUrl: registeredUserImgUrl,
      userId: userId,
      notuserId:notUserId,
      username: username,
      about_me: about_me,
      img_url: img_url,
      background_img_url:background_img_url,
       followers: followers,
      following: following,
      // these two get the looged in user followers and following incase both user are found if not it's empty
      ifUserFollowing: checkBothFollowing,
      ifUserFollowers: checkBothFollowers,
      post: post,
      socketPost:[],
      isLoggedIn: isLoggedIn,
      loggedInUserNotification:loggedInUserNotification
     }))
     dispatch(loadMessage(userMessages))
           
  }

  const getUserProfile = (id:string, route:string):any =>  {
    let check  = false
    let appUserToken = {id:""}
  if (localStorage.xxxxxxxxxxxxxxx) {
    appUserToken = JSON.parse(localStorage.xxxxxxxxxxxxxxx)
    check = true
  }else{
   check = false
  }
 
      axios.get(verifyUserProfile, {
      headers: {
        "Authorization": `bearer,${check ? appUserToken.id : ";d'dm"},${id}`,
        "Content-Type":"application/json"
      }
      }).then((result) => {
        if (result.data.status) {
          console.log(result.data,"this is your data")
          setNoUserFound(false)
          //  switch(result.data.)
           socket.emit("userInfoOrSearchedForInfo", {userinfo:result.data.userData,userLookedFor:result.data.lookedForUser, usermessage:result.data.userMessage, post:result.data.post})
          switch (result.data.message) {
            case "Only the user logged in is found": {
              return sendUserData(result.data.userData.username, result.data.userData.img_url, result.data.userData.id, '0', result.data.userData.username, result.data.userData.about_me, result.data.userData.img_url,result.data.userData.background_img_url,
               result.data.followingFollowersUser.followers, result.data.followingFollowersUser.following, [], [], result.data.userData.post, result.data.loggedIn, result.data.userData.notification,  result.data.userMessage

)
            };
            case "User Searched for not found": {
              return sendUserData(result.data.userData.username, result.data.userData.img_url, result.data.userData.id, '0', result.data.userData.username, result.data.userData.about_me, result.data.userData.img_url,result.data.userData.background_img_url,
               result.data.followingFollowersUser.followers, result.data.followingFollowersUser.following, [],[], result.data.userData.post, result.data.loggedIn, result.data.userData.notification, result.data.userMessage), setNoUserFound(true)
            }
            
            case "Both users found": {
              return sendUserData(result.data.userData.username, result.data.userData.img_url,result.data.userData.id, result.data.lookedForUser.id, result.data.lookedForUser.username, result.data.lookedForUser.about_me, result.data.lookedForUser.img_url, result.data.lookedForUser.background_img_url,
                 result.data.followingFollowersLookedFor.followers,  result.data.followingFollowersLookedFor.following, result.data.followingFollowersUser.following, result.data.followingFollowersUser.followers, result.data.lookedForUser.post, result.data.loggedIn, result.data.userData.notification, result.data.userMessage )
            };
            case "Only the user searched for is found":{
              return sendUserData(result.data.userData.username, result.data.userData.img_url, result.data.userData.id, result.data.lookedForUser.id, result.data.lookedForUser.username, result.data.lookedForUser.about_me, result.data.lookedForUser.img_url,result.data.lookedForUser.background_img_url,
                 result.data.followingFollowersLookedFor.following, result.data.followingFollowersLookedFor.followers,[], [],  result.data.lookedForUser.post, result.data.loggedIn, [], []  
              )
              }
            
          }
          // this emit the user info to replace it with what is on the server side
       
        
           
        } else {
          switch (route) {
            case "home": {
              return navigate("/signin")
            };
            case "": {
              return setNoUserFound(true)
              }
           }
        }
        
       
      
    })
  }
  
  

  const newPostForFollowersFunction = () => {
    socket.on("newPostForFollowers", (data: any) => {
      setNewPostAlert(true)
      console.log(data)
      const postComing = [data.newPost]
      dispatch(followerNewHomePost(data.newPost))
      // dispatch()
      
    })
  }
  const userNewPostFunction = () => {
    socket.on("userNewPost", (data: any) => {
      console.log(data)
      setOpenPrePost(false)
      setCreatePostModal(0)
      dispatch(userNewHomePost(data.homePost.post))
      dispatch(newUserPost(data.post))
      
    })
  }
  const incomingMessageDetails = () => {
        socket.on("incomingMessage", (data:{owner:string, notowner:string, notowner_imgurl:string})=>{
          console.log(data)
           dispatch(incomingMesageR(
            {
                chattingWithName: data.notowner,
                incomingMessage: data
            }))
        })
    }
 
  // follow someone function
  const followFunction = async (socketName:string, loggedInUsername: string, userTheyWantToFollow: string, notificationWords:string) => {
    socket.emit(`${socketName}`, { ownerUsername: loggedInUsername, userTheyTryingToFollow: userTheyWantToFollow, notificationWords:notificationWords})
      const follow = await axios.post(`${userEndPoint}/followUser`, {ownerUsername:loggedInUsername, userTheyTryingToFollow:userTheyWantToFollow, notificationWords:notificationWords})
    
  }

  const unfollowFunction = async (socketName:string, userLoggedInUserName: string, userTheyWantToUnfollow: string) => {
    socket.emit(`${socketName}`, { userLoggedInUserName, userTheyWantToUnfollow})
    const unfollow = await axios.post(`${userEndPoint}/unfollowUser`, {userLoggedInUserName, userTheyWantToUnfollow})
    
  }

  return (
  
    <appContext.Provider value={{
       
      routeIdentification,
      setRouteIdentification,
        userEndPoint,
        hideSideBar,
        setHideSideBar,
        showSideBarBtn,
      hidebarBool,
      hideSideBarBtn,
// // 
      loginModalState,
   setLoginModalState,
      loginModalMessage,
      setLoginModalMessage,
      // 
      spinnerState,
      setSpinnerState,
      openPrePost,
   setOpenPrePost,
   createPostModal,
   setCreatePostModal,
   createGroupModal,
   setCreateGroupModal,

  //  
      postModalStatus,
      setPostModalStatus,
      
      // 
      username,
      setUsername,
      getUserProfile,

      // if no user is found
      noUserFound,
        // follow Function
        followFunction,
        // unfollow User
      unfollowFunction,
        
      // action modal
      actionModalId,
      setActionModalId,
      openActionModal,
      setOpenActionModal,
      groupChatOrPrivateChatOpening,
      setGroupChatOrPrivateChatOpening,
      showGroupModal,
      setShowGroupModal,

      // New Post
      newPostAlert,
      setNewPostAlert,
      newPostForFollowersFunction,
      userNewPostFunction,
    
      // Incoming message
      incomingMessageDetails,
      messageEndPoint,

      // Edit profile modal
      openEditProfile,
      setOpenEditProfile

  } }>
      <Routes>
     <Route path="/" element={<IndexPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/group/:id/:nid" element={<Group />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/:id" element={<UserProfile />}/>
        <Route path="/notification" element={<UserNotification/>}/>
      
      </Routes>
      </appContext.Provider>
  
   
  )
}

export default App;