import React from 'react'
import { Link } from "react-router-dom"
import LoginMessageModal from './LoginMessageModal'
import Logo from './Logo'
import { appContext } from '../App'
import { useContext, useState } from 'react'
import LoginSpinner from './LoginSpinner'
import axios from 'axios'
import { UserDetailsModel } from "../Model/AppModelContext"
import { useNavigate} from 'react-router-dom'

const SignIn = () => {
  let navigate = useNavigate()
   const {
  userEndPoint, 
   setLoginModalState,
      setLoginModalMessage,
      // 
      setSpinnerState 
} = useContext(appContext)
 const signinEndpoint:string = `${userEndPoint}/signin`
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  const userInfo: UserDetailsModel = {
    username:username,
    password: password,
   
    
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
  const verfifyUserBtn = () => {
   
    if (username !== "" && password !== "") {
        loadFunction(true)
        axios.post(signinEndpoint, userInfo).then((result) => {
          if (result.data.status) {
          
              const details:DetailModel = {
              id:result.data.message
            }
            localStorage.xxxxxxxxxxxxxxx = JSON.stringify(details)
            navigate(`/${result.data.username}`)
          } else {
            loadFunction(false)
             messageAlertFunction(true, result.data.message)
          }
      
    })
    } else {
      messageAlertFunction(true, "Fill in inputs")
     
    }
   
    
  }
  
  return (
    <>
      <form className="signup_div">
          <div style={{width:"100%"}}>
              <div className="signup_logo_div">
                  <Logo/>
              </div>
              <div className="signup_register">
                <p>Signin</p>
              </div>
              <div style={{width:"100%"}}>
                <div className="signup_username">
                 <p>Username</p>
                 <div> <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)} /></div>
               </div>
               <div className="signup_password">
                <p>Password</p>
                <div><input type="password" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} /></div>
               </div>
              </div>
              <div className="signup_btn">
                  <button onClick={()=>verfifyUserBtn()}>Signin</button>
              </div>
              <div className="signup_signin_link">
          <div>
            <p className="gotAccountOrNot">Don't have an account</p>
                   </div>
                   <div className="signup_signin-line"></div>
          <div className="signup_signin_to_div">
            <Link to="/signup" className="signup_signin_to">
              Signup
            </Link>
                   </div>
              </div>
          </div>
      </form>
    
      <LoginMessageModal /> 
  <LoginSpinner/>    
    </>
   
  )
}

export default SignIn