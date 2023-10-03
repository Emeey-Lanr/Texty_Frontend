import "../styles/user.css";
import boxer from "../images/boxer.jpg";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import SideBarModal from "./SideBarModal";
import Navbar from "./Navbar";
import { appContext } from "../App";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFollowedNotification, unfollowFollowingR } from "../Redux/Profile";
import noImg from "../images/noImage.png";
import ActionModal from "./ActionModal";
import { useSocket } from "../Socket";
import Chat from "./Chat";
import { openClose } from "../Redux/Error";
import ErrorModal from "./ErrorModal";
const UserNotification = () => {
  const { socket } = useSocket();
  const {
    setRouteIdentification,
    setGroupChatOrPrivateChatOpening,
    getUserProfile,
    hideSideBarBtn,
    followFunction,
    unfollowFunction,
  } = useContext(appContext);
  const dispatch = useDispatch();
  const userDetail = useSelector((state: any) => state.userprofile.value);

  useEffect(() => {
    
    getUserProfile("notification", "notification");
    setRouteIdentification("notification");
    hideSideBarBtn();
    setGroupChatOrPrivateChatOpening(0);
  }, []);

  // if user is online he recieves the notifiaction\
  const followedNotification = () => {
    socket?.on("followedNotification", (data: any) => {
      if (!data.error) {
        dispatch(getFollowedNotification(data.notification));
      }
    });
  };
  const followed = () => {
    socket?.on("userFollowingWhenFollowing", (data: any) => {
  
      if (!data.error) {
        dispatch(unfollowFollowingR(data.followingDetails));
      } else {
         dispatch(openClose({ message: "an error occured couldn't follow" }));

      }
    });
  };
  // const followedNotificationForUserToKnowIfItFollowing = () => {
  //     socket.on("followWhenRIdIsTheSameAsUsername", (data:any) => {
  //        if(data.loggedInUser === userDetail.username){
  //        console.log("You are the one on your profile")
  //    }else{
  //      console.log("you are not the one on your profile")
  //    }
  //     // dispatch(unfollowFollowingR(data.followingDetails))
  //   })
  // }
  const unFollowed = () => {
    socket?.on("userFollowingWhenUnFollowing", (data: any) => {
      if (!data.error) {
        dispatch(unfollowFollowingR(data.userLoggedInFollowing));
      } else {
         dispatch(openClose({ message: "an error occured" }));

      }
    });
  };
  const likeCommentNotification = (socketName:string, commentedOrPost:string) => {
    socket?.on(socketName, (data) => {
          console.log(data);
      if (data.postedBy !== data[`${commentedOrPost}`]) {
         if (data.notified) {
           dispatch(getFollowedNotification(data.notification));
         }

      }
    })
  }
  const likeNotification = () => {
    likeCommentNotification("likeOrUnlike1", "userThatLiked");
  
  }
  const commentNofication = () => {
    likeCommentNotification("comment1", "userThatCommented");

 
  }
  useEffect(() => {
    if (socket) {
      followedNotification();
      followed();
      unFollowed();
      likeNotification();
      commentNofication();
    }
  });

  const followViaNotificationBtn = (userYouWantToFollow: string) => {

    followFunction(
      "followSocket2",
      userDetail.registerdUserIdentification,
      userYouWantToFollow,
      "followed you back"
    );
  };
  const unfollowViaNotification = (userYouWantToUnFollow: string) => {
    unfollowFunction(
      "unfollowSocket2",
      userDetail.registerdUserIdentification,
      userYouWantToUnFollow
    );
  };
  return (
    <>
      <div className="parent_userNotificationDiv">
        <div className="userNotificationDiv1"></div>
        <div className="userNotificationDiv">
          <div className="heading_demacation_div">
            <div className="userNofication_heading">
              <p>Notification</p>
            </div>
            <div className="demacation"></div>
          </div>
          <div className="user_notification_div">
            {userDetail.loggedInUserNotification.map(
              (data: {
                followed: boolean;
                checked: boolean;
                notificationDetails: string;
                username: string;
                img_url: string;
              }) => (
                <div className="user_notification_img_text_description">
                  <div className="img_text_notification_div">
                    <div className="user_notification_img_div">
                      <img
                        src={data.img_url !== "" ? data.img_url : noImg}
                        alt=""
                      />
                    </div>
                    <div className="user_notification_text_div">
                      <p>{data.notificationDetails}</p>
                    </div>
                  </div>

                  {data.followed && (
                    <div className="notification_follow_action">
                      <div>
                        {userDetail.following.find(
                          (name: { username: string }) =>
                            name.username === data.username
                        ) ? (
                          <button
                            onClick={() =>
                              unfollowViaNotification(data.username)
                            }
                            style={{
                              background: "black",
                              color: "white",
                              border: "none",
                              padding: "10px 20px",
                              borderRadius: "30px",
                            }}
                          >
                            Following
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              followViaNotificationBtn(data.username)
                            }
                            style={{
                              background: "none",
                              padding: "10px 20px",
                              border: "1px solid black",
                              borderRadius: "30px",
                            }}
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Chat/>
      <ActionModal/>
      <Navbar />
      <SideBarModal />
      <Sidebar />
      <ErrorModal/>
    </>
  );
};

export default UserNotification;
