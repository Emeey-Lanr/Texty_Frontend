import "../styles/login.css"
import Logo from "./Logo"
import {Link} from "react-router-dom"
import LoginMessageModal from "./LoginMessageModal"
import { appContext } from "../App"
import { useContext, useReducer, useState } from "react"
import axios from "axios"
import{UserDetailsModel} from "../Model/AppModelContext"
import LoginSpinner from "./LoginSpinner"
import { useNavigate } from "react-router-dom"
const Signup = () => {


  const {
  userEndPoint, 
   setLoginModalState,
      setLoginModalMessage,
      // 
      setSpinnerState 
} = useContext(appContext)
let navigate = useNavigate()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [checkIfInValidPassword, setCheckIfInvalidPassword] = useState<boolean>(false)

  const userSignupEndpoint: string = `${userEndPoint}/signup`
 

  const userDetails: UserDetailsModel = {
    username: username,
    password: password,
    img_url: "",
     background_img_url:"",
    about_me: "",
    post:[],
    following: [],
    followers: [],
    notification: [],
     state:""

  }
  
  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.trim().length < 6  ) {
      setCheckIfInvalidPassword(true)
    } else {
      setCheckIfInvalidPassword(false)
       
    }
   
  }
  const messageAlertFunction = (onModal: boolean, message: string) => {
       setLoginModalState(onModal)
      setLoginModalMessage(message)
    
  }

  const loadFunction = (onSpinner:boolean) => {
    setSpinnerState(onSpinner)
  }
interface DetailModel  {
              id:string
            }
  const signupBtn = () => {
    if (username !== "" && password !== "") {
    
       if (password.split("").length < 6) {
        messageAlertFunction(true, "Password must be aleast 6 characters")
       } else {
         loadFunction(true)
         axios.post(userSignupEndpoint, userDetails).then((result) => {
          if(result.data.status){
            console.log(result.data)
            
            const details:DetailModel = {
              id:result.data.client_Token
            }
            localStorage.xxxxxxxxxxxxxxx = JSON.stringify(details)
            navigate(`/${result.data.username}`)
          }else{
            loadFunction(false)
            messageAlertFunction(true, result.data.message)
          }
            
        })
        
    }
  
      
    } else {
    
       messageAlertFunction(true, "Fill in inputs")
    }
    
  }
  
  return (
    <>
     <div className="signup_div">
          <div style={{width:"100%"}}>
              <div className="signup_logo_div">
                  <Logo/>
              </div>
              <div className="signup_register">
                <p>Signup</p>
              </div>
              <div style={{width:"100%"}}>
                <div className="signup_username">
                 <p>Username</p>
                 <div> <input type="text" onChange={(e)=>setUsername(e.target.value)} /></div>
               </div>
               <div className="signup_password">
              <p>Password</p>
              {checkIfInValidPassword && <span style={{ color: "red", fontSize: "0.8rem", display: "block", padding: "2px 0" }}>password must be aleast 6 characters</span>}
                <div><input className={`${checkIfInValidPassword ? "invalid" : "valid"}`} type="password" onChange={(e)=>checkPassword(e)} /></div>
               </div>
              </div>
              <div className="signup_btn">
            <button onClick={() => signupBtn()}>Signup</button>
              </div>
              <div className="signup_signin_link">
          <div>
            <p className="gotAccountOrNot">Got an account ?</p>
                   </div>
                   <div className="signup_signin-line"></div>
          <div className="signup_signin_to_div">
            <Link to="/signin" className="signup_signin_to">
              Signin
            </Link>
                   </div>
              </div>
      </div>
      
      </div>
      <LoginSpinner/>
  <LoginMessageModal/>
    </>
     
  )
}

export default Signup