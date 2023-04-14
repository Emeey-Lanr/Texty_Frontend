import React from 'react'
import { FaTimes } from 'react-icons/fa'
import "../styles/login.css"


const LoginMessageModal = () => {
  return (
  <div className="login_message_modal_div">
      {/* <div className='login_message'>
        <div className='login_message_exit'>
          <button>
             <FaTimes/>
          </button>
        </div>
        <div className='login_message_message'>
          <p>You're trash, try again</p>
        </div>
</div> */}
      <div className='spinner'>
        <div>
          
        </div>

      </div>
    </div>
  )
}

export default LoginMessageModal