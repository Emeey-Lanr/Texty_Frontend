import "../styles/home.css"
import { FaTimes,FaArrowLeft } from "react-icons/fa"
import {BiImageAdd} from "react-icons/bi"
import boxer from "../images/boxer.jpg"
import { useState, useContext } from "react"
import { appContext } from "../App"
import { upload } from "@testing-library/user-event/dist/upload"
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"

import { io } from "socket.io-client";
import { useSocket } from "../Socket";
const Post = () => {
    const {userEndPoint, createPostModal, setCreatePostModal } = useContext(appContext)
    // const socket = useSelector((state: any) => state.socket.value)
    const userDetails = useSelector((state: any) => state.userprofile.value)
      const { socket } = useSocket();
    const [fireAction, setFireAction] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const [image, setImage] = useState<any>("")
    
    interface name {
        img:string
    }
    interface UploadImage {
      lastModified:number ;
lastModifiedDate: any;
name:string;
size:number;
type:string;
webkitRelativePath:string;
 }
  
  
    const pickImg = async (e: any) => {
       
        const name = e.currentTarget.files[0]
        let imgUpload = new FileReader()
            imgUpload.readAsDataURL(name)
            imgUpload.onload = () => {
        
                setImage(imgUpload.result)
            }
      
        
   
    }
    const uploadPostBtn = () => {
        const date = new Date()

        const post = {
          text: text,
          date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
          time: date.getTime(),
          postedBy: userDetails.registerdUserIdentification,
          poster_imgUrl:userDetails.registeredUserImgUrl,
          comment: [],
          likes: [],
        };
    
        setFireAction(true)


        axios.post(`${userEndPoint}/createPost`, {username:userDetails.registerdUserIdentification, postContent:post}).then((result) => {
          
            if (result.data.status) {
                post.poster_imgUrl = result.data.img_url
                socket?.emit("emitPost", {username:userDetails.registerdUserIdentification, post:post})
                setFireAction(false)
            }
        }).catch((error) => {
           
                setCreatePostModal(2)
        })
   
        
    }
    return (
        <>
            {createPostModal === 1 && <div className="create_group_post_div" style={image === "" ? { alignItems: "center" } : { alignItems: "flex-end" }}>
                <div className="create_post_div" style={image === "" ? { height: "unset" } : { height: "80%" }}>
                    <div className="go_back" >
                        <button style={{border:"none",background:"none"}} onClick={()=>setCreatePostModal(0)}>
                            <FaArrowLeft style={{color:"white"}}/>
                        </button>
                        
                    </div>
                    <div className="input_post_div">
                        <textarea onChange={(e)=>setText(e.target.value)} ></textarea>
                    </div>
                    <div className="img_post_div">
                        {image !== "" && <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button style={{ border: "none", background: "none" }} onClick={() => setImage("")}>
                                <FaTimes style={{ color: "white" }} />
                            </button>
                     
                        </div>}
                        {image !== "" && <img src={image} alt="" />}
                    </div>
                    <div className="action_post">
                        <p className="max">Max-length 100</p>
                   
                        <button className="btnAction_spin" disabled={fireAction} onClick={()=>uploadPostBtn()}>
                            {!fireAction ? <>
                                post
                            </> :
                                <>
                                    <span className="spin1"></span><span className="spin2"></span><span className="spin3"></span><span className="spin4"></span>
                                </>}
                        </button>
                    </div>

                </div>

            </div>}
            {createPostModal === 2 && <div className="create_post_error_message_div">
                <div className="error_div">
                      <div className="error_exit_action_div">
                    <button onClick={()=>setCreatePostModal(0)}>
                        <FaTimes/>
                    </button>
                </div>
                <div className="error_message_div">
                    <p>An Error Occured!</p>
                </div>

                </div>
              
            
            </div>}
      </>
     
  )
}

export default Post