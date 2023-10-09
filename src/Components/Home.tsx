import "../styles/home.css";
import {

  FaHeart,
  FaComment,
} from "react-icons/fa";
import noImg from "../images/noImage.png";
import PostModal from "./PostModal";
import SideBarModal from "./SideBarModal";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Create from "./Create";
import React, {  useContext, useEffect, useRef } from "react";
import { appContext } from "../App";
import Group from "./Group";

import { useSelector } from "react-redux";
import { POST } from "../Redux/HomePost";
import { unfollowFollowingR } from "../Redux/Profile";
import {
  socketHomePost,
  getLikesHomePost,
  commentHomePostR,
} from "../Redux/HomePost";
import { useDispatch } from "react-redux";
import { getCurrentPost } from "../Redux/CurrentPost";
import { BiHeart } from "react-icons/bi";
import Postaction from "./Postaction";
import { openPostActionModal } from "../Redux/Postdecision";
import FollowUser from "./FollowUser";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../Socket";
import Chat from "./Chat";
import ReportUser from "./ReportUser";
import { openClose } from "../Redux/Error";
const Home = () => {
 
   const { socket } = useSocket();
  const {
    setRouteIdentification,
    getUserProfile,
    incomingMessageDetails,
    setGroupChatOrPrivateChatOpening,
    hideSideBarBtn,
    setPostModalStatus,
    newPostAlert,
    setNewPostAlert,
    newPostForFollowersFunction,
    userNewPostFunction,
    likeUnlikeSocketFunction,
  } = useContext(appContext);
  let navigate  = useNavigate()
  // const socket = useSelector((state: any) => state.socket.value);
  const homePost = useSelector((state: any) => state.home_post.value);
  const userProfileDetails = useSelector(
    (state: any) => state.userprofile.value
  );
  const newPost = useRef<HTMLDivElement>(null);
  let dispatch = useDispatch();
  useEffect(() => {
    getUserProfile("-;;'kjg", "home");
    setRouteIdentification("home");
    hideSideBarBtn();
    setGroupChatOrPrivateChatOpening(0);
  }, []);
  
  const unfollowSocket2Function = () => {
    socket?.on("userFollowingWhenUnFollowing", (data: any) => {
      if (!data.error) {
        // dispatch(postActionDone(true));
        dispatch(unfollowFollowingR(data.userLoggedInFollowing));
      } else {
         dispatch(openClose({ message: "an error occured, couldn't follow" }));

      }
    });
  };
  const socketHomePostFunction = () => {
    socket?.on("homePost", (data: any) => {
      dispatch(socketHomePost(data));
    });
  };

  const incomingLikesSocketFunction = () => {
    const dispatchFunction = (
      postedBy: string,
      time: number,
      likesBox: string
    ) => {
      dispatch(
        getLikesHomePost({ postedBy: postedBy, time: time, likesBox: likesBox })
      );
    };

    socket?.on("likeOrUnlike1", (data: any) => {
      if(data.available){
        dispatchFunction(data.postedBy, data.time, data.likes);
      }
      
     
    });
    socket?.on("likeOrUnlike2", (data: any) => {
      
      if (data.available) {
          dispatchFunction(data.postedBy, data.time, data.likes);
      }
    
    });
  };
  const incomingCommentSocketFunction = () => {
    const dispatchFunction = (
      postedBy: string,
      time: number,
      commentBox: string
    ) => {
      dispatch(
        commentHomePostR({ postedBy: postedBy, time: time, commentBox })
      );
    };

    socket?.on("comment1", (data: any) => {
      if (data.available) { 
             dispatchFunction(data.postedBy, data.time, data.comment);
      }
 
    });
    socket?.on("Comment2", (data: any) => {
      if (data.available) {
         dispatchFunction(data.postedBy, data.time, data.comment);
      }
       
    });
  };
  useEffect(() => {
    if (socket) {
      unfollowSocket2Function()
      socketHomePostFunction();
      incomingMessageDetails();
      newPostForFollowersFunction();
      userNewPostFunction();
      incomingLikesSocketFunction();
      incomingCommentSocketFunction()

    }
  });
  
  const openPost = (name: string, time: number) => {
    setPostModalStatus(true);
    dispatch(
      getCurrentPost(
        homePost.find(
          (details: { postedBy: string; time: number }) =>
            details.postedBy === name && details.time === time
        )
      )
    );
  };
  interface HOMEPOST {}
  const scrollToNewPost = () => {
    newPost.current?.scrollIntoView()
     setNewPostAlert(false);
  };
  const openPostAction = (postBy: string, time: number) => {
  
    dispatch(
      openPostActionModal({
        userToCheck:postBy,
        area: "Home",
        postBy,
        time,
        loggedInUser: userProfileDetails.registerdUserIdentification,
        followers_following: userProfileDetails.following,
      })
    );
  };
  const navigateToProfile = (postedBy:string) => {
    navigate(`/${postedBy}`)
   }
  return (
    <>
      <div className="home_parent_div">
        <div className="home_div1"></div>
        <div className="home_div">
          {newPostAlert && (
            <div
              className="home_newPost_view_div"
              style={{ position: "sticky", top: "0" }}
            >
              <button
                className="home_newPost_view_btn"
                onClick={() => scrollToNewPost()}
              >
                New Post
              </button>
            </div>
          )}
          {/* <div /> */}
          <div className="home_post_container">
            <div ref={newPost} />
            {homePost.map((details: POST, id: number) => (
              <button key={id} className="home_post_div">
                <div className="date">
                  <span>
                    {<ReactTimeAgo date={details.time} locale="en-US" />}
                  </span>
                </div>
                <div
                  className="home_posted"
                  onClick={() => openPost(details.postedBy, details.time)}
                >
                  <p>{details.text}</p>
                </div>
                <div className="home_poster">
                  <div className="home_username_img">
                    <img
                      onClick={() => navigateToProfile(details.postedBy)}
                      src={
                        details.poster_imgUrl === ""
                          ? noImg
                          : details.poster_imgUrl
                      }
                      alt="profile_pic"
                    />
                    <span
                      onClick={() => openPost(details.postedBy, details.time)}
                      style={{
                        width: "120px",
                        color: "white",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {details.postedBy}
                    </span>
                  </div>

                  <div
                    className="home_postaction"
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
                          onClick={() =>
                            likeUnlikeSocketFunction(
                              "unlike",
                              details.time,
                              details.postedBy,
                              "unlike"
                            )
                          }
                        >
                          <FaHeart
                            style={{ color: "red", fontSize: "1.5rem" }}
                          />{" "}
                          <span
                            style={{
                              fontSize: "0.6rem",
                              fontWeight: "lighter",
                              padding: "4px",
                            }}
                          >
                            {details.likes.length > 0 && details.likes.length}
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            likeUnlikeSocketFunction(
                              "like",
                              Number(details.time),
                              details.postedBy,
                              "like"
                            )
                          }
                        >
                          <BiHeart style={{ fontSize: "1.9rem" }} />{" "}
                          <span
                            style={{ fontSize: "0.6rem", padding: "0 5px" }}
                          >
                            {Number(details.likes.length) > 0 &&
                              details.likes.length}
                          </span>
                        </button>
                      )}
                    </>
                    <button
                      onClick={() => openPost(details.postedBy, details.time)}
                    >
                      <FaComment style={{ fontSize: "1.5rem" }} />{" "}
                      <span style={{ fontSize: "0.6rem", padding: "0 4px" }}>
                        {details.comment.length > 0 && details.comment.length}
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        openPostAction(details.postedBy, details.time)
                      }
                    >
                      <div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <FollowUser />
      <PostModal />
      <Group />
      <Chat/>
      <Create />
      <SideBarModal />
      <Navbar />
      <Sidebar />
      <Postaction />
      <ReportUser/>
    </>
  );
};

export default Home;
