import React from "react";
import "../Comment/CommentStyle.css";
import axios from "axios";

function Comment({ comment }) {
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo4LFwidXNlckVtYWlsXCI6XCJhZGgzNTc2QGdtYWlsLmNvbVwiLFwicm9sZVwiOlwiUk9MRV9VU0VSXCIsXCJ0eXBlXCI6XCJBVEtcIn0iLCJpYXQiOjE2OTkzNDQ0OTEsImV4cCI6MTcwMDU1NDA5MX0.68-q9pBIuhU_8JFxdcpUqlR6CruwZQ0Rjxm_zNbg-E4";
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  //댓글 삭제하기
  function handleDelete() {
    const confirmed = window.confirm("해당 댓글을 삭제하시겠습니까?");
    if (confirmed) {
      axios
        .delete(
          "https://silapmyeon.com/api/comments/" + comment.commentId,
          config
        )
        .then((response) => {
          console.log("댓글 삭제 완료");
          window.location.reload();
        })
        .catch((error) => {
          console.error("댓글 삭제 오류 발생", error, comment.commentId);
        });
    }
  }

  return (
    <div className="comment" style={{ marginBottom: "30px" }}>
      <div className="commentUser">
        <img className="commentImg" src={comment.profileImg}></img>
        <div className="commentNickname">{comment.nickname}</div>
      </div>
      <div
        className="commentContent"
        style={{
          display: "flex",
          marginLeft: "20px",
          marginTop: "20px",
          height: "150px",
        }}
      >
        {comment.content}
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{ margin: "5px", marginLeft: "auto" }}
          onClick={handleDelete}
        >
          삭제
        </div>
      </div>
    </div>
  );
}

export default Comment;
