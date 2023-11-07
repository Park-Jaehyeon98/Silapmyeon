import React from "react";

function Comment({comment}){

    return (

        <div className="Comment">
            <div>{comment.content}</div>
            <div></div>

        </div>

    );
}

export default Comment;