import IndexPage from "./Components/IndexPage";
import SignIn from "./Components/SignIn";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";
// import {Route, Routes} from "react-router-dom"
import {Route, Routes} from  "react-router-dom"
import { createContext, useState } from "react";
interface comingAppDetails {
     hideSideBar:string
  setHideSideBar: React.Dispatch<React.SetStateAction<string>>
  showSideBarBtn: () => void
  hidebarBool:boolean,
  hideSideBarBtn:()=>void
  }

export const appContext = createContext <Partial<comingAppDetails>>({})
const App = () => {
  const [hideSideBar, setHideSideBar] = useState<string>("hidesidebar")
  const [hidebarBool, setHideBarBool] = useState<boolean> (true)
  
  const showSideBarBtn = () => {
  setHideBarBool(false)

  }
  const hideSideBarBtn = () => {
    setHideBarBool(true)
  }
  return (
  
      <appContext.Provider value={{
        hideSideBar,
        setHideSideBar,
        showSideBarBtn,
      hidebarBool,
        hideSideBarBtn
     
    }}>
      <Routes>
     <Route path="/" element={<IndexPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/chat" element={<Chat />} />
      </Routes>
    
     
      </appContext.Provider>
  
   
  )
}

export default App;
