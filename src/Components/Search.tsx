import "../styles/search.css"
import boxer from "../images/boxer.jpg"
import {FaSearch, FaLockOpen, FaLock} from "react-icons/fa"
import { useState, useContext, useEffect } from "react"
import SideBarModal from "./SideBarModal"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { appContext } from "../App"
import Group from "./Group"
import ChattingSpace from "./ChattingSpace"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {unfollowFollowingR} from "../Features/Profile"
import { useNavigate } from "react-router-dom"

const Search = () => {
  const { userEndPoint, getUserProfile, setRouteIdentification, setGroupChatOrPrivateChatOpening, followFunction, unfollowFunction } = useContext(appContext)  
    const socket = useSelector((state: any) => state.socket.value)
  const userDetails = useSelector((state: any) => state.userprofile.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [switchPage, setSwitchPage] = useState<boolean>(true)
  const [usernameOrGroupName, setUsernameOrGroupName] = useState<string>("")
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])

  useEffect(() => {
    getUserProfile("-;;'kjg", "home")
    setRouteIdentification("search")
    setGroupChatOrPrivateChatOpening(0)
  }, [])
   const followed = () => {
     socket.on("userFollowingWhenFollowing", (data: any) => { 
       if (!data.error) {
         dispatch(unfollowFollowingR(data.followingDetails))
       } else {
         alert("an error occur couldn't follow")
       }
     })

  }
 const unFollowed = () =>{
    socket.on("userFollowingWhenUnFollowing", (data: any) => {
      if (!data.error) {
        dispatch(unfollowFollowingR(data.userLoggedInFollowing))
      } else {
        alert(" an error occured")
      }
      
      
    })
  }
  useEffect(() => {
    if (socket) {
      followed()
      unFollowed()
    }
  })
  // const openuserPage = () => {
  //   alert(30)
  // }
  
  
  const searchBtn = () => {
    axios.post(`${userEndPoint}/search`, { username: usernameOrGroupName }).then((result) => {
      console.log(result.data)
      setUsers(result.data.ifUserExist)

    })
  }
  const followUser = () => {
    alert(10)
    
  }
  const follow = (userTheyWantToFollow:string) => {
    let notificationWords = ""
     
    const checkIfFollowers = userDetails.followers.find((name: { username: string }) => name.username === userTheyWantToFollow)
    if (checkIfFollowers) {
      notificationWords = "followed you back"
    } else {
      notificationWords = "follows you"
    }
       
      
    followFunction("followSocket2", userDetails.registerdUserIdentification, userTheyWantToFollow, notificationWords)
  }

  return (
    <>
        <div className="search_home_div">
          <div className="search_home_head">
                <div className="search_home_input_div">
              <input onChange={(e)=>setUsernameOrGroupName(e.target.value)} type="text" /> <button onClick={()=>searchBtn()}>
                  <FaSearch/>
              </button>
          </div>
          <div className="search_home_head_divider">
              <button onClick={()=>setSwitchPage(true)} style={switchPage ? {borderBottom:"2px solid black"} :{borderBottom:"none"} }> People</button>
              <button onClick={()=>setSwitchPage(false)} style={!switchPage ? {borderBottom:"2px solid black"}: {borderBottom:"none"}}>Group</button>
          </div>
          </div>
      {switchPage && <div className="people">
          {users.length > 0 ? users.map((name: { username: string, about_me:string }) => (
             <div  className="user">
            <div className="img_description_div">
              <div style={{ display: 'flex' }}>
                <img src={boxer} alt="" />
                  <h3>{name.username }</h3>
              </div>
            
                <p>{ name.about_me}</p>
            </div>
            <div className="action">
                <button onClick={()=>navigate(`/${name.username}`)}>View Profile</button>
                {userDetails.following.find((namee: { username: string }) => namee.username === name.username) ? <button onClick={()=>unfollowFunction("unfollowSocket2",userDetails.registerdUserIdentification,name.username)} style={{background:"black", color:"white"}}>Following</button> : <button onClick={()=>follow(name.username)}>Follow</button>}
                <button>Block</button>
            </div>
          </div>
          )): <div><p></p></div>}
      </div>}
        {!switchPage && <div className="group_div">
          {groups.length > 0 ? groups.map((name: { group_name: string }) => (
            < div className="group">
          <div className="group_side1">
            <div>
              <img src={boxer} alt="" />
            </div>
            <div style={{ paddingLeft: "5px" }}>
              <h3>Willow Group <span><FaLockOpen /></span></h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, magnam.</p>
            </div>
          </div>
          <div className="group_side2">
            <button>Join</button>
          </div>

        </div> 
          )) : <div><p></p></div>}
        
        
    </div> }
        
      </div>
      <Group />
      <ChattingSpace/>
      <Navbar/>
      <SideBarModal />
      <Sidebar/>
    </>
    
  )
}

export default Search