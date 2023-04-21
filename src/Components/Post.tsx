import "../styles/home.css"
import { FaTimes,FaArrowLeft } from "react-icons/fa"
import {BiImageAdd} from "react-icons/bi"
import boxer from "../images/boxer.jpg"
import { useState, useContext } from "react"
import { appContext } from "../App"

const Post = () => {
    const {createPostModal, setCreatePostModal} = useContext(appContext)
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
                console.log(imgUpload.result)
                setImage(imgUpload.result)
            }
      
        
   
    }
    return (
        <>
            {createPostModal && <div className="create_group_post_div" style={image === "" ? { alignItems: "center" } : { alignItems: "flex-end" }}>
                <div className="create_post_div" style={image === "" ? { height: "unset" } : { height: "80%" }}>
                    <div className="go_back" >
                        <button style={{border:"none",background:"none"}} onClick={()=>setCreatePostModal(false)}>
                            <FaArrowLeft style={{color:"white"}}/>
                        </button>
                        
                    </div>
                    <div className="input_post_div">
                        <textarea ></textarea>
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
                        <label id="upload">
                            <BiImageAdd className="icon" />
                            <input type="file" hidden id="upload" onChange={(e) => pickImg(e)} />
                        </label>
                        <button>
                            post
                        </button>
                    </div>

                </div>

            </div>}
      </>
     
  )
}

export default Post