import "../styles/user.css";
import noImg from "../images/noImage.png";
import { useEffect, useState, useContext, useRef } from "react";
import { BiHeart, BiChat } from "react-icons/bi";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Create from "./Create";
import PostModal from "./PostModal";
import Friends from "./Friends";
import { appContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  collectUserProfile,
  followUser,
  unfollowViaProfile,
  unfollowFollowingR,
  unfollowFollowingViaAnotherUserFFlistR,
  likesUserPost,
  commentProfileR,
  unBlockedVPR,
  updatePost,
} from "../Redux/Profile";
import axios from "axios";
import UserNotification from "./UserNotification";
import { useNavigate } from "react-router-dom";
import ActionModal from "./ActionModal";
import ChattingSpace from "./ChattingSpace";
import { setOrOpenChat } from "../Redux/Message";
import Chat from "./Chat";
import ProfileEdit from "./ProfileEdit";
import { POST } from "../Redux/HomePost";
import { getCurrentPost } from "../Redux/CurrentPost";
import { FaComment, FaHeart } from "react-icons/fa";
import LoginSpinner from "./LoginSpinner";
import { openPostActionModal, postActionDone } from "../Redux/Postdecision";
import Postaction from "./Postaction";
import FollowUser from "./FollowUser";
import SideBarModal from "./SideBarModal";
import ReactTimeAgo from "react-time-ago";
import Loading from "./Loading";
import IndexPage from "./IndexPage";
import Texty from "./Texty";
import { io } from "socket.io-client"
import { useSocket } from "../Socket";
// import { followerUser} from "../Features/Profile"

const UserProfile = () => {
   const socketTesting = io("http://localhost:2001");
    const { socket } = useSocket();
  const {
    userEndPoint,
    setPostModalStatus,
    setUsername,
    getUserProfile,
    noUserFound,
    userProfileLoading,
    followFunction,
    unfollowFunction,
    setGroupChatOrPrivateChatOpening,
    incomingMessageDetails,
    hideSideBarBtn,
    setOpenEditProfile,
    likeUnlikeSocketFunction,
    blocked,
    blockedNumber,
    incomingBlockedSocket,
  } = useContext(appContext);
  let naviagte = useNavigate();
  let dispatch = useDispatch();
  // const socket = useSelector((state: any) => state.socket.value);
  const userProfileDetails = useSelector(
    (state: any) => state.userprofile.value
  );
  const [openFollowersFollowing, setOpenFollowersFollowing] =
    useState<boolean>(false);
  const [checkIfFollowing, setCheckIfFollowing] = useState([]);
  // the number used to open either follwers or following
  const [openFFNumber, setOpenFFNumber] = useState<number>(0);

  const [m, setM] = useState(0);
  let id = useParams();

  useEffect(() => {
    getUserProfile(`${id.id}`, "");
    hideSideBarBtn();
    setGroupChatOrPrivateChatOpening(0);
  }, []);
  // this meant for the user looking for another user
  // to show the user looked for followers have increased when he follows
  // Both are meant for following
  // used when user registeredUsername is the same as the user
  // const 
  const profilePost = () => {
    // this socket is used cause the likes and coment are only 
    // the server and they're not saved in the db, we change the server 
    socket?.on("profilePost", (data: any) => {
       dispatch(updatePost({user:data.user, lookedForUser:data.lookedForUser}))
    })
  }
  const followSocket = () => {
    socket?.on("followedUserLookedFor", (data: any) => {
      // This errors happens based on the user yo want to follow is not found as the backend
      if (!data.error) {
       
         dispatch(postActionDone(true));
        dispatch(followUser(data.lookedForUserFollowers));

      } else {
         dispatch(postActionDone(true));
        alert("an error occured");
      }
    });
  };
  const followSocket2Function = () => {
    socket?.on("userFollowingWhenFollowing", (data: any) => {
      if (!data.error) {
        dispatch(unfollowFollowingR(data.followingDetails));
      } else {
        alert("an error occured couldn't follow");
      }
    });
  };
  const followSocket3Function = () => {
    socket?.on("followingViaAnotherPersonFFlist", (data: any) => {
      if (!data.error) {
        dispatch(unfollowFollowingViaAnotherUserFFlistR(data.followingDetails));
      } else {
        alert("an error occured, couldn't follow");
      }
    });
  };

  // This is meant for the user looked for if he or she
  // is online and he's in user profile he recieve the increasement in his followers
  const ifFollowed = () => {
    socket?.on("followedNotification", (data: any) => {
      
      if (!data.error) {
        if (data.loggedInUser === userProfileDetails.username) {
          dispatch(followUser(data.addedFollowers));
        }
      }
    });
  };

  const unFollowedSocket = () => {
    socket?.on("unFollowed", (data: any) => {
    
      if (!data.error) {
        dispatch(unfollowViaProfile(data.userTheyWantToUnFollowFollowers));
         dispatch(postActionDone(true))
      } else {
         dispatch(postActionDone(true));
        alert("an error occured, couldn't unfollow");
      }
    });
  };

  const unfollowSocket2Function = () => {
    socket?.on("userFollowingWhenUnFollowing", (data: any) => {
      if (!data.error) {
        dispatch(postActionDone(true));
        dispatch(unfollowFollowingR(data.userLoggedInFollowing));
      } else {
        alert("an error occur couldn't unfollow");
      }
    });
  };
  const unfollowSocket3Function = () => {
    socket?.on("unfollowingViaAnotherPersonFFlist", (data: any) => {
      if (!data.error) {
        dispatch(
          unfollowFollowingViaAnotherUserFFlistR(data.userLoggedInFollowing)
        );
      } else {
        alert("an error occured, couldn't unfollow");
      }
    });
  };

  const incomingLikesSocketFunction = () => {
    const dispatchFunction = (
      postedBy: string,
      time: string,
      likesBox: string
    ) => {
      dispatch(
        likesUserPost({ postedBy: postedBy, time: time, likesBox: likesBox })
      );
    };

    socket?.on("likeOrUnlike1", (data: any) => {
   

      dispatchFunction(data.postedBy, data.time, data.likes);
    });
    socket?.on("likeOrUnlike2", (data: any) => {
      dispatchFunction(data.postedBy, data.time, data.likes);
    });
  };
  const incomingCommentSocketFunction = () => {
    const dispatchFunction = (
      postedBy: string,
      time: string,
      commentBox: string
    ) => {
      dispatch(commentProfileR({ postedBy: postedBy, time: time, commentBox }));
    };

    socket?.on("comment1", (data: any) => {
     

      dispatchFunction(data.postedBy, data.time, data.comment);
    });
    socket?.on("Comment2", (data: any) => {
      dispatchFunction(data.postedBy, data.time, data.comment);
    });
  };
  const blockedVPFunction = () => {
    socket?.on("blockedVP", (data: any) => {
    
      dispatch(
        unBlockedVPR({
          userBlocked: data.userDetails,
          userToBeUnBlocked: data.userBlockedUsername,
          userToBeUnBlockedBlocked: data.userBlockedDetails,
        })
      );
    });
  };
  const unblockedVPFunction = () => {
    socket?.on("unblockedVP", (data: any) => {
      dispatch(
        unBlockedVPR({
          userBlocked: data.userDetails,
          userToBeUnBlocked: data.userBlockedUsername,
          userToBeUnBlockedBlocked: data.userBlockedDetails,
        })
      );
    });
  };
  useEffect(() => {
    if (socket) {
      profilePost()
      followSocket();
      followSocket2Function();
      followSocket3Function();
      ifFollowed();
      unFollowedSocket();
      unfollowSocket2Function();
      unfollowSocket3Function();
      incomingMessageDetails();
      incomingLikesSocketFunction();
      incomingCommentSocketFunction();
      incomingBlockedSocket();
      blockedVPFunction();
      unblockedVPFunction();
    }
  });

  
  const openPost = (name: string, time: number) => {
    setPostModalStatus(true);
    dispatch(
      getCurrentPost(
        userProfileDetails.post.find(
          (details: { postedBy: string; time: number }) =>
            details.postedBy === name && details.time === time
        )
      )
    );
    // socket.emit("shit", { name: "Emmeey" })
  };

  const openFollowers = () => {
    setOpenFollowersFollowing(true);
    setOpenFFNumber(0);
  };
  const openFollowing = () => {
    setOpenFollowersFollowing(true);
    setOpenFFNumber(1);
  };
  const followerDetail = {
    accountOwner: "",
    personTheyWantToFollow: "",
  };

  // const followerUserEndPoint =

  const follow = () => {
    if (userProfileDetails.registerdUserIdentification !== "") {
      // this check if probably you are among the searched for user followers that means you are following the search for user nad if he not folloing you
      // the notification should be "followed back not follows you"
      let notificationWords = "";
      if (
        userProfileDetails.followers.find(
          (name: { username: string }) =>
            name.username === userProfileDetails.registerdUserIdentification
        )
      ) {
        notificationWords = "followed you";
      } else {
        notificationWords = "follows you";
      }

      followFunction(
        "followSocket1",
        userProfileDetails.registerdUserIdentification,
        userProfileDetails.username,
        notificationWords
      );
    }
  };

  const unfollow = () => {
    
    unfollowFunction(
      "unfollowSocket1",
      userProfileDetails.registerdUserIdentification,
      userProfileDetails.username
    );
  };
  const chatWithBtn = () => {
    dispatch(
      setOrOpenChat({
        name: userProfileDetails.username,
        notuser_imgUrl: userProfileDetails.img_url,
      })
    );
    setGroupChatOrPrivateChatOpening(1);
  };
  // const likesBtn = (name:string, time:string) => {
  //  socket.emit("like", {user:userProfileDetails.registerdUserIdentification, postedBy:name, time:time, route:"profile"})

  // }
  const unlikeBtn = (name: string, time: string) => {};

  const unblockBtn = () => {
    if (userProfileDetails.blockedNumber === 2) {
      const blockUser = axios.put(`${userEndPoint}/unBlockUser`, {
        userLoggedIn: userProfileDetails.registerdUserIdentification,
        userToBeBlocked: userProfileDetails.username,
      });
      socket?.emit("unblockVP", {
        userToBeUnblocked: userProfileDetails.username,
        user: userProfileDetails.registerdUserIdentification,
      });
    }
  };
  const blockVPBtn = () => {
    const blockUser = axios.put(`${userEndPoint}/blockUser`, {
      userLoggedIn: userProfileDetails.registerdUserIdentification,
      userToBeBlocked: userProfileDetails.username,
    });
    socket?.emit("blockVP", {
      userToBeUnblocked: userProfileDetails.username,
      user: userProfileDetails.registerdUserIdentification,
    });
  };

  const postActionBtn = (postedBy: string, time: number) => {
   
    dispatch(
      openPostActionModal({
       userToCheck:userProfileDetails.registerdUserIdentification,
        area: "Profile",
        postBy: postedBy,
        time,
        loggedInUser: `${userProfileDetails.registerdUserIdentification}`,
        // wecan send the user on the profile followers and check if you're there
        // instead of checking the user signed in follower based on the way the code
        // has been written
        followers_following: userProfileDetails.followers,
      })
    );
  };
  return (
    <>
      {!userProfileLoading ? (
        <div className="userProfileLoading_div">
         <Texty/>      
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
                  {
                    <>
                      {userProfileDetails.background_img_url !== "" ? (
                        <div
                          className="background_pic"
                          style={{
                            backgroundImage: `url(${userProfileDetails.background_img_url})`,
                          }}
                        ></div>
                      ) : (
                        <div
                          className="background_pic"
                          style={{ backgroundColor: "#0000004a" }}
                        ></div>
                      )}
                    </>
                  }
                  <div className="user_pic">
                    <img
                      style={{ objectFit: "cover" }}
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
                          {userProfileDetails.followers.length} Followers
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
                          userProfileDetails.post.map((id:number, details: POST) => (
                            <button key={id}
                              className="post_div"
                              // disabled={true}
                              // onClick={() =>
                              //   openPost(details.postedBy, details.time)
                              // }
                            >
                               <div className="date">
                <span> 
                  {<ReactTimeAgo  date={details.time} locale="en-US"/> }
                  </span>
              </div>
                              <div
                                className="posted"
                                onClick={() =>
                                  openPost(details.postedBy, details.time)
                                }
                              >
                                <p>{details.text}</p>
                              </div>
                              <div className="poster">
                                <div className="username_img"
                                  onClick={() =>
                                  openPost(details.postedBy, details.time)
                                }>
                                  <img
                                    src={
                                      userProfileDetails.img_url === ""
                                        ? noImg
                                        : userProfileDetails.img_url
                                    }
                                    alt=""
                                  />
                                  <span
                                    style={{
                                      width: "120px",
                                      color: "white",
                                      overflow: "hidden",
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
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
                                        <FaHeart
                                          style={{
                                            color: "red",
                                            fontSize: "1.5rem",
                                          }}
                                        />{" "}
                                        <span
                                          style={{
                                            fontSize: "0.6rem",
                                            padding: "0 4px",
                                          }}
                                        >
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
                                        <BiHeart
                                          style={{ fontSize: "1.9rem" }}
                                        />{" "}
                                        <span
                                          style={{
                                            fontSize: "0.6rem",
                                            padding: "0 4px",
                                          }}
                                        >
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
                                    <FaComment style={{ fontSize: "1.5rem" }} />{" "}
                                    <span
                                      style={{
                                        fontSize: "0.6rem",
                                        padding: "0 4px",
                                      }}
                                    >
                                      {details.comment.length > 0 &&
                                        details.comment.length}
                                    </span>
                                  </button>
                                  {/* {userProfileDetails.username ===
                                    userProfileDetails.registerdUserIdentification && ( */}
                                  <button
                                    onClick={() =>
                                      postActionBtn(
                                        `${details.postedBy}`,
                                        Number(details.time)
                                      )
                                    }
                                  >
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

                 <FollowUser/>
              <ChattingSpace />
              <PostModal />
              <Create />
              <SideBarModal/>
              <Navbar />
              <Sidebar />
              <ActionModal />
              <ProfileEdit />
              <Postaction />
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
