import "../styles/sidebar.css";
import { appContext } from "../App";
import { useContext,  useEffect, useState } from "react";
import { FaBell, FaPlus } from "react-icons/fa";
import boxer from "../images/boxer.jpg";
import {
  BiPlus,

  BiLogOut,
  BiTrash,

} from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFollowedNotification } from "../Redux/Profile";
import { getCurrentMessageId } from "../Redux/Message";
import axios from "axios";
import noImg from "../images/noImage.png";
import { AiFillMessage } from "react-icons/ai";
import { useSocket } from "../Socket";
const Sidebar = () => {
  // let socket = useRef<Socket>()
  let location = useLocation();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const userDetail = useSelector((state: any) => state.userprofile.value);
  // const socket = useSelector((state: any) => state.socket.value);
  const { socket } = useSocket();
  const [
    hideOpenSideBarAnimationIndicator,
    sethideOpenSideBarAnimationIndicator,
  ] = useState("");
  const messageStore = useSelector(
    (state: any) => state.privatemessagechat.value
  );

  // PrivateChat or Group Chat
  const [privateChatOrGroupChat, setPrivateChatOrGroupChat] =
    useState<boolean>(true);
  
   const likeCommentNotification = (
     socketName: string,
     commentedOrPost: string
   ) => {
     socket?.on(socketName, (data) => {
          console.log(data);
       if (data.postedBy !== data[`${commentedOrPost}`]) {
        if(data.notified){
           dispatch(getFollowedNotification(data.notification));
        }
       
       }
     });
   };
   const likeNotification = () => {
     likeCommentNotification("likeOrUnlike1", "userThatLiked");
   
   };
   const commentNofication = () => {
     likeCommentNotification("comment1", "userThatCommented");

   };

  useEffect(() => {
    if (socket) {
      socket?.on(
        "followedNotification",
        (data: { notification: {}[] | []; error: boolean }) => {
          if (!data.error) {
            dispatch(getFollowedNotification(data.notification));
          }
        }
      );
      likeNotification()
      commentNofication()
    }
  });

  const {
    routeIdentification,
    hideSideBar,
    showSideBarBtn,
    setHideSideBar,
    hidebarBool,
    hideSideBarBtn,
    setOpenPrePost,
    username,
    setActionModalId,
    setOpenActionModal,

    setGroupChatOrPrivateChatOpening,
    messageEndPoint,
    openSuggest
  } = useContext(appContext);
  const OpenPrePostBtn = () => {
    setOpenPrePost(true);
    hideSideBarBtn();
  };

  const checkNotification = () => {
    if (location.pathname !== "/notification") {
      navigate("/notification");
    }

    // if (routeIdentification !== "usernotification") {

    // }
  };

  // switch btn
  const openFFChat = () => {
    setPrivateChatOrGroupChat(true);
    //  if (location.pathname !== "/chat") {
    //   navigate("/chat")
    // }
  };
  const openGroupChat = () => {
    setPrivateChatOrGroupChat(false);
  };

  // chat opening btn
  const privateChatBtn = async (name: string) => {
     hideSideBarBtn();
    setGroupChatOrPrivateChatOpening(1);
    dispatch(getCurrentMessageId(name));
    socket?.emit("updatechecked", {
      owner: userDetail.registerdUserIdentification,
      notowner: name,
    });

    const updatcheck = await axios.post(`${messageEndPoint}/updatechecked`, {
      owner: userDetail.registerdUserIdentification,
      notowner: name,
    });
  };

  const groupChatBtn = () => {
    setGroupChatOrPrivateChatOpening(2);
  };
  const openModalActionFunction = (state: boolean, id: number) => {
    setOpenActionModal(state);
    setActionModalId(id);
  };
  const logoutBtn = () => {
    openModalActionFunction(true, 1);
    hideSideBarBtn();
  };
  const deleteAccountBtn = () => {
    openModalActionFunction(true, 2);
    hideSideBarBtn();
  };
  const profileCheck = () => {
    navigate(`/${userDetail.registerdUserIdentification}`);
  };
  const openSidebar = () => {
    if (hideOpenSideBarAnimationIndicator === "") {
      showSideBarBtn()
      sethideOpenSideBarAnimationIndicator("bottom_openHideSidebar_animate");
    } else {
      sethideOpenSideBarAnimationIndicator("")
      hideSideBarBtn()
    }
  }

  return (
    <>
      <div
        className={`sidebar_div ${
          hidebarBool ? hideSideBar : "sidebar_animation"
        }`}
      >
        {/* <div className="exit">
          <button onClick={hideSideBarBtn}>
            <FaTimes className="exit_btn_icon" />
          </button>
        </div> */}
        <div className="app_logo">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="app_logo_div">
              <div></div>
            </div>
          </div>

          <div className="group_identification_add_chat">
            <button onClick={() => OpenPrePostBtn()}>
              <span>Create </span> <BiPlus className="create" />
            </button>
            {/* <button style={{borderLeft:"1px solid black"}}>
              <BiSearch className="search"/> <span>Search</span>
          </button> */}
          </div>
        </div>
        <div className="group_identification">
          <div
            className="group_ff_chat_indication"
            style={{ paddingBottom: "5px" }}
          >
            <button
              onClick={() => openFFChat()}
              style={
                privateChatOrGroupChat
                  ? { border: "" }
                  : { borderBottom: "none" }
              }
            >
              <p>Chat</p>
              {messageStore.unCheckedMessageNumber > 0 && (
                <span> {messageStore.unCheckedMessageNumber} </span>
              )}
            </button>
            {/*  <button style={!privateChatOrGroupChat ? { borderBottom: "3px solid white" } : { borderBottom: "none" }} onClick={() => openGroupChat()}>Group Chats
            <span>10</span>
          </button>*/}
          </div>
          <>
            {privateChatOrGroupChat ? (
              //PRIVATE CHAT  //////////////////////////////////////////////////////////////////////////////
              <div className="group_chat">
                {messageStore.allMessage.map(
                  (
                    name: {
                      owner: string;
                      notowner: string;
                      notowner_imgurl: string;
                      message: { checked: boolean; text: string }[];
                    },
                    id: number
                  ) => (
                    <div key={id}>
                      <button
                        className="link"
                        onClick={() => privateChatBtn(name.notowner)}
                      >
                        <span className="group_img_div">
                          <img
                            src={
                              name.notowner_imgurl !== ""
                                ? name.notowner_imgurl
                                : noImg
                            }
                            alt=""
                          />{" "}
                          <div>
                            <h3>{name.notowner}</h3>
                            <p>{name.message[name.message.length - 1].text}</p>
                          </div>
                        </span>
                        <span className="notifications">
                          {/* <div className="notifying_bell">
          
                <FaBell />
                    <div className="dot"></div>
            </div> */}
                          {name.message.filter(
                            (details) => details.checked === false
                          ).length > 0 && (
                            <div className="unreadmessage">
                              <span>
                                {
                                  name.message.filter(
                                    (details) => details.checked === false
                                  ).length
                                }
                              </span>
                            </div>
                          )}
                        </span>
                      </button>
                    </div>
                  )
                )}
              </div>
            ) : (
              //GROUP CHAT  //////////////////////////////////////////////////////////////////////////////
              <div className="group_chat">
                <div>
                  <button className="link" onClick={() => groupChatBtn()}>
                    <span className="group_img_div">
                      <img src={boxer} alt="" /> <span>{username}</span>
                    </span>
                    <span className="notifications">
                      <div className="notifying_bell">
                        <FaBell />
                        <div className="dot"></div>
                      </div>
                      <div className="unreadmessage">
                        <span> 12</span>
                      </div>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </>
        </div>
        <div className="user_Profile_details">
          <div className="user_Profile_details2">
            <div className="user_profile_sidebar_identification">
              <button onClick={() => profileCheck()}>
                <div>
                  <img
                    src={
                      userDetail.registeredUserImgUrl === ""
                        ? noImg
                        : userDetail.registeredUserImgUrl
                    }
                    alt=""
                  />
                  <p>{userDetail.registerdUserIdentification}</p>
                </div>
                <Link
                  className="link"
                  to={`/${userDetail.registerdUserIdentification}`}
                >
                  View
                </Link>
              </button>
            </div>
            <button
              onClick={() => checkNotification()}
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <FaBell
                style={{
                  paddingRight: "5px",
                  fontSize: "16px",
                  fontWeight: "lighter",
                }}
              />
              <>
                {userDetail.loggedInUserNotification.length > 0 && (
                  <>
                    {userDetail.loggedInUserNotification.filter(
                      (details: { checked: boolean }) =>
                        details.checked === false
                    ).length > 0 && (
                      <span className="number_Of_Notification">
                        {
                          userDetail.loggedInUserNotification.filter(
                            (details: { checked: boolean }) =>
                              details.checked === false
                          ).length
                        }
                      </span>
                    )}
                  </>
                )}
              </>

              <span>Notification</span>
            </button>
            {/* <button>
          <BiUserCircle /> <span>Profile</span>
        </button> */}
            <button onClick={() => logoutBtn()}>
              <BiLogOut
                style={{
                  paddingRight: "5px",
                  fontSize: "16px",
                  fontWeight: "lighter",
                }}
              />{" "}
              <span>Logout</span>
            </button>
            <button onClick={() => deleteAccountBtn()}>
              <BiTrash
                style={{
                  paddingRight: "5px",
                  fontSize: "16px",
                  fontWeight: "lighter",
                }}
              />{" "}
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM INDICATOR */}
      <div className="bottom_notification_indication">
        <div>
          <button
            onClick={() => openSidebar()}
            className={`bottom_openHideSidebar ${hideOpenSideBarAnimationIndicator}`}
          >
            <div className="div1"></div>
            <div className="div2"></div>
            <div className="div3"></div>
          </button>
        </div>
        <div>
          <button className="identification_btn">
            <FaBell className="icon" />
            {userDetail.loggedInUserNotification.length > 0 && (
              <>
                {userDetail.loggedInUserNotification.filter(
                  (details: { checked: boolean }) => details.checked === false
                ).length > 0 && (
                  <span className="number_Of_Notification">
                    {
                      userDetail.loggedInUserNotification.filter(
                        (details: { checked: boolean }) =>
                          details.checked === false
                      ).length
                    }
                  </span>
                )}
              </>
            )}
          </button>
        </div>
        <div className="add_new_post">
          <button>
            <FaPlus onClick={() => OpenPrePostBtn()} className="icon" />
          </button>
        </div>
        <div>
          <button className="identification_btn">
            <AiFillMessage className="icon" />
            {messageStore.unCheckedMessageNumber > 0 && (
              <span> {messageStore.unCheckedMessageNumber} </span>
            )}
          </button>
        </div>
        <div>
          <button onClick={openSuggest} className="suggested">
            Suggested User
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
