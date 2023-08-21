import "../styles/indexpage.css";
import Loading from "./Loading";
import Logo from "./Logo";
import React from "react"
const Texty:React.FC = () => {
  return (
    <div className="index_body">
      <div style={{ width: "100%" }}>
        <div className="index_logo">
          <Logo />
        </div>
        <div className="index_app_name">
          <p>Texty</p>
        </div>
        <div className="index_loading_indication">
          <Loading />
        </div>
      </div>
     
    </div>
  );
};

export default Texty;
