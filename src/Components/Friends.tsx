import "../styles/user.css";
import { CiChat1 } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import { useContext } from "react";
import { unfollowFollowingR } from "../Redux/Profile";
import { setOrOpenChat } from "../Redux/Message";
import axios from "axios";
import { useSocket } from "../Socket";
import noImg from "../images/noImage.png";

interface FriendsInterface {
  setOpenFollowersFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  openFFNumber: number;
  setOpenFFNumber: React.Dispatch<React.SetStateAction<number>>;
}
interface FollowersFollowingDetails {
  username: string;
  state: string;
  img_url: string;
  about_me: string;
}

const Friends = ({
  setOpenFollowersFollowing,
  openFFNumber,
  setOpenFFNumber,
}: FriendsInterface) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userEndPoint,
    followFunction,
    unfollowFunction,
    setGroupChatOrPrivateChatOpening,
  } = useContext(appContext);
  const userDetails = useSelector((state: any) => state.userprofile.value);
  // const socket = useSelector((state: any) => state.socket.value);
    const { socket } = useSocket();
  //      const followed = () => {
  //          socket.on("followedUserLookedFor", (data: any) => {
  //           console.log(data)
  //     //   dispatch(unfollowFollowingR(data.followingDetails))
  //     })
  //   }
  //      const unFollowed = () =>{
  //     socket.on("unFollowed", (data: any) => {
  //         if (userDetails.username === userDetails.registerdUserIdentification) {
  //             console.log(data)
  //             // dispatch(unfollowFollowingR(data.userLoggedInFollowing))
  //         //   I'm using unfollow via notification reducer because it works
  //         // dispatch(unfollowViaProfile(data.userTheyWantToUnFollowFollowers))
  //       }

  //     })
  //     }

  useEffect(() => {
    if (socket) {
      // unFollowed()
      // followed()
    }
  });
  const friendsBtn = () => {
    setOpenFFNumber(0);
  };
  const requestBtn = () => {
    setOpenFFNumber(1);
  };

  const chatWith = (name: string) => {
    navigate(`/chat/${name}`);
  };
  const followViaSocket3Btn = (userYouWantToFollow: string) => {
    const checkifUserExistInYourFollowers = userDetails.ifUserFollowers.find(
      (name: { username: string }) => name.username === userYouWantToFollow
    );
    let followWords = "";
    if (checkifUserExistInYourFollowers) {
      followWords = "followed you back";
    } else {
      followWords = "follows you";
    }
    followFunction(
      "followSocket3",
      userDetails.registerdUserIdentification,
      userYouWantToFollow,
      followWords
    );
  };

  const chatWithBtn = (name: string, img_Url: string) => {
    dispatch(setOrOpenChat({ name: name, notuser_imgUrl: img_Url }));
    setGroupChatOrPrivateChatOpening(1);
  };
  const blockUserBtn = async (name: string) => {
    try {
      const blockUser = await axios.put(`${userEndPoint}/blockUser`, {
        userLoggedIn: userDetails.registerdUserIdentification,
        userToBeBlocked: name,
      });
      socket?.emit("blockUser", {
        userLoggedIn: userDetails.registerdUserIdentification,
        userToBeBlocked: name,
      });
    } catch (error) {}
  };
  const unBlockUserBtn = async (name: string) => {
    try {
      const blockUser = axios.put(`${userEndPoint}/unBlockUser`, {
        userLoggedIn: userDetails.registerdUserIdentification,
        userToBeBlocked: name,
      });
      socket?.emit("unblockUser", {
        userLoggedIn: userDetails.registerdUserIdentification,
        userToBeBlocked: name,
      });
    } catch (error) {}
  };
  const blockViaOtherProfile = (name: string) => {};
  const unblockViaOtherProfile = (name: string) => { };
  const checkProfile = (username:string)=>{
    navigate(`/${username}`)
  }
  return (
    <div className="friends_space_parent_div">
      <div></div>
      <div className="friends_space">
        <div>
          <button
            onClick={() => setOpenFollowersFollowing(false)}
            style={{ border: "none", background: "none", marginTop: "10px" }}
          >
            <FaArrowLeft style={{ color: "black" }} />
          </button>
        </div>
        <div className="friends_heading">
          <button
            onClick={() => friendsBtn()}
            style={
              openFFNumber === 0
                ? { borderBottom: "3px solid black" }
                : { borderBottom: "none" }
            }
          >
            <p>Followers</p>
          </button>
          <button
            onClick={() => requestBtn()}
            style={
              openFFNumber !== 0
                ? { borderBottom: "3px solid black" }
                : { borderBottom: "none" }
            }
          >
            <p>Following</p>
          </button>
        </div>

        {/* Friends */}
        {openFFNumber === 0 ? (
          <div className="following_user_div">
            {userDetails.followers.map(
              (name: FollowersFollowingDetails, id: number) => (
                <div key={id} className="following_user_details">
                  <div className="following_user_head">
                    <div className="img_div">
                      <img onClick={()=>checkProfile(name.username)}
                        src={name.img_url === "" ? noImg : name.img_url}
                        alt="following"
                      />
                    </div>
                    <div className="name_div">
                      <div>
                        <h2>{name.username}</h2>{" "}
                        <>
                          {userDetails.ifUserFollowers.length > 0 ? (
                            name.username ===
                            userDetails.registerdUserIdentification ? (
                              <></>
                            ) : (
                              userDetails.ifUserFollowers.find(
                                (namee: { username: string }) =>
                                  namee.username === name.username
                              ) && (
                                <div>
                                  <p>Follows you</p>
                                </div>
                              )
                            )
                          ) : (
                            <></>
                          )}
                        </>
                      </div>
                      <p>{name.about_me}</p>
                    </div>
                  </div>
                  {/* For logged in user */}
                  {userDetails.registerdUserIdentification ===
                  userDetails.username ? (
                    <>
                      <div className="following_user_action">
                        <button
                          onClick={() =>
                            chatWithBtn(name.username, name.img_url)
                          }
                          style={{
                            fontSize: "1.2rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CiChat1 />
                        </button>

                        {userDetails.following.find(
                          (namee: FollowersFollowingDetails) =>
                            namee.username === name.username
                        ) ? (
                          <button
                            onClick={() =>
                              unfollowFunction(
                                "unfollowSocket2",
                                userDetails.registerdUserIdentification,
                                name.username
                              )
                            }
                            style={{
                              marginLeft: "10px",
                              background: "black",
                              color: "white",
                            }}
                          >
                            Following
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              followFunction(
                                "followSocket2",
                                userDetails.registerdUserIdentification,
                                name.username,
                                "followed you back"
                              )
                            }
                            style={{ marginLeft: "10px" }}
                          >
                            Follow
                          </button>
                        )}

                        {userDetails.registeredUserBlocked.find(
                          (namee: { username: string }) =>
                            namee.username === name.username
                        ) ? (
                          <button
                            onClick={() => unBlockUserBtn(name.username)}
                            style={{
                              marginLeft: "10px",
                              background: "red",
                              color: "white",
                            }}
                          >
                            Blocked
                          </button>
                        ) : (
                          <button
                            onClick={() => blockUserBtn(name.username)}
                            style={{ marginLeft: "10px" }}
                          >
                            Block
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    //   For looked for user
                    <>
                      {name.username ===
                      userDetails.registerdUserIdentification ? (
                        <></>
                      ) : (
                        <div className="following_user_action">
                          <button
                            onClick={() =>
                              chatWithBtn(name.username, name.img_url)
                            }
                            style={{
                              fontSize: "1.2rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CiChat1 />
                          </button>
                          {userDetails.ifUserFollowing.find(
                            (namee: FollowersFollowingDetails) =>
                              namee.username === name.username
                          ) ? (
                            <button
                              onClick={() =>
                                unfollowFunction(
                                  "unfollowSocket3",
                                  userDetails.registerdUserIdentification,
                                  name.username
                                )
                              }
                              style={{
                                marginLeft: "10px",
                                background: "black",
                                color: "white",
                              }}
                            >
                              Following
                            </button>
                          ) : (
                            <button
                              onClick={() => followViaSocket3Btn(name.username)}
                              style={{ marginLeft: "10px" }}
                            >
                              Follow
                            </button>
                          )}
                          {userDetails.registeredUserBlocked.find(
                            (namee: { username: string }) =>
                              namee.username === name.username
                          ) ? (
                            <button
                              onClick={() => unBlockUserBtn(name.username)}
                              style={{
                                color: "white",
                                marginLeft: "10px",
                                background: "red",
                              }}
                            >
                              Blocked
                            </button>
                          ) : (
                            <button
                              onClick={() => blockUserBtn(name.username)}
                              style={{ marginLeft: "10px" }}
                            >
                              Block
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
        
          <div className="following_user_div">
            {userDetails.following.map(
              (name: FollowersFollowingDetails, id: number) => (
                <div key={id} className="following_user_details">
                  <div className="following_user_head">
                    <div className="img_div">
                      <img onClick={()=>checkProfile(name.username)}
                        src={name.img_url === "" ? noImg : name.img_url}
                        alt=""
                      />
                    </div>
                    <div className="name_div">
                      <div>
                        <h2>{name.username}</h2>
                        {userDetails.registerdUserIdentification ===
                        userDetails.username ? (
                          <>
                            {userDetails.followers.find(
                              (namee: { username: string }) =>
                                namee.username === name.username
                            ) ? (
                              <div>
                                <p>Follows you</p>
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <>
                            <>
                              {userDetails.ifUserFollowers.length > 0 ? (
                                name.username ===
                                userDetails.registerdUserIdentification ? (
                                  <></>
                                ) : (
                                  userDetails.ifUserFollowers.find(
                                    (namee: { username: string }) =>
                                      namee.username === name.username
                                  ) && (
                                    <div>
                                      <p>Follows you</p>
                                    </div>
                                  )
                                )
                              ) : (
                                <></>
                              )}
                            </>
                          </>
                        )}
                      </div>

                      <p>{name.about_me}</p>
                    </div>
                  </div>
                  {/* For user logged in*/}
                  {userDetails.registerdUserIdentification ===
                  userDetails.username ? (
                    <>
                      <div className="following_user_action">
                        <button
                          onClick={() =>
                            chatWithBtn(name.username, name.img_url)
                          }
                          style={{
                            fontSize: "1.2rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CiChat1 />
                        </button>
                        <button
                          onClick={() =>
                            unfollowFunction(
                              "unfollowSocket2",
                              userDetails.registerdUserIdentification,
                              name.username
                            )
                          }
                          style={{ marginLeft: "10px" }}
                        >
                          Unfollow
                        </button>
                        {userDetails.registeredUserBlocked.find(
                          (namee: { username: string }) =>
                            namee.username === name.username
                        ) ? (
                          <button
                            onClick={() => unBlockUserBtn(name.username)}
                            style={{
                              marginLeft: "10px",
                              background: "red",
                              color: "white",
                            }}
                          >
                            Blocked
                          </button>
                        ) : (
                          <button
                            onClick={() => blockUserBtn(name.username)}
                            style={{ marginLeft: "10px" }}
                          >
                            Block
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    //   For searched user
                    <>
                      {name.username ===
                      userDetails.registerdUserIdentification ? (
                        <></>
                      ) : (
                        <div className="following_user_action">
                          <button
                            onClick={() =>
                              chatWithBtn(name.username, name.img_url)
                            }
                            style={{
                              fontSize: "1.2rem",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CiChat1 />
                          </button>
                          <>
                            {userDetails.ifUserFollowing.find(
                              (namee: { username: string }) =>
                                namee.username === name.username
                            ) ? (
                              <button
                                onClick={() =>
                                  unfollowFunction(
                                    "unfollowSocket3",
                                    userDetails.registerdUserIdentification,
                                    name.username
                                  )
                                }
                                style={{
                                  marginLeft: "10px",
                                  background: "black",
                                  color: "white",
                                }}
                              >
                                Following
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  followViaSocket3Btn(name.username)
                                }
                                style={{ marginLeft: "10px" }}
                              >
                                Follow
                              </button>
                            )}
                          </>
                          {userDetails.registeredUserBlocked.find(
                            (namee: { username: string }) =>
                              namee.username === name.username
                          ) ? (
                            <button
                              onClick={() => unBlockUserBtn(name.username)}
                              style={{ marginLeft: "10px", background: "red" }}
                            >
                              Blocked
                            </button>
                          ) : (
                            <button
                              onClick={() => blockUserBtn(name.username)}
                              style={{ marginLeft: "10px" }}
                            >
                              Block
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
