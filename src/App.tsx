import { FC, createContext, useState, useRef, useEffect } from "react";
import IndexPage from "./Components/IndexPage";
import SignIn from "./Components/SignIn";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";
import Home from "./Components/Home";
import Search from "./Components/Search";
import { Route, Routes } from "react-router-dom";

import UserProfile from "./Components/UserProfile";
import LoginMessageModal from "./Components/LoginMessageModal";
import { appModelContext } from "./Model/AppModelContext";



import  {io}  from "socket.io-client";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  collectUserProfile,
  followUser,
  newUserPost,
  blockAndUnBlockUserR,
} from "./Redux/Profile";
import { loadMessage, incomingMesageR } from "./Redux/Message";

import { useNavigate } from "react-router-dom";

import UserNotification from "./Components/UserNotification";
import Group from "./Components/Group";
import { followerNewHomePost, userNewHomePost } from "./Redux/HomePost";
import { useSocket } from "./Socket";
import { getSuggestedUsersDetails } from "./Redux/SuggestedUser";
export const appContext = createContext(appModelContext);

const App = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let API_URL = "https://texty-api.onrender.com"
  // let API_URL = "http://localhost:2001";
  const {socket} = useSocket()


  // Socket
  // const socket = useSelector((state: any) => state.socket.value);
  // userprofile details
  const userProfileDetails = useSelector(
    (state: any) => state.userprofile.value
  );
  //Route identification
  // useEffect(() => {
  //   dispatch(connectSocket())
  // },[  ])
  const [routeIdentification, setRouteIdentification] = useState<string>("");
  const [hideSideBar, setHideSideBar] = useState<string>("hidesidebar");
  const [hidebarBool, setHideBarBool] = useState<boolean>(true);
  const [userEndPoint, setuserEndPoint] = useState<string>(
    `${API_URL}/user`
  );
  const [messageEndPoint, setMessageEndPoint] = useState<string>(
    `${API_URL}/message`
  );
  //
  const [loginModalState, setLoginModalState] = useState<boolean>(false);
  const [loginModalMessage, setLoginModalMessage] = useState<string>("");
  // Spinner
  const [spinnerState, setSpinnerState] = useState<boolean>(false);

  // about me edit
  const [about_meText, setAbout_MeText] = useState<string>("");
  // Edit Profile modal state
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);

  const showSideBarBtn = () => {
    setHideBarBool(false);
  };
  const hideSideBarBtn = () => {
    setHideBarBool(true);
  };

  // Group, Post Creation status
  const [openPrePost, setOpenPrePost] = useState<boolean>(false);
  const [createPostModal, setCreatePostModal] = useState<number>(0);
  const [createGroupModal, setCreateGroupModal] = useState<boolean>(false);

  // Post Modal
  const [postModalStatus, setPostModalStatus] = useState<boolean>(false);

  // name
  const [username, setUsername] = useState("");

  // get user details
  // If no user is found
  const [userProfileLoading, setUserProfileLoading] = useState<boolean>(false);
  const [noUserFound, setNoUserFound] = useState<boolean>(false);
  const [userExitOrNot, setUserExitOrNot] = useState<string>("Wait..")
  const verifyUserProfile: string = `${userEndPoint}/verifyUserProfile`;
  // const userProfileDetails = useSelector((state: any) => state.userprofile.value)

  // Action modal for state, includes delete,logout
  const [actionModalId, setActionModalId] = useState<number>(-1);
  const [openActionModal, setOpenActionModal] = useState<boolean>(false);

  // Meant for opening private and group chat
  const [groupChatOrPrivateChatOpening, setGroupChatOrPrivateChatOpening] =
    useState<number>(0);
  // For opening notifiaction and group details modal
  const [showGroupModal, setShowGroupModal] = useState<number>(0);

  // New Post Alert
  const [newPostAlert, setNewPostAlert] = useState<boolean>(false);
  const [blocked, setBlocked] = useState<boolean>(true);

  const [blockedNumber, setBlockedNumber] = useState<number>(0);
  const sendUserData = (
    blockedState: boolean,
    blockedNumber: number,
    currentUserIdentification: string,
    registeredUserImgUrl: string,
    registeredUserBlocked: [],
    userId: string,
    notUserId: string,
    username: string,
    about_me: string | null,
    img_url: string | null,
    background_img_url: string,
    followers: [],
    following: [],
    checkBothFollowing: [],
    checkBothFollowers: [],
    post: [],
    blocked: [],
    isLoggedIn: boolean,
    loggedInUserNotification: [],
    userMessages: []
  ) => {
    dispatch(
      collectUserProfile({
        blockedState,
        blockedNumber,
        registerdUserIdentification: currentUserIdentification,
        registeredUserImgUrl: registeredUserImgUrl,
        registeredUserBlocked,
        userId: userId,
        notuserId: notUserId,
        username: username,
        about_me: about_me,
        img_url: img_url,
        background_img_url: background_img_url,
        followers: followers,
        following: following,
        // these two get the looged in user followers and following incase both user are found if not it's empty
        ifUserFollowing: checkBothFollowing,
        ifUserFollowers: checkBothFollowers,
        post: post.reverse(),
        blocked,
        socketPost: [],
        isLoggedIn: isLoggedIn,
        loggedInUserNotification: loggedInUserNotification,
      })
    );
    dispatch(loadMessage(userMessages));
  };

  const getUserProfile = (id: string, route: string): any => {
    setUserExitOrNot("Wait..");
    let check = false;
    let appUserToken = { id: "" };
    if (localStorage.xxxxxxxxxxxxxxx) {
      appUserToken = JSON.parse(localStorage.xxxxxxxxxxxxxxx);
      check = true;
    } else {
      check = false;
    }

    axios
      .get(verifyUserProfile, {
        headers: {
          Authorization: `bearer,${check ? appUserToken.id : ";d'dm"},${id}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        console.log(result.data)
        
        if (result.data.status) {
          setNoUserFound(false);
          setAbout_MeText(result.data.userData.about_me);
          setUserProfileLoading(true);
          // if both user have blocked themseleves
          let blockedS = false;
          let blockedNumber = 0;
          if (
            result.data.userData.blocked.find(
              (name: { username: string }) =>
                name.username === result.data.lookedForUser.username
            )
          ) {
            blockedS = true;
            setBlocked(true);
            setBlockedNumber(2);
            blockedNumber = 2;
            // if the user searched for blocks the user logged in
          } else if (
            result.data.lookedForUser.blocked.find(
              (name: { username: string }) =>
                name.username === result.data.userData.username
            )
          ) {
            setBlocked(true);
            setBlockedNumber(3);
            blockedS = true;
            blockedNumber = 3;
          } else {
            setBlocked(false);
          }
          //  switch(result.data.)
          if (result.data.message === "User Searched for not found") {
           setUserExitOrNot("User not found")
         }
           socket?.emit("userInfoOrSearchedForInfo", {
             userinfo: result.data.userData,
             userLookedFor: result.data.lookedForUser,
             usermessage: result.data.userMessage,
             post: result.data.post,
           });
          switch (result.data.message) {
            case "Only the user logged in is found": {
              return sendUserData(
                blockedS,
                blockedNumber,
                result.data.userData.username,
                result.data.userData.img_url,
                result.data.userData.blocked,
                result.data.userData.id,
                "0",
                result.data.userData.username,
                result.data.userData.about_me,
                result.data.userData.img_url,
                result.data.userData.background_img_url,
                result.data.followingFollowersUser.followers,
                result.data.followingFollowersUser.following,
                result.data.followingFollowersUser.following,
                result.data.followingFollowersUser.followers,
                result.data.userData.post.reverse(),
                result.data.userData.blocked,
                result.data.loggedIn,
                result.data.userData.notification,
                result.data.userMessage
              );
            }
            case "User Searched for not found": {
              return (
                sendUserData(
                  blockedS,
                  blockedNumber,
                  result.data.userData.username,
                  result.data.userData.img_url,
                  result.data.userData.blocked,
                  result.data.userData.id,
                  "0",
                  result.data.userData.username,
                  result.data.userData.about_me,
                  result.data.userData.img_url,
                  result.data.userData.background_img_url,
                  result.data.followingFollowersUser.followers,
                  result.data.followingFollowersUser.following,
                  [],
                  [],
                  result.data.userData.post.reverse(),
                  result.data.userData.blocked,
                  result.data.loggedIn,
                  result.data.userData.notification,
                  result.data.userMessage
                ),
             
                setNoUserFound(true)
              );
            }

            case "Both users found": {
              return sendUserData(
                blockedS,
                blockedNumber,
                result.data.userData.username,
                result.data.userData.img_url,
                result.data.userData.blocked,
                result.data.userData.id,
                result.data.lookedForUser.id,
                result.data.lookedForUser.username,
                result.data.lookedForUser.about_me,
                result.data.lookedForUser.img_url,
                result.data.lookedForUser.background_img_url,
                result.data.followingFollowersLookedFor.followers,
                result.data.followingFollowersLookedFor.following,
                result.data.followingFollowersUser.following,
                result.data.followingFollowersUser.followers,
                result.data.lookedForUser.post.reverse(),
                result.data.lookedForUser.blocked,
                result.data.loggedIn,
                result.data.userData.notification,
                result.data.userMessage
              );
            }
            case "Only the user searched for is found": {
              return sendUserData(
                blockedS,
                blockedNumber,
                result.data.userData.username,
                result.data.userData.img_url,
                result.data.userData.blocked,
                result.data.userData.id,
                result.data.lookedForUser.id,
                result.data.lookedForUser.username,
                result.data.lookedForUser.about_me,
                result.data.lookedForUser.img_url,
                result.data.lookedForUser.background_img_url,
                result.data.followingFollowersLookedFor.following,
                result.data.followingFollowersLookedFor.followers,
                [],
                [],
                result.data.lookedForUser.post.reverse(),
                result.data.lookedForUser.blocked,
                result.data.loggedIn,
                [],
                []
              );
            }
          }
          // this emit the user info to replace it with what is on the server side
        } else {
          switch (route) {
            case "home": {
              return navigate("/signin");
            }
            case "": {
                    return(                          
              setUserExitOrNot("Username doesn't exit"),
            setNoUserFound(true))
            }
          }
        }
      });
  };
  const suggestedUserF = () => {
    socket?.on("suggestedUser", (data)=>{
      dispatch(getSuggestedUsersDetails(data.suggestedUser));
      
    })
  }
  const newPostForFollowersFunction = () => {
    socket?.on("newPostForFollowers", (data) => {
      setNewPostAlert(true);

      const postComing = [data.newPost];
      dispatch(followerNewHomePost(data.newPost));
   
    });
  };
  const userNewPostFunction = () => {
    socket?.on("userNewPost", (data) => {

      setOpenPrePost(false);
      setCreatePostModal(0);
      dispatch(userNewHomePost(data.homePost.post));
      dispatch(newUserPost(data.post));
    });
  };
  const [messageError, setMessageError] = useState<string>("")
  const incomingMessageDetails = () => {
    
    socket?.on(
      "incomingMessage",
      (data) => {
        console.log(data)
        if (!data.blocked) {
           dispatch(
             incomingMesageR({
               chattingWithName: data.message.notowner,
               incomingMessage: data.message,
             })
           );
          
        }

        if (data.blocked && data.owner) {
          setMessageError("Message Not Delivered") 
          setTimeout(()=>{
            setMessageError("")
          },1_000)
        }
       
      }
    );
  };

  // follow someone function
  const followFunction = async (
    socketName: string,
    loggedInUsername: string,
    userTheyWantToFollow: string,
    notificationWords: string
  ) => {
    socket?.emit(`${socketName}`, {
      ownerUsername: loggedInUsername,
      userTheyTryingToFollow: userTheyWantToFollow,
      notificationWords: notificationWords,
    });
    const follow = await axios.post(`${userEndPoint}/followUser`, {
      ownerUsername: loggedInUsername,
      userTheyTryingToFollow: userTheyWantToFollow,
      notificationWords: notificationWords,
    });
  };

  const unfollowFunction = async (
    socketName: string,
    userLoggedInUserName: string,
    userTheyWantToUnfollow: string
  ) => {
    socket?.emit(`${socketName}`, {
      userLoggedInUserName,
      userTheyWantToUnfollow,
    });
    const unfollow = await axios.post(`${userEndPoint}/unfollowUser`, {
      userLoggedInUserName,
      userTheyWantToUnfollow,
    });
  };

  const likeUnlikeSocketFunction = async (
    socketName: string,
    time: number,
    name: string,
    state: string
  ) => {
  const data = {
    user: userProfileDetails.registerdUserIdentification,
    postedBy: name,
    time: time,
    state: state,
  };
    socket?.emit(socketName, data);
  
      const likeUnlike = axios.put(`${userEndPoint}/likeUnlikeComment`, data)
    if (state === "like") {
        axios.put(`${userEndPoint}/commentLikesNotification`, { user: userProfileDetails.registerdUserIdentification, postedBy: name, type: "like" })
    }
  };
 

  const incomingBlockedSocket = () => {
    socket?.on("blocked", (data: any) => {

      dispatch(blockAndUnBlockUserR(data.details));
    });
    socket?.on("unblocked", (data: any) => {
    
      dispatch(blockAndUnBlockUserR(data.details));
    });
  };
     
    const [icon, setIcon] = useState("showIcon");
  const [hide, setHide] = useState<string>("show");
  const [alwaysOpenSuggested, setAlwaysOpenSuggested] = useState<string>("hideSuggest")
  const slide = () => {
    setAlwaysOpenSuggested("hideSuggest");
     switch (hide) {
       case "hide":
         return setHide("show"), setIcon("showIcon");
       case "show":
         return setHide("hide"), setIcon("hideIcon");  
     }  

  }
  const openSuggest = () => {
    setAlwaysOpenSuggested("showSuggest")
    setIcon("hideIcon");  
  }
 
  const [openReportModal, setOpenReportModal] = useState(false)

  return (
    <appContext.Provider
      value={{
        suggestedUserF,
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

        // loading
        userProfileLoading,
        setUserProfileLoading,
        // if no user is found
        noUserFound,
        userExitOrNot,
        // about_ me
        about_meText,
        setAbout_MeText,
        // follow Function
        followFunction,
        // unfollow User
        unfollowFunction,

        // about me edit

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
        setOpenEditProfile,
        likeUnlikeSocketFunction,
        blocked,
        setBlocked,
        blockedNumber,
        setBlockedNumber,
        incomingBlockedSocket,
        slide,
        icon,
        hide,
        openSuggest,
        alwaysOpenSuggested,
        openReportModal,
        setOpenReportModal,
        messageError,
        setMessageError
      }}
    >
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/group/:id/:nid" element={<Group />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:id" element={<UserProfile />} />
        <Route path="/notification" element={<UserNotification />} />
      </Routes>
    </appContext.Provider>
  );
};

export default App;
