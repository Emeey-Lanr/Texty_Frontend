import "../styles/chat.css"
import boxer from "../images/boxer.jpg"
import { AiOutlineCamera } from "react-icons/ai"

const ChattingSpace = () => {
  return (
      <div className="chatting_space">
          <div className="chat_group_indication">
              <div></div>
          </div>
          <div className="chat_group">
              <div className="chat-message_div_1">
                  <div className="chat-message_imgdiv_1">
                      <img src={boxer} alt="" />
                      <div>
                          <span>Emeey</span><span style={{borderLeft:"2px solid white"}}>12:30pm</span>
                       </div>
                </div>    
                  <div className="chat_message_1">
    
                      <p>cumque! Facere eos enim nostrum, tempore laudantium itaque minus doloribus, sit quam deleniti cum rerum ipsa voluptatum, tempora laboriosam perferendis expedita molestiae adipisci. Id ipsum aperiam, voluptatum qui dolores doloribus!</p>
            
                  </div>
              </div>
              <div className="chat-message_div_2">
                  <div className="chat-message_imgdiv_2">
                     
                      <div>
                          <span>You</span><span style={{borderLeft:"2px solid white"}}>12:30pm</span>
                      </div>
                       <img src={boxer} alt="" />
                </div>    
                  <div className="chat_message_2">
    
                      <p>  unde blanditiis doloremque quisquam consequatur impedit quod cupiditate nulla quis, doloribus voluptatibus tempore error ipsum provident laudantium! Asperiores veniam, nostrum ratione soluta pariatur, vitae excepturi, eligendi beatae dolorem distinctio maiores? Perspiciatis est veritatis, mollitia placeat ex minima perferendis impedit ad excepturi doloribus aspernatur accusamus necessitatibus ut hic earum facilis natus deleniti, laboriosam deserunt ea nostrum obcaecati facere reiciendis. Expedita hic magni ab, culpa optio amet error necessitatibus neque sit dolores voluptatibus ut numquam! Dignissimos aut cumque sunt eligendi autem, consectetur assumenda ab mollitia aliquid, nesciunt voluptatem maiores aperiam. Cumque sapiente incidunt odit recusandae minus ullam quam ducimus, sed quas vitae tempora accusantium facilis exercitationem vel aliquam odio nobis corrupti aliquid iure esse ipsam. Dolorem reiciendis impedit magnam quia ipsa fuga delectus! Esse quo suscipit exercitationem quisquam deleniti et tenetur, magnam temporibus officia nisi quia rem corrupti laudantium cumque! Facere eos enim nostrum, tempore laudantium itaque minus doloribus, sit quam deleniti cum rerum ipsa voluptatum, tempora laboriosam perferendis expedita molestiae adipisci. Id ipsum aperiam, voluptatum qui dolores doloribus!</p>
            
                  </div>
              </div>
             
             
              
          </div>
          <div className="chat_input_div">
              <div className="chat_input">
                  <label id="pic">
                      <AiOutlineCamera className="camera_icon" />
                      <input type="file" id="pic" hidden/>
                    </label>
                  
                  <div>
                       <textarea ></textarea>
               
                  </div>
                 
              </div>
              <div className="chat_btn">
                     {/* <button>
                   
                  </button> */}
              </div>
           
                 
              
          </div>
          
</div>
  )
}

export default ChattingSpace