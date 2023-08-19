import { FaArrowDown, FaArrowUp, FaTimes } from "react-icons/fa"
import boxer from "../images/boxer.jpg"
import "../styles/followUser.css"
import { useState, useContext } from "react"
import { appContext } from "../App"
const FollowUser = () => {
const {icon, hide, slide, alwaysOpenSuggested} = useContext(appContext)
  return (
      <div className={`follow_a_user_parent ${hide} ${alwaysOpenSuggested}`}>
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