import React from 'react'
import "../styles/login.css"
import { useContext } from "react"
import { appContext } from '../App'
const LoginSpinner = () => {
    const {spinnerState} = useContext(appContext)
    return (
        <>
            {spinnerState &&
            <div className="login_message_modal_div">
 
                <div className='spinner'>
                    <div>
          
                    </div>

                </div>
            </div>}
      </>

  )
}

export default LoginSpinner