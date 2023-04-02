import "../styles/sidebar.css"
import { appContext } from "../App"
import {useContext} from "react"
import {FaTimes} from "react-icons/fa"
const Sidebar = () => {
  interface comingAppDetails {
     hideSideBar:string
        setHideSideBar:React.Dispatch<React.SetStateAction<string>>
  }
  const { hideSideBar, setHideSideBar, hidebarBool, hideSideBarBtn } = useContext(appContext)

  return (
    <div className={`sidebar_div ${hidebarBool ? hideSideBar : "sidebar_animation"}`}>
      
      <div className="exit">
        <button onClick={hideSideBarBtn}>
          <FaTimes className="exit_btn_icon"/>
          </button>
      </div>
          
    </div>
  )
}

export default Sidebar