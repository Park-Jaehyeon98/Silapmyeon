import React from "react";
import "../Comment/CommentStyle.css"
function Comment({comment}){

    return (

        <div className="comment" style={{marginBottom:'30px'}}>
            <div className="commentUser">
                <img className="commentImg" src={comment.profileImg} ></img> 
                <div className="commentNickname">{comment.nickname}</div>
            </div>
            <div className="commentContent" style={{display:'flex',marginLeft:'20px', marginTop:'20px',height:'150px'}}>{comment.content}</div>
            <div style={{display:'flex'}}>
                <div style = {{margin:'5px', marginLeft:'auto'}}>삭제</div>
            </div>
        </div>

    );
}

export default Comment;