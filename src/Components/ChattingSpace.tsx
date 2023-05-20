import "../styles/chat.css"
import boxer from "../images/boxer.jpg"
import { AiOutlineCamera } from "react-icons/ai"
import { appContext } from "../App"
import {useContext, useState, useEffect} from "react"
import GroupNotification from "./GroupNotification"
import GroupDetails from "./GroupDetails"
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {incomingMesageR}from "../Features/Message"
import axios from "axios"
import ActionModal from "./ActionModal"

const ChattingSpace = () => {
      const {hideSideBar, setHideSideBar,  showSideBarBtn, groupChatOrPrivateChatOpening, setGroupChatOrPrivateChatOpening, incomingMessageDetails,messageEndPoint} = useContext (appContext)
    const socket = useSelector((state: any) => state.socket.value)
    const userDetails = useSelector((state: any) => state.userprofile.value)
    const messageRedux = useSelector((state: any) => state.privatemessagechat.value)
    const dispatch = useDispatch()
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        incomingMessageDetails() 
    
     
    })

    const messageEndpointt =`${messageEndPoint}/sendMessageOrCreate`
    const sendMessageBtn = async () => {
        const date = new Date()
        const info = {
            owner: userDetails.registerdUserIdentification,
            owner_imgurl:userDetails.registeredUserImgUrl,
            notowner: messageRedux.currentDetails.notowner,
            notowner_imgurl:messageRedux.currentDetails.notowner_imgurl,
            sender:userDetails.registerdUserIdentification,
            text: message,
            time: `${date.getHours()}:${date.getMinutes()}`,
        
            // time:`${date.}`
            
        }
        // console.log(`${info.year}`.split(" "))
        // // console.log(message)
        socket.emit("privateMessage", info)
        const sendMessage = await axios.post(messageEndpointt, info)
      
        // dispatch(incomingMesageR(
        //     {
        //         chattingWithName: "ronald",
        //         incomingMessage: { owner: "emeey", notOwner:"ronald",message:[{sender:"emeey", time:"2:30pm", text:"Fuck you", messageImg:"", img:""}] }
        //     }))
      
        // console.log(messageRedux)

          
      }
  return (
      <>
          {groupChatOrPrivateChatOpening === 1 && 
              
         <div className="chatting_space">
                  <div className="goBack_chatting_space">
                      <button onClick={()=>setGroupChatOrPrivateChatOpening(0)}>
                          <FaArrowLeft/>
                      </button>
         </div>
          <div className="chat_group">
                      {messageRedux.currentDetails.message.map((data:{text:string, sender:string, time:string})=>(
                          <div className={data.sender === userDetails.registerdUserIdentification ? "chat-message_div_1" : "chat-message_div_2" }>
                              <div className={data.sender === userDetails.registerdUserIdentification ? "chat-message_imgdiv_1" : "chat-message_imgdiv_2"}>
                                  {data.sender === userDetails.registerdUserIdentification ? <>
                                      <img src={boxer} alt="" />
                              <div>
                                      <span>{data.sender === userDetails.registerdUserIdentification ? "you" : data.sender }</span><span style={{ borderLeft: "2px solid white", textAlign: "center" }}>{data.time }</span>
                              </div>
                                  </>:
                                  <>
                                       <div>
                                      <span>{data.sender === userDetails.registerdUserIdentification ? "you" : data.sender }</span><span style={{ borderLeft: "2px solid white", textAlign: "center" }}>{data.time }</span>
                                      </div>
                                      <img src={boxer} alt="" />
                            
                                  </>}
                              
                          </div>
                              <div className={data.sender === userDetails.registerdUserIdentification ? "chat_message_1" : "chat_message_2"}>
    
                                  <p>{data.text }</p>
            
                          </div>
                      </div>
                      )) }
              {/* <div className="chat-message_div_2">
                  <div className="chat-message_imgdiv_2">
                     
                     
                </div>    
                  <div className="chat_message_2">
    
                      <p>  unde blanditiis doloremque quisquam consequatur impedit quod cupiditate nulla quis, doloribus voluptatibus tempore error ipsum provident laudantium! Asperiores veniam, nostrum ratione soluta pariatur, vitae excepturi, eligendi beatae dolorem distinctio maiores? Perspiciatis est veritatis, mollitia placeat ex minima perferendis impedit ad excepturi doloribus aspernatur accusamus necessitatibus ut hic earum facilis natus deleniti, laboriosam deserunt ea nostrum obcaecati facere reiciendis. Expedita hic magni ab, culpa optio amet error necessitatibus neque sit dolores voluptatibus ut numquam! Dignissimos aut cumque sunt eligendi autem, consectetur assumenda ab mollitia aliquid, nesciunt voluptatem maiores aperiam. Cumque sapiente incidunt odit recusandae minus ullam quam ducimus, sed quas vitae tempora accusantium facilis exercitationem vel aliquam odio nobis corrupti aliquid iure esse ipsam. Dolorem reiciendis impedit magnam quia ipsa fuga delectus! Esse quo suscipit exercitationem quisquam deleniti et tenetur, magnam temporibus officia nisi quia rem corrupti laudantium cumque! Facere eos enim nostrum, tempore laudantium itaque minus doloribus, sit quam deleniti cum rerum ipsa voluptatum, tempora laboriosam perferendis expedita molestiae adipisci. Id ipsum aperiam, voluptatum qui dolores doloribus!</p>
            
                  </div>
              </div> */}
             
             
              
          </div>
          <div className="chat_input_div">
              <div className="chat_input">
                  <label id="pic">
                      <AiOutlineCamera className="camera_icon" />
                      <input type="file" id="pic" hidden/>
                    </label>
                  
                  <div>
                       <textarea onChange={(e)=>setMessage(e.target.value)}></textarea>
                  </div>
                 
              </div>
              <div className="chat_btn">
                     <button  onClick={()=>sendMessageBtn()}>
                            <span>{">>" }</span>  
                  </button>
             </div>
           
                 
              
              </div>
          </div>
          }
          
<ActionModal/>
    </>
     
  )
}

export default ChattingSpace