import {FC, createContext, useState, } from "react";
import IndexPage from "./Components/IndexPage";
import SignIn from "./Components/SignIn";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";
// import {Route, Routes} from "react-router-dom"
import {Route, Routes} from  "react-router-dom"

import UserProfile from "./Components/UserProfile";
import LoginMessageModal from "./Components/LoginMessageModal";
import { appModelContext } from "./Model/AppModelContext";



export const appContext = createContext(appModelContext)

const App = () => {
  const [hideSideBar, setHideSideBar] = useState<string>("hidesidebar")
  const [hidebarBool, setHideBarBool] = useState<boolean>(true)
  const [appEndPoint, setAppEndPoint] = useState<string>("http://localhost:2001")
  // 
  const [loginModalState, setLoginModalState] = useState<boolean>(false)
  const [loginModalMessage, setLoginModalMessage] = useState<string>("")
  // Spinner
  const [spinnerState, setSpinnerState] = useState<boolean>(false)
  const showSideBarBtn = () => {
  setHideBarBool(false)

  }
  const hideSideBarBtn = () => {
    setHideBarBool(true)
  }

 
  return (
  
    <appContext.Provider value={{
    
        appEndPoint,
        hideSideBar,
        setHideSideBar,
        showSideBarBtn,
      hidebarBool,
      hideSideBarBtn,
// // 
      loginModalState,
   setLoginModalState,
      loginModalMessage,
      setLoginModalMessage,
      // 
      spinnerState,
      setSpinnerState
        
    

  } }>
      <Routes>
     <Route path="/" element={<IndexPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="profile/:id" element={<UserProfile/>}/> */}
      </Routes>
      </appContext.Provider>
  
   
  )
}

export default App;
