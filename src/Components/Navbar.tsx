import "../styles/navbar.css"
import { appContext } from "../App"
import {useContext} from "react"
import {
  FaSearch,
  FaTrash,
  FaBell,
  FaPeopleCarry,
  FaPlus,
} from "react-icons/fa";
import {BsHouse} from "react-icons/bs"
import boxer from "../images/boxer.jpg"
import { useNavigate} from "react-router-dom"
import { useSelector } from "react-redux"

import axios from "axios"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSocket } from "../Socket";
import noImg from "../images/noImage.png";
import {TbLockSquareRoundedFilled} from "react-icons/tb"
import {BsFillFilePersonFill} from "react-icons/bs"
// import Message from "../Features/Message"
  const Navbar = () => {
    const { userEndPoint,showSideBarBtn, groupChatOrPrivateChatOpening, setGroupChatOrPrivateChatOpening,
      setShowGroupModal, setOpenActionModal, setActionModalId, messageEndPoint, newPostForFollowersFunction, userNewPostFunction, newPostAlert,
      setNewPostAlert } = useContext(appContext)
    const groupStatus = useSelector((state: any) => state.chat.value) 
    const messageRedux = useSelector((state: any) => state.privatemessagechat.value)
      const userDetails = useSelector((state: any) => state.userprofile.value);

     const { socket } = useSocket();
    const location = useLocation()
    let navigate = useNavigate()
    useEffect(() => {
      if (socket) {
           newPostForFollowersFunction()
            userNewPostFunction()
       }
    })

    const scrollOrNavigateToNewPostBtn = () => {
      if (location.pathname === "/home") {
        window.scrollTo({
          top: 0,
          behavior:"auto"
        })
      } else {
        navigate("/home")
      }
      
    }
     

    const goToSerachBtn = () => {
      setGroupChatOrPrivateChatOpening(0)
      navigate("/search")
      
    }
    const viewProfile = () => {
      navigate(`/${messageRedux.currentDetails.notowner}`)
    }
    const deleteChat = () => {
      setOpenActionModal(true)
      setActionModalId(3)
    }
    const unblock = () => {
       const blockUser = axios.put(`${userEndPoint}/unBlockUser`, {
         userLoggedIn: userDetails.registerdUserIdentification,
         userToBeBlocked:  messageRedux.currentDetails.notowner,
       });
       socket?.emit("unblockVP", {
         userToBeUnblocked: messageRedux.currentDetails.notowner,
         user: userDetails.registerdUserIdentification,
       });
    }
    const blockUser = () => {
          const blockUser = axios.put(`${userEndPoint}/blockUser`, {
            userLoggedIn: userDetails.registerdUserIdentification,
            userToBeBlocked: messageRedux.currentDetails.notowner,
          });
          socket?.emit("blockVP", {
            userToBeUnblocked: messageRedux.currentDetails.notowner,
            user: userDetails.registerdUserIdentification,
          });
    }
    return (
      <div className="navbar_div">
        <div className="emptyNavbar"></div>
        <div className="navbar">
          {/* <button className="nav_open_sidebar" onClick={showSideBarBtn}>
          <span></span><span></span><span></span>
      </button> */}
          <div className="navbar_new_post">
            <button
              onClick={() => scrollOrNavigateToNewPostBtn()}
              className="new_post_link"
            >
              {newPostAlert && <span></span>}
              <BsHouse className="icon" />
            </button>
          </div>
          <div className="navbar_group_details">
            <div className="search_div">
              <button
                onClick={() => goToSerachBtn()}
                style={{ border: "none", background: "none" }}
              >
                <FaSearch style={{ color: "white" }} />
              </button>
            </div>
            {groupChatOrPrivateChatOpening === 1 && (
              <div className="navbar_img_name_space">
                <button>
                  <img
                    src={
                      messageRedux.currentDetails.notowner_imgurl === ""
                        ? noImg
                        : messageRedux.currentDetails.notowner_imgurl
                    }
                    alt=""
                  />
                </button>
                <span>{messageRedux.currentDetails.notowner}</span>
              </div>
            )}
            {groupChatOrPrivateChatOpening === 2 && (
              <div className="navbar_img_name_space">
                <button>
                  <img src={boxer} alt="" />
                </button>
                <span>Pinna Group</span>
              </div>
            )}

            <div className="navbar_group_action_div">
              {groupChatOrPrivateChatOpening === 1 && (
                <button className="navbar_group_action_indicators">
                  <div>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </button>
              )}
              {groupChatOrPrivateChatOpening === 2 && (
                <button className="navbar_group_action_indicators">
                  <div>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </button>
              )}
              <>
                {groupChatOrPrivateChatOpening === 1 && (
                  <div className="navbar_group_action">
                    <button onClick={() => viewProfile()}>
                      <BsFillFilePersonFill style={{ paddingRight: "10px" }} />{" "}
                      View Profile
                    </button>
                    <>
                      {userDetails.registeredUserBlocked.find(
                        (details: { username: string }) =>
                          details.username ===
                          messageRedux.currentDetails.notowner
                      ) ? (
                        <button onClick={() => unblock()}>
                          <TbLockSquareRoundedFilled
                            style={{ paddingRight: "10px" }}
                          />
                          Unblock
                        </button>
                      ) : (
                        <button onClick={() => blockUser()}>
                          <TbLockSquareRoundedFilled
                            style={{ paddingRight: "10px" }}
                          />{" "}
                          Block
                        </button>
                      )}
                    </>

                    <button onClick={() => deleteChat()}>
                      <FaTrash style={{ paddingRight: "10px" }} /> Delete Chat
                    </button>
                  </div>
                )}

                {groupChatOrPrivateChatOpening === 2 && (
                  <div className="navbar_group_action">
                    <button onClick={() => setShowGroupModal(1)}>
                      <FaBell style={{ paddingRight: "10px" }} /> Notifications
                    </button>
                    <button onClick={() => setShowGroupModal(2)}>
                      <FaPeopleCarry style={{ paddingRight: "10px" }} /> Group
                      Details
                    </button>
                    <button>
                      <FaPlus style={{ paddingRight: "10px" }} /> Invite a
                      friend
                    </button>
                    <button>
                      <FaTrash style={{ paddingRight: "10px" }} /> Delete Group
                    </button>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Navbar