import { FaCoins, FaSpinner, FaTrash } from "react-icons/fa"
import { useSelector } from "react-redux"
import "../styles/postDescision.css"
import { closePostActionModal, openSpinner } from "../Features/Postdecision"
import { useDispatch } from "react-redux"
import  axios from "axios"
import { useContext, useEffect } from "react"
import { appContext } from "../App"
import { deletePost } from "../Features/Profile"

const Postaction = () => {
  const { userEndPoint, unfollowFunction, followFunction} = useContext(appContext)
const dispatch = useDispatch()
    const profile = useSelector((state: any) => state.userprofile.value)
  const postDecisionState = useSelector((state: any) => state.postdecision.value)
  const socket = useSelector((state: any) => state.socket.value);
  useEffect(() => {
    if (socket) {
      socket.on("postDeleted", (data: { username: string, time: string, post: [] }) => {
        console.log(data)
        dispatch(deletePost({ time: data.time, username: data.username }))
       dispatch(closePostActionModal(false));
      })
      socket.on("unFollowed", (data:any) => {
       console.log(data, "I will know what to do")
      })
    }
  })
  const deletePostBtn = async () => {
    try {
       dispatch(openSpinner(1))
      console.log(postDecisionState.time, profile.registerdUserIdentification);
      const deletePost = await axios.put(`${userEndPoint}/deletePost`, { time: postDecisionState.time, username: profile.registerdUserIdentification })
      const deleteThroughSocket = await socket.emit("deletePost", {
        time: postDecisionState.time,
        username: profile.registerdUserIdentification,
      });
      

    } catch {
      
    }
    
  }
  const unfollow = () => {
    if (postDecisionState.area === "Profile") {
       dispatch(openSpinner(3));
      unfollowFunction(
        "unfollowSocket1",
        profile.registerdUserIdentification,
        postDecisionState.postedBy
      );
      
    } else if (postDecisionState.area === "Home") {
      
    }
    
  }
  const followAction = () => {
      if (postDecisionState.area === "Profile") {
        dispatch(openSpinner(2));
        followFunction(
          "followSocket1",
          profile.registerdUserIdentification,
          postDecisionState.postedBy,
          "follows you"
        );
       
      } else if (postDecisionState.area === "Home") {
      }
    
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
                  <button onClick={() => deletePostBtn()}>
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
                  <button onClick={()=>followAction()}>
                    <span>
                      <FaCoins className="icon" />{" "}
                      <span>Follow @ {postDecisionState.postedBy}</span>
                    </span>
                    {postDecisionState.spinnerStatus === 2 && <FaSpinner />}
                  </button>
                </div>
              )}
              {postDecisionState.unfollow && (
                <div>
                  <button onClick={()=>unfollow()}>
                    <span>
                      <FaCoins className="icon" />{" "}
                      <span>Unfollow @ {postDecisionState.postedBy}</span>
                    </span>
                    {postDecisionState.spinnerStatus === 3 && <FaSpinner />}
                  </button>
                </div>
              )}
              {!postDecisionState.sameUser && (
                <div>
                  <button>
                    <span>
                      <FaCoins className="icon" />{" "}
                      <span>Report @ {postDecisionState.postedBy}</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
}


export default Postaction