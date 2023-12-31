import "../styles/chat.css";
import { appContext } from "../App";
import { useContext, useState, useEffect, useRef } from "react";
import GroupNotification from "./GroupNotification";
import GroupDetails from "./GroupDetails";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { incomingMesageR, reflectMessageInstantly } from "../Redux/Message";
import axios from "axios";
import ActionModal from "./ActionModal";
import noImg from "../images/noImage.png";
import { useSocket } from "../Socket";

const ChattingSpace = () => {
  // const socketTesting = io("http://localhost:2001");
  const {
    hideSideBar,
    setHideSideBar,
    showSideBarBtn,
    groupChatOrPrivateChatOpening,
    setGroupChatOrPrivateChatOpening,
    incomingMessageDetails,
    messageEndPoint,
    messageError,
    setMessageError
  } = useContext(appContext);
   const { socket } = useSocket();
  // const socket = useSelector((state: any) => state.socket.value);
  const userDetails = useSelector((state: any) => state.userprofile.value);
  const messageRedux = useSelector(
    (state: any) => state.privatemessagechat.value
  );
  const dispatch = useDispatch();
 
  const lastMessage = useRef<HTMLDivElement>(null);
   const emptyInput = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (socket) {
      incomingMessageDetails();
      lastMessage.current?.scrollIntoView();
      
    }
  });
  useEffect(() => {}, []);
  const messageEndpointt = `${messageEndPoint}/sendMessageOrCreate`;
  // const messageTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setMessage(e.target.value);
  // };
  const [ifBlocked, setIfBlocked] = useState<boolean>(false)
  const sendMessageBtn =  () => {
        

  const check = userDetails.registeredUserBlocked.find((details: { username: string }) => details.username === messageRedux.currentDetails.notowner)
  if (check) {
    setMessageError(`Unblock to send message`)
    setTimeout(()=>{
     setMessageError("")
    },1_000)
  } else {
       let m = "";
       m = message;
       const date = new Date();
       const hours = date.getHours();
       const minutes = date.getMinutes();
       const info = {
         owner: userDetails.registerdUserIdentification,
         owner_imgurl: userDetails.registeredUserImgUrl,
         notowner: messageRedux.currentDetails.notowner,
         notowner_imgurl: messageRedux.currentDetails.notowner_imgurl,
         sender: userDetails.registerdUserIdentification,
         text: m,
         time: `${hours}:${minutes}${hours >= 12 ? "PM" : "AM"}`,
    };
    dispatch(
      reflectMessageInstantly({
        notOwner:info.notowner,
        message: {
          sender: info.owner,
          time: info.time,
          text: info.text,
          checked: true,
        },
      })
    );

       socket?.emit("privateMessage", info);
       

        axios.post(messageEndpointt, info);
         if (emptyInput.current) {
           emptyInput.current.value = "";
         }
  }


      
   
    
        
     
  };
  return (
    <>
      {groupChatOrPrivateChatOpening === 1 && (
        <div className="chat_parent_body">
          <div></div>
          <div className="chatting_space">
            <div className="goBack_chatting_space">
              <button onClick={() => setGroupChatOrPrivateChatOpening(0)}>
                <FaArrowLeft />
              </button>
            </div>
            <div className="chat_group">
              {messageRedux.currentDetails.message.map(
                (
                  data: {
                    text: string;
                    sender: string;
                    time: string;
                    owner_imgurl: string;
                    notowner_imgurl: string;
                  },
                  id: number
                ) => (
                  <div
                    key={id}
                    className={
                      data.sender === userDetails.registerdUserIdentification
                        ? "chat-message_div_1"
                        : "chat-message_div_2"
                    }
                  >
                    <div
                      className={
                        data.sender === userDetails.registerdUserIdentification
                          ? "chat-message_imgdiv_1"
                          : "chat-message_imgdiv_2"
                      }
                    >
                      {data.sender ===
                      userDetails.registerdUserIdentification ? (
                        <>
                          <img
                            style={{ objectFit: "cover" }}
                            src={
                              userDetails.registeredUserImgUrl === ""
                                ? noImg
                                : userDetails.registeredUserImgUrl
                            }
                            alt=""
                          />
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "50% 50%",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.7rem",
                                width: "100px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {data.sender ===
                              userDetails.registerdUserIdentification
                                ? "you"
                                : data.sender}
                            </span>
                            <span
                              style={{
                                borderLeft: "2px solid white",
                                textAlign: "center",
                                fontSize: "0.7rem",
                              }}
                            >
                              {data.time}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "50% 50%",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.7rem",
                                width: "100px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {data.sender ===
                              userDetails.registerdUserIdentification
                                ? "you"
                                : data.sender}
                            </span>
                            <span
                              style={{
                                borderLeft: "2px solid white",
                                textAlign: "center",
                                fontSize: "0.7rem",
                              }}
                            >
                              {data.time}
                            </span>
                          </div>
                          <img
                            src={
                              messageRedux.currentDetails.notowner_imgurl === ""
                                ? noImg
                                : messageRedux.currentDetails.notowner_imgurl
                            }
                            alt=""
                          />
                        </>
                      )}
                    </div>
                    <div
                      className={
                        data.sender === userDetails.registerdUserIdentification
                          ? "chat_message_1"
                          : "chat_message_2"
                      }
                    >
                      <p>{data.text}</p>
                    </div>
                  </div>
                )
              )}
              {userDetails.registeredUserBlocked.find(
                (details: { username: string }) => () =>
                  details.username === messageRedux.currentDetails.notowner
              ) && (
                <div className="if_you_have_blocked">
                  <p>
                    you've blocked @{" "}
                    <span>{messageRedux.currentDetails.notowner}</span>{" "}
                  </p>
                </div>
              )}
              <div ref={lastMessage} className="last_message" />
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
                <div>
                  <textarea
                    ref={emptyInput}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="chat_btn">
                {message !== "" && (
                  <button onClick={() => sendMessageBtn()}>
                    <span>{">>"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      { messageError !== "" && <div className="unblock_modal">
        <div>
          <p>{messageError}</p>
        </div>
      </div>}
      <ActionModal />
    </>
  );
};

export default ChattingSpace;
