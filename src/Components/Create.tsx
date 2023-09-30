import "../styles/home.css"
import { FaTimes,FaArrowLeft } from "react-icons/fa"
import {BiImageAdd} from "react-icons/bi"
import boxer from "../images/boxer.jpg"
import Post from "./Post"
import { appContext } from "../App"
import {useContext} from "react"
const Create:React.FC = () => {
  const { openPrePost,
    setOpenPrePost,
    setCreatePostModal,
    setCreateGroupModal,
    setMessageError
  } = useContext(appContext)
  const featuresNotReady = () => {
    setOpenPrePost(false)
    setMessageError("Features Not Ready")
    setTimeout(() => {
       setMessageError("");
    },1_000)
   
    
    
  }
  return (
    <>
      {openPrePost &&<div className="create_group_post">
        <div className="action_div">
          <div className="c_exit">
            <button onClick={()=>setOpenPrePost(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="c_create">
            <button onClick={() => setCreatePostModal(1)}>Post</button>
            <button onClick={()=>featuresNotReady()}>Group</button>
            {/* <button onClick={() => setCreateGroupModal(true)}>Group</button> */}
          </div>
      
        </div>
    

      </div>}
      <Post/>
    </>
   
  )
}

export default Create