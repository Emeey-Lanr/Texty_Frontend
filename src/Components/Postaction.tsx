import { FaSpinner, FaTrash, FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../styles/postDescision.css";
import { closePostActionModal, openSpinner, postActionDone } from "../Redux/Postdecision";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../App";
import { deletePost, unfollowFollowingR } from "../Redux/Profile";
import { RiUserUnfollowFill } from "react-icons/ri"
import {MdReportProblem} from "react-icons/md"
import { useSocket } from "../Socket";
import { openClose } from "../Redux/Error";
import ErrorModal from "./ErrorModal";
import { deleteHomePost } from "../Redux/HomePost";
const Postaction = () => {
  const { userEndPoint, unfollowFunction, followFunction, openReportModal, setOpenReportModal } =
    useContext(appContext);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.userprofile.value);
  const postDecisionState = useSelector(
    (state: any) => state.postdecision.value
  );
  // const socket = useSelector((state: any) => state.socket.value);
    const { socket } = useSocket();
  const [disabled, setDisabled] = useState<boolean>(false)
  useEffect(() => {
    if (socket) {
      socket.on(
        "postDeleted",
        (data: { username: string; time: string; homePost: [] }) => {
          console.log(data.homePost)
          dispatch(deletePost({ time: data.time, username: data.username }));
          dispatch(deleteHomePost(data.homePost))
          dispatch(closePostActionModal(false));
        }
      );
      
      socket.on("unFollowed", (data: any) => {
          dispatch(postActionDone(true))
      });
      socket.on("userFollowingWhenFollowing", (data: any) => {
        if (!data.error) {
           dispatch(postActionDone(true));
          dispatch(unfollowFollowingR(data.followingDetails));
        } else {
           dispatch(openClose({ message: "an error occured, couldn't follow" }));
        
        }
      });
      
    }
  });
  const deletePostBtn = async () => {
    try {
      dispatch(openSpinner(1));
  
      const deletePost = await axios.put(`${userEndPoint}/deletePost`, {
        time: postDecisionState.time,
        username: profile.registerdUserIdentification,
      });
      const deleteThroughSocket =  socket?.emit("deletePost", {
        time: postDecisionState.time,
        username: profile.registerdUserIdentification,
      });
    } catch {}
  };
  const unfollow = () => {
      dispatch(openSpinner(3));
    if (postDecisionState.area === "Profile") {
      unfollowFunction(
        "unfollowSocket1",
        profile.registerdUserIdentification,
        postDecisionState.postedBy
      );
    } else if (postDecisionState.area === "Home") {
       unfollowFunction(
         "unfollowSocket2",
            profile.registerdUserIdentification,
        postDecisionState.postedBy
    
       );
    }
  };
  const followAction = () => {
     dispatch(openSpinner(2));
    if (postDecisionState.area === "Profile") {
      followFunction(
        "followSocket1",
        profile.registerdUserIdentification,
        postDecisionState.postedBy,
        "follows you"
      );
    } else if (postDecisionState.area === "Home") {
      followFunction(
        "followSocket2",
        profile.registerdUserIdentification,
        postDecisionState.postedBy,
        "follows you"
      );
    }
  };
  const reportPost = ()=>{
    setOpenReportModal(true)
    dispatch(closePostActionModal(false));
  }
  return (
    <>
      {postDecisionState.postStatus && (
        <>
          <div
            className="post_descision_p_div"
            onClick={() => dispatch(closePostActionModal(false))}
          ></div>
          <div className="post_descision_content_div">
            {postDecisionState.delete && (
              <div>
                <button disabled={disabled} onClick={() => deletePostBtn()}>
                  <span>
                    <FaTrash className="icon" /> <span>Delete Post</span>
                  </span>

                  {postDecisionState.spinnerStatus === 1 && (
                    <FaSpinner className="spin" />
                  )}
                </button>
              </div>
            )}
            {postDecisionState.follow && (
              <div>
                <button disabled={disabled} onClick={() => followAction()}>
                  <span>
                    <FaUserPlus className="icon" />{" "}
                    <span>Follow @ {postDecisionState.postedBy}</span>
                  </span>
                  {postDecisionState.spinnerStatus === 2 && <FaSpinner  className="spin" />}
                </button>
              </div>
            )}
            {postDecisionState.unfollow && (
              <div>
                <button disabled={disabled} onClick={() => unfollow()}>
                  <span>
                    <RiUserUnfollowFill className="icon" />{" "}
                    <span>Unfollow @ {postDecisionState.postedBy}</span>
                  </span>
                  {postDecisionState.spinnerStatus === 3 && <FaSpinner className="spin" />}
                </button>
              </div>
            )}
            {!postDecisionState.sameUser && (
              <div>
                <button onClick={()=>reportPost()} disabled={disabled}>
                  <span>
                    <MdReportProblem className="icon" />{" "}
                    <span>Report @ {postDecisionState.postedBy}</span>
                  </span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
      <ErrorModal/>
    </>
  );
};

export default Postaction;
