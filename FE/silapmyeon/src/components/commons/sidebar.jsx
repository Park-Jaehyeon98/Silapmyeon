import React from "react";
import "../../styles/sidebar.css"

function sidebar(){
    return (

            <div className="sidebar">
                <div className="img">
                    <img className="profileImg" src="https://ssl.pstatic.net/static/pwe/address/img_profile.png">
                    </img>
                </div>
                <div className="sidebarText">모의면접</div>
                <div className="sidebarText">마이페이지
                    <div className="sidebarSmallText">자소서</div>
                    <div className="sidebarSmallText">면접 리포트</div>
                    <div className="sidebarSmallText">면접 후기</div>
                </div>
                <div className="sidebarText">면접 공유</div>
            </div>

    );
}

export default sidebar;