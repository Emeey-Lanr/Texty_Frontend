import React from 'react'
import { Link } from "react-router-dom"
import Logo from './Logo'
const SignIn = () => {
  return (
   <div className="signup_div">
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
                 <div> <input type="text" /></div>
               </div>
               <div className="signup_password">
                <p>Password</p>
                <div><input type="password" /></div>
               </div>
              </div>
              <div className="signup_btn">
                  <button>Signup</button>
              </div>
              <div className="signup_signin_link">
          <div>
            <p>Don't have an account</p>
                   </div>
                   <div className="signup_signin-line"></div>
          <div className="signup_signin_to_div">
            <Link to="/signup" className="signup_signin_to">
              Signin
            </Link>
                   </div>
              </div>
          </div>
    </div>
  )
}

export default SignIn