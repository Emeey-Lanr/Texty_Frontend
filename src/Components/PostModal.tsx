import "../styles/home.css"
import Home from "./Home"
import boxer from "../images/boxer.jpg"
import { FaComment, FaHeart } from "react-icons/fa"
import { useContext, } from "react"
import { appContext } from "../App"
import { useSelector } from "react-redux"
const PostModal: React.FC = () => {
    const {postModalStatus, setPostModalStatus}=useContext(appContext)
    const currentPost = useSelector((state:any)=>state.current_post.value)
    
    return (
        <>
       
            {postModalStatus && <div className="post_modal_back_cover" onClick={() => setPostModalStatus(false)}>
            </div>}
            {postModalStatus &&<div className="post_modal_p_div">
                <div className="post_modal_home_div">
                    <div className="post_modal_home_post">
                        <div className="date">
                            <span>17hours ago</span>
                        </div>
                        <div className="post_modal_caption_div">
                            <p>{currentPost.text}</p>
                        </div>
                        <div className="post_modal_post_img">
                            <img src={boxer} alt="" />
                        </div>
                        <div className="post_modal_action_div">
                            <div className="post_modal_name_img">
                                <img src={boxer} alt="" />
                                <span>{currentPost.postedBy}</span>
                            </div>
                            <div className="post_modal_action_btn_div">
                                <button><FaHeart /><span>{currentPost.likes.length > 0 && currentPost.likes.length}</span></button><button><FaComment /><span>{currentPost.comment.length > 0 && currentPost.comment.length}</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post_modal_comment">
                    <div className="post_modal_comment_heading">
                        <h3>Comments</h3>
                    </div>
                    <div className="post_modal_comment_body">
                        <div className="post_modal_user_img">
                            <img src={boxer} alt="" />
                        </div>
                        <div className="post_modal_comment_details_div">
                            <div className="post_modal_comment_username_time">
                                <p>Emeey Lanr</p> <span>12hrs</span>
                            </div>
                            <div className="comment">
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet dolore quod saepe obcaecati reprehenderit illum eius perferendis distinctio ea esse.</p>
                            </div>
                        </div>
                        
                    </div>

                </div>
                <div className="post_modal_input">
                    <textarea></textarea>
                    <button>
                        <span>{`>>`}</span>
                    </button>

                </div>
              
              
            </div>}
      </>
    
  )
}

export default PostModal