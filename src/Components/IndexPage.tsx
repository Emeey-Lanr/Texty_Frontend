
import "../styles/indexpage.css"
import Loading from "./Loading"
import Logo from "./Logo"
const IndexPage = () => {
  return (
    <div className="index_body">
      <div style={{width:"100%"}}>
        <div className="index_logo">
          <Logo/>
        </div>
        <div className="index_app_name">
          <p>Groupie</p>
        </div>
        <div className="index_loading_indication">
<Loading/>
        </div>
      </div>
          
</div>
  )
}

export default IndexPage