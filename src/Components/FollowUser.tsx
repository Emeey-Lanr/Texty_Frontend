import { FaArrowDown, FaArrowUp, FaTimes } from "react-icons/fa"
import boxer from "../images/boxer.jpg"
import "../styles/followUser.css"
import {useState} from "react"
const FollowUser = () => {
    const [hide, setHide] = useState<string>("show")
    const [icon, setIcon] = useState("showIcon")
    const slide = () => {
        if (hide === "hide") {
            setHide("show")
            setIcon("showIcon")
        } else if (hide === "show") {
            setHide("hide")
            setIcon("hideIcon")
        }
    }

  return (
      <div className={`follow_a_user_parent ${hide}`}>
      <div className="top_heading">
        <div>
          <button onClick={()=>slide()}>
                      <FaArrowDown className={icon} />
          </button>
        </div>
        <div className="heading_follow_a_user">
          <h2>Suggested User</h2>
        </div>
      </div>

      <div className="follow_a_user">
        <div className="description">
          <img src={boxer} alt="" />
          <div>
            <h3>Emeey</h3>
            <p>lorem</p>
          </div>
        </div>
        <div className="action">
          <button>Follow</button>
        </div>
      </div>
      <div className="follow_a_user">
        <div className="description">
          <img src={boxer} alt="" />
          <div>
            <h3>Emeey</h3>
            <p>lorem</p>
          </div>
        </div>
        <div className="action">
          <button>Follow</button>
        </div>
      </div>
      <div className="follow_a_user">
        <div className="description">
          <img src={boxer} alt="" />
          <div>
            <h3>Emeey</h3>
            <p>lorem</p>
          </div>
        </div>
        <div className="action">
          <button>Follow</button>
        </div>
      </div>
      <div className="follow_a_user">
        <div className="description">
          <img src={boxer} alt="" />
          <div>
            <h3>Emeey</h3>
            <p>lorem</p>
          </div>
        </div>
        <div className="action">
          <button>Follow</button>
        </div>
      </div>
      <div className="follow_a_user">
        <div className="description">
          <img src={boxer} alt="" />
          <div>
            <h3>Emeey</h3>
            <p>lorem</p>
          </div>
        </div>
        <div className="action">
          <button>Follow</button>
        </div>
      </div>
      <div className="follow_a_user">
        <div className="description">
          <img src={boxer} alt="" />
          <div>
            <h3>Emeey</h3>
            <p>lorem</p>
          </div>
        </div>
        <div className="action">
          <button>Follow</button>
        </div>
      </div>
      <div className="follow_a_user">
        <div className="description">
          <img src={boxer} alt="" />
          <div>
            <h3>Emeey</h3>
            <p>lorem</p>
          </div>
        </div>
        <div className="action">
          <button>Follow</button>
        </div>
      </div>
      <div className="follow_a_user">
        <div className="description">
          <img src={boxer} alt="" />
          <div>
            <h3>Emeey</h3>
            <p>lorem</p>
          </div>
        </div>
        <div className="action">
          <button>Follow</button>
        </div>
      </div>
    </div>
  );
}

export default FollowUser