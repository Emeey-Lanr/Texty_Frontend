import "../styles/user.css"
import { CiChat1 } from "react-icons/ci"
import boxer from "../images/boxer.jpg"
import {useEffect, useState} from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { appContext } from "../App"
import { useContext } from "react"
import {unfollowFollowingR} from "../Features/Profile"
interface FriendsInterface {
    setOpenFollowersFollowing: React.Dispatch<React.SetStateAction<boolean>>;
    openFFNumber: number;
    setOpenFFNumber: React.Dispatch<React.SetStateAction<number>>;
}

const Friends = ({ setOpenFollowersFollowing, openFFNumber, setOpenFFNumber }: FriendsInterface) => {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const {followFunction, unfollowFunction} = useContext(appContext)
    const userDetails = useSelector((state: any) => state.userprofile.value)
    const socket = useSelector((state: any) => state.socket.value)
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
        
    })
    const friendsBtn = () => {
        setOpenFFNumber(0)
        
    }
    const requestBtn = () => {
        setOpenFFNumber(1)
        
    }

    const chatWith = (name: string) => {
        navigate(`/chat/${name}`)
        
    }
    const followViaSocket3Btn = (userYouWantToFollow: string) => {
        const checkifUserExistInYourFollowers = userDetails.ifUserFollowers.find((name: { username: string }) => name.username === userYouWantToFollow)
        let followWords = ""
        if (checkifUserExistInYourFollowers) {
            followWords = "followed you back"
        } else {
            followWords = "follows you"
        }
        followFunction("followSocket3", userDetails.registerdUserIdentification, userYouWantToFollow, followWords)
    }
   
  return (
      <div className="friends_space">
          <div>
              <button onClick={()=>setOpenFollowersFollowing(false)} style={{border:"none", background:"none"}}>
                  <FaArrowLeft style={{color:"black"}}/>
              </button>
          </div>
          <div className="friends_heading">
              <button onClick={()=>friendsBtn()} style={openFFNumber === 0 ? {borderBottom:"3px solid black"}:{borderBottom:"none"}}>
                  <p>Followers</p>
              </button>
              <button onClick={()=>requestBtn()} style={openFFNumber !== 0 ? {borderBottom:"3px solid black"}:{borderBottom:"none"}} >
                  <p>Following</p>
              </button>
          </div>
        
              {/* Friends */}
          {openFFNumber === 0 ?
               <div className="following_user_div">
                  {userDetails.followers.map((name: { username: string, state:string }) => (
                      <div className="following_user_details">
                      <div className="following_user_head">
                          <div className="img_div">
                              <img src={boxer} alt="" />
                          </div>
                          <div className="name_div">
                              <div>
                                      <h2>{name.username} followers</h2> <>
                                          {userDetails.ifUserFollowers.length > 0 ? 
                                              (name.username === userDetails.registerdUserIdentification ? <></> : 
                                           userDetails.ifUserFollowers.find((namee:{username:string})=> namee.username === name.username) && <div><p>Follows you</p></div> ) : <>
                                                  
                                              </>
                                            }
                                      </>
                              </div>
                              <p>I'm a jungle nigga, who does what we wants when he wants to</p>
                          </div>
                          </div>
                        {/* For logged in user */}
                          {userDetails.registerdUserIdentification === userDetails.username ? <>
                          <div className="following_user_action">
                                  <button style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                      <CiChat1 />
                                  </button>
                                  
                                  {userDetails.following.find((namee: { username: string }) => namee.username === name.username) ?
                                      <button onClick={()=>unfollowFunction("unfollowSocket2", userDetails.registerdUserIdentification, name.username)} style={{ marginLeft: "10px", background: "black", color: "white" }}>Following</button> :
                                       <button onClick={()=>followFunction("followSocket2", userDetails.registerdUserIdentification, name.username, "followed you back")}  style={{ marginLeft: "10px"}}>Follow</button>
                                      } 
                                  
                                  <button style={{ marginLeft: "10px" }}>Block</button>
                            </div>
                          
                          </> :
                            //   For looked for user
                              <>
                              {name.username === userDetails.registerdUserIdentification ? <></> : <div className="following_user_action">
                                  <button style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                      <CiChat1 />
                                  </button>
                                  {userDetails.ifUserFollowing.find((namee: { username: string }) => namee.username === name.username) ?
                                      <button style={{ marginLeft: "10px", background: "black", color: "white" }}>Following</button> :
                                      <button style={{ marginLeft: "10px" }}>Follow</button>
                                  }
                                  <button style={{ marginLeft: "10px" }}>Block</button>
                          
                              </div>}
                          </>}
                          
                      
                  </div>
                  )) }
                  
                
                
              </div>:
            //   <div className="friends_details_div">
            //   <div className="friends_details">
            //       <div className="friends_img_div">
            //           <img src={boxer} alt="" />
            //       </div>
            //       <div className="friend_body_div">
            //           <div className="friends_body_name_chat">
            //           <div className="friends_body_name">
            //               <h4>Oyelowo Emmanuel</h4>
            //               <p><span>13k Following</span><span style={{paddingLeft:"10px"}}>12k Followers</span></p>
            //               </div>
            //               <div className="friends_body_chat">
            //                   <button>
            //                       <CiChat1 />
            //                   </button>
            //               </div>
            //           </div>
            //       <div className="friends_btn_action">
            //           <button>Follow</button>
            //           <button style={{ marginLeft: "10px" }}>Block</button>
                     
            //           {/* <button>Unblock</button>
            //           <button>UnFollow</button> */}
            //      </div>
            //           <div className="friends_about_me">
            //               <div className="heading">
            //                   <p>About Me</p>
            //           </div>
            //           <div className="details">
            //                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur blanditiis voluptatem laboriosam. Et dolorum, voluptate eius quia optio assumenda voluptatem?</p>
            //           </div>
                         
            //           </div>
                
            //       </div>
              
            //       </div>
                  
            //       </div>:
              <div className="following_user_div">
                  {userDetails.following.map((name:{username:string, state:string})=>(
                    <div className="following_user_details">
                      <div className="following_user_head">
                          <div className="img_div">
                              <img src={boxer} alt="" />
                          </div>
                          <div className="name_div">
                              <div>
                                      <h2>{name.username}</h2>
                                      {userDetails.registerdUserIdentification === userDetails.username ? <>
                                          {userDetails.followers.find((namee: { username: string }) => namee.username === name.username) ?
                                              <div><p>Follows you</p></div> : <></>
                                          }
                                      
                                      </> : <>
                                            <>
                                          {userDetails.ifUserFollowers.length > 0 ? 
                                              (name.username === userDetails.registerdUserIdentification ? <></> : 
                                           userDetails.ifUserFollowers.find((namee:{username:string})=> namee.username === name.username) && <div><p>Follows you</p></div> ) : <>
                                                  
                                              </>
                                            } 
                                      </>
                                          
                                      </>}
                                    
                              </div>
                             
                              <p>I'm a jungle nigga, who does what we wants when he wants to</p>
                          </div>
                          </div>
                          {/* For user logged in*/}
                          {userDetails.registerdUserIdentification === userDetails.username ? <>
                              <div className="following_user_action">
                              <button onClick={() => chatWith(name.username)} style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                  <CiChat1 />
                              </button>
                             <button onClick={()=>unfollowFunction("unfollowSocket2", userDetails.registerdUserIdentification,name.username)} style={{ marginLeft: "10px",}}>Unfollow</button> 
                              <button style={{ marginLeft: "10px" }}>Block</button>
                          
                          </div>
                              
                          </>
                              
                              :
                            //   For searched user
                              <>
                               {name.username === userDetails.registerdUserIdentification ? <></> : <div className="following_user_action">
                              <button onClick={() => chatWith(name.username)} style={{ fontSize: "1.2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                  <CiChat1 />
                              </button>
                              <>
                                  {userDetails.ifUserFollowing.find((namee: { username: string }) => namee.username === name.username) ?
                                      <button onClick={()=> unfollowFunction("unfollowSocket3", userDetails.registerdUserIdentification, name.username)} style={{ marginLeft: "10px", background:"black", color:"white" }}>Following</button> :
                                      <button onClick={()=>followViaSocket3Btn(name.username)} style={{ marginLeft: "10px" }}>Follow</button>
                                    }
                              </>
                              <button style={{ marginLeft: "10px" }}>Block</button>
                          
                          </div>}
                          </>}
                         
                      
                  </div>
                  )) }
                  
                
                
              </div>}
              
          
         
    </div>
  )
}

export default Friends