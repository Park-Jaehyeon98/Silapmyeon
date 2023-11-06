import React from "react";
import {Link} from 'react-router-dom';
import "../Card/CardStyle.css"

function Card({card,user}){
    const date = card.createdTime.substring(0,10);
    return (

        <div className="card">
            <div className="cardMain">
                <div className="title">{card.title}</div>
                <div className="line"></div>
                <div className="cardMiddle">
                <div className="content">{card.content}</div>
                <div className="smallInfo">
                    <div className="date">{date}</div>
                    <div className="hits">조회수 {card.hit}</div>
                </div>
                <div className="info">
                    <div className="user">
                        {/* <img className="boardImg" src={user.userProfileUrl} ></img> */}
                        <div className="nickname">{card.nickname}</div>
                    </div>
                    <div className="comments">댓글 </div>
                </div>
                </div>
            </div>
        </div>

    );
}

export default Card;