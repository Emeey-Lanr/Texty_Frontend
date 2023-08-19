
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Texty from "./Texty"
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
    <>
      <Texty/>
    </>
  )
}

export default IndexPage