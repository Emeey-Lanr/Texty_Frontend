
import { useEffect } from "react"
import "../styles/indexpage.css"
import Loading from "./Loading"
import Logo from "./Logo"
import { useNavigate } from "react-router-dom"
const IndexPage = () => {
  let navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.xxxxxxxxxxxxxxx) {
        navigate("/home")
      } else {
        navigate("/signin")
      }
      
    },3000)
  },[])
  return (
    <div className="index_body">
      <div style={{width:"100%"}}>
        <div className="index_logo">
          <Logo/>
        </div>
        <div className="index_app_name">
          <p>Texty</p>
        </div>
        <div className="index_loading_indication">
<Loading/>
        </div>
      </div>
          
</div>
  )
}

export default IndexPage