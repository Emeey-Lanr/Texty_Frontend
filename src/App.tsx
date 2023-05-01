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
import { collectUserProfile } from "./Features/Profile"

import { useNavigate } from "react-router-dom";
import { get } from "http";
import UserNotification from "./Components/UserNotification";
import Group from "./Components/Group";


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
  // 
  const [loginModalState, setLoginModalState] = useState<boolean>(false)
  const [loginModalMessage, setLoginModalMessage] = useState<string>("")
  // Spinner
  const [spinnerState, setSpinnerState] = useState<boolean>(false)

  
  const showSideBarBtn = () => {
  setHideBarBool(false)

  }
  const hideSideBarBtn = () => {
    setHideBarBool(true)
  }

  // Group, Post Creation status
  const [openPrePost, setOpenPrePost] = useState<boolean>(false)
  const [createPostModal, setCreatePostModal] = useState<boolean>(false)
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
  
  
  const sendUserData = (
    currentUserIdentification: string, id: number, username: string, about_me: string | null, img_url: string | null, followers:[], following: [],checkBothFollowing: [],
    checkBothFollowers: [], post: [], isLoggedIn: boolean, loggedInUserNotification:[]) => {
    dispatch(collectUserProfile({
      registerdUserIdentification: currentUserIdentification,
      id: id,
      username: username,
      about_me: about_me,
      img_url: img_url,
       followers: followers,
      following: following,
      // these two get the looged in user followers and following incase both user are found if not it's empty
      ifUserFollowing: checkBothFollowing,
      ifUserFollowers: checkBothFollowers,
      post: post,
      isLoggedIn: isLoggedIn,
      loggedInUserNotification:loggedInUserNotification
     }))
           
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
           socket.emit("userInfoOrSearchedForInfo", {userinfo:result.data.userData,userLookedFor:result.data.lookedForUser})
          switch (result.data.message) {
            case "Only the user logged in is found": {
              return sendUserData(result.data.userData.username, result.data.userData.id, result.data.userData.username, result.data.userData.about_me, result.data.userData.img_url,
               result.data.followingFollowersUser.followers, result.data.followingFollowersUser.following, [], [], result.data.userData.post, result.data.loggedIn, result.data.userData.notification
)
            };
            case "User Searched for not found": {
              return sendUserData(result.data.userData.username, result.data.userData.id, result.data.userData.username, result.data.userData.about_me, result.data.userData.img_url,
               result.data.followingFollowersUser.followers, result.data.followingFollowersUser.following, [],[], result.data.userData.post, result.data.loggedIn, result.data.userData.notification), setNoUserFound(true)
            }
            
            case "Both users found": {
              return sendUserData(result.data.userData.username, result.data.lookedForUser.id, result.data.lookedForUser.username, result.data.lookedForUser.about_me, result.data.lookedForUser.img_url,
                 result.data.followingFollowersLookedFor.followers,  result.data.followingFollowersLookedFor.following, result.data.followingFollowersUser.following, result.data.followingFollowersUser.followers, result.data.lookedForUser.post, result.data.loggedIn, result.data.userData.notification  )
            };
            case "Only the user searched for is found":{
              return sendUserData(result.data.userData.username, result.data.lookedForUser.id, result.data.lookedForUser.username, result.data.lookedForUser.about_me, result.data.lookedForUser.img_url,
                 result.data.followingFollowersLookedFor.following, result.data.followingFollowersLookedFor.followers,[], [],  result.data.lookedForUser.post, result.data.loggedIn, []  
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
      noUserFound
        
    

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