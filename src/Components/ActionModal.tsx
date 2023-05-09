import React from 'react'
import "../styles/action_modal.css"
import {useContext, useState} from "react"
import { appContext } from '../App'
import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const ActionModal = () => {
    const { actionModalId, setActionModalId, openActionModal, setOpenActionModal } = useContext(appContext)
    let navigate = useNavigate()
    const [exitAnimation, setExitAnimation] = useState<string>("") 
    const [errorMessage, setErrorMessage] =useState<string>("")
    const exitActionModal = () => {
        setExitAnimation("exitAnimation")
        setTimeout(() => {
             setActionModalId(-1)
            setOpenActionModal(false)
            setExitAnimation("")
        },500)
       
        
    }
    const logOut = () => {
        localStorage.removeItem("xxxxxxxxxxxxxxx")
        navigate("/signin")
        
    }
    return (
        <>
            {openActionModal && <div className='actionModal_body'>
                {actionModalId === 1 && <div className={`logout_action_modal_div ${exitAnimation}`}>
                    <div className='exitBtn'>
                        <button onClick={()=>exitActionModal()}><FaTimes/></button>
                    </div>
                    <div className='action_modal_text_div'>
                        <p>Are you sure you want to log out?</p>
                    </div>
                    <div className='action_modal_proceed_div'>
                        <button onClick={()=>logOut()}>Proceed</button>
                 </div>
              
                </div>}
                {actionModalId === 2 && <div className='delete_account_modal_div'>
                     <div className='exitBtn'>
                        <button onClick={()=>exitActionModal()}><FaTimes/></button>
                    </div>
                    <div className='delete_accoun_instruction'>
                        <p>Enter your password to delete account</p>
                    </div>
                    <div className='delete_account_input_div'>
                        <input type="password" />
                    </div>
                    {errorMessage !== "" && <div className='delete_account_error_message'>
                        <p>{errorMessage}</p>
                    </div>}
                    <div className='delete_account_btn_div'>
                        <button>Proceed</button>
                    </div>
              
                </div>}
          
            </div>}
      </>
      
  )
}

export default ActionModal