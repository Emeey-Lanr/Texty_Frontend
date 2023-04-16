import React from 'react'
import { FaTimes } from 'react-icons/fa'
import "../styles/login.css"
import {useContext} from "react"

import { appContext } from '../App'

const LoginMessageModal = () => {
  const { loginModalState,
      setLoginModalState,
    loginModalMessage 
  } = useContext(appContext)
  return (
        <>
  { loginModalState && 
 
        <div className="login_message_modal_div">
      <div className='login_message'>
        <div className='login_message_exit'>
          <button onClick={()=>setLoginModalState(false)}>
             <FaTimes/>
          </button>
        </div>
        <div className='login_message_message'>
        <p>{ loginModalMessage}</p>
        </div> 
         </div>
      
    </div>
    }
    </>

  )
}

export default LoginMessageModal