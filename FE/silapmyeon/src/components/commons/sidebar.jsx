import React from "react";
import "../../styles/sidebar.css";
import { Link } from "react-router-dom";

function sidebar() {
  return (
    <div className="sidebar">
      <div className="img">
        <img
          className="profileImg"
          src="https://ssl.pstatic.net/static/pwe/address/img_profile.png"
        ></img>
      </div>
      <div className="sidebarText">모의면접</div>
      <div className="sidebarText">
        마이페이지
        <Link to={"/resume"} style={{ textDecoration: "none", color: "black" }}>
          <div className="sidebarSmallText">자소서</div>
        </Link>
        <div className="sidebarSmallText">면접 리포트</div>
        <Link to={"/review"} style={{ textDecoration: "none", color: "black" }}>
          <div className="sidebarSmallText">면접 후기</div>
        </Link>
      </div>
      <div className="sidebarText">면접 공유</div>
    </div>
  );
}

export default sidebar;
