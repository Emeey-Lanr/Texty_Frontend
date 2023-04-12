import "../styles/search.css"
import boxer from "../images/boxer.jpg"
import {FaSearch, FaLockOpen, FaLock} from "react-icons/fa"
import { useState } from "react"
const Search = () => {
  const [switchPage, setSwitchPage] = useState<boolean>(true)
  const openuserPage = () => {
    alert(30)
  }
  
  const followUser = () => {
    alert(10)
    
  }
  return (
      <div className="search_home_div">
          <div className="search_home_head">
                <div className="search_home_input_div">
              <input type="text" /> <button>
                  <FaSearch/>
              </button>
          </div>
          <div className="search_home_head_divider">
              <button onClick={()=>setSwitchPage(true)} style={switchPage ? {borderBottom:"2px solid black"} :{borderBottom:"none"} }> People</button>
              <button onClick={()=>setSwitchPage(false)} style={!switchPage ? {borderBottom:"2px solid black"}: {borderBottom:"none"}}>Group</button>
          </div>
          </div>
      {switchPage && <div className="people">
        <div onClick={() => openuserPage()} className="user">
          <div className="img_description_div">
            <div style={{ display: 'flex' }}>
              <img src={boxer} alt="" />
              <h3>Emeey Lnar</h3>
            </div>
            
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, itaque!</p>
          </div>
          <div className="action">
            <button >View Profile</button><button>Follow</button><button>Block</button>
          </div>
        </div>
      </div>}
      {!switchPage && <div className="group_div">
        <div className="group">
          <div className="group_side1">
            <div>
              <img src={boxer} alt="" />
            </div>
            <div style={{paddingLeft:"5px"}}>
              <h3>Willow Group <span><FaLockOpen/></span></h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, magnam.</p>
           </div>
          </div>
          <div className="group_side2">
            <button>Join</button>
          </div>

        </div>
        
        
    </div> }
        
    </div>
  )
}

export default Search