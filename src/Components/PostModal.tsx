import "../styles/home.css";
import Home from "./Home";
import { FaComment, FaHeart } from "react-icons/fa";
import { useContext, useEffect, useState, useRef } from "react";
import { appContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentLikes, commentR } from "../Redux/CurrentPost";
import noImg from "../images/noImage.png";
import ReactTimeAgo from "react-time-ago";
const PostModal: React.FC = () => {
  const { postModalStatus, setPostModalStatus, likeUnlikeSocketFunction } =
    useContext(appContext);
    let commentRef = useRef<HTMLTextAreaElement>(null);
  const currentPost = useSelector((state: any) => state.current_post.value);
  const socket = useSelector((state: any) => state.socket.value);
  const userProfileDetails = useSelector(
    (state: any) => state.userprofile.value
  );
  const dispatch = useDispatch();
  const [comment, setComment] = useState<string>("");
  const incomingLikesSocketFunction = () => {
    const dispatchFunction = (
      postedBy: string,
      time: string,
      likesBox: string
    ) => {
      dispatch(
        getCurrentLikes({ postedBy: postedBy, time: time, likesBox: likesBox })
      );
    };

    socket.on("likeOrUnlike1", (data: any) => {
      console.log(data);

      dispatchFunction(data.postedBy, data.time, data.likes);
    });
    socket.on("likeOrUnlike2", (data: any) => {
      dispatchFunction(data.postedBy, data.time, data.likes);
    });
  };

  const incomingCommentSocketFunction = () => {
    const dispatchFunction = (
      postedBy: string,
      time: string,
      commentBox: string
    ) => {
      dispatch(commentR({ postedBy: postedBy, time: time, commentBox }));
    };

    socket.on("comment1", (data: any) => {
      dispatchFunction(data.postedBy, data.time, data.comment);
    });
    socket.on("Comment2", (data: any) => {
      dispatchFunction(data.postedBy, data.time, data.comment);
    });
  };
  useEffect(() => {
    if (socket) {
      incomingLikesSocketFunction();
      incomingCommentSocketFunction();
    }
  }, []);

  const addCommentBtn = () => {
    console.log(currentPost, "lkjhgfd")
    const date = new Date();
    if (comment !== "") {
      socket.emit("comment", {
        user: userProfileDetails.registerdUserIdentification,
        comment,
        time: currentPost.time,
        postedBy: currentPost.postedBy,
        imgUrl: userProfileDetails.registeredUserImgUrl,
        commentTime: date.getTime(),
        state: "comment",
      });
    }
    if (commentRef.current?.value) {
      commentRef.current.value = ""
    } 
    
  };

  return (
    <>
      {postModalStatus && (
        <div
          className="post_modal_back_cover"
          onClick={() => setPostModalStatus(false)}
        ></div>
      )}
      {postModalStatus && (
        <div className="post_modal_p_div">
          <div className="post_modal_home_div">
            <div className="post_modal_home_post">
              <div className="date">
                <span>
                  {<ReactTimeAgo date={currentPost.time} locale="en-US" />}
                </span>
              </div>
              <div className="post_modal_caption_div">
                <p>{currentPost.text}</p>
              </div>
              {/* <div className="post_modal_post_img">
                <img src={boxer} alt="" />
              </div> */}
              <div className="post_modal_action_div">
                <div className="post_modal_name_img">
                  <img
                    src={
                      currentPost.poster_imgUrl === ""
                        ? noImg
                        : currentPost.poster_imgUrl
                    }
                    alt=""
                  />
                  <span>{currentPost.postedBy}</span>
                </div>
                <div className="post_modal_action_btn_div">
                  {currentPost.likes.find(
                    (details: string) =>
                      details === userProfileDetails.registerdUserIdentification
                  ) ? (
                    <button
                      onClick={() =>
                        likeUnlikeSocketFunction(
                          "unlike",
                          currentPost.time,
                          currentPost.postedBy,
                          "unlike"
                        )
                      }
                    >
                      <FaHeart style={{ color: "red" }} />
                      <span>
                        {currentPost.likes.length > 0 &&
                          currentPost.likes.length}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        likeUnlikeSocketFunction(
                          "like",
                          currentPost.time,
                          currentPost.postedBy,
                          "like"
                        )
                      }
                    >
                      <FaHeart />
                      <span>
                        {currentPost.likes.length > 0 &&
                          currentPost.likes.length}
                      </span>
                    </button>
                  )}
                  <button>
                    <FaComment />
                    <span>
                      {currentPost.comment.length > 0 &&
                        currentPost.comment.length}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="post_modal_comment">
            <div className="post_modal_comment_heading">
              <h3>Comments</h3>
            </div>
            {currentPost.comment.map(
              (details: {
                username: string;
                comment: string;
                time: number;
                img_url: string;
              }) => (
                <div className="post_modal_comment_body">
                  <div className="post_modal_user_img">
                    <img
                      src={details.img_url === "" ? noImg : details.img_url}
                      alt=""
                    />
                  </div>
                  <div className="post_modal_comment_details_div">
                    <div className="post_modal_comment_username_time">
                      <p>{details.username}</p>{" "}
                      <span>
                        {
                          <ReactTimeAgo
                            date={details.time}
                            locale="en-US"
                          />
                        }
                      </span>
                    </div>
                    <div className="comment">
                      <p>{details.comment}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="post_modal_input">
            <textarea ref={commentRef} onChange={(e) => setComment(e.target.value)}></textarea>
            <button onClick={() => addCommentBtn()}>
              <span>{`>>`}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
