import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Board/BoardDetailStyle.css";
import Comment from "../../components/Comment/Comment";
import { axiosAuth } from "../../api/settingAxios";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../Recoil/UserAtom";
import Report from "../../components/Report/Report";

function BoardDetail() {
  const { boardId } = useParams();
  const [report, setReport] = useState(null);
  const [board, setBoard] = useState({ createdTime: "" });
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [userValue, setUserValue] = useRecoilState(UserAtom);

  //글 삭제하기
  const handleDelete = async () => {
    const confirmed = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirmed) {
      const reqUrl = "/boards/" + boardId;
      await axiosAuth
        .delete(reqUrl)
        .then((response) => {
          console.log("글 삭제 완료");
          window.location.href = "/community";
        })
        .catch((error) => {
          console.error("글 삭제 오류 발생", error);
        });
    }
  };
  const handleCommentSubmit = async () => {
    const commentData = {
      content: commentText,
      userId: userValue.userId,
      boardId: boardId,
    };
    console.log(commentData);
    if (commentData.content === "") window.confirm("댓글을 작성해 주세요.");
    else {
      const confirmed = window.confirm("댓글을 등록하시겠습니까?");
      if (confirmed) {
        const reqUrl = "comments";
        await axiosAuth
          .post(reqUrl, commentData)
          .then((response) => {
            console.log("댓글 등록 완료");
            window.location.href = "/community/detail/" + board.boardId;
          })
          .catch((error) => {
            console.error("댓글 등록 오류 발생", error);
          });
      }
    }
  };
  useEffect(() => {
    const reqUrl = "/boards/" + boardId;
    axiosAuth
      .get(reqUrl)
      .then((response) => {
        console.log(response);
        const { boardResponse, reportResponse } = response.data;
        setBoard(boardResponse);
        if (reportResponse != null) setReport(reportResponse);
        setComments(boardResponse.comments);
      })
      .catch((error) => {
        console.error("Board detail api호출 오류", error);
      });
  }, []);

  return (
    <div className="boardDetailContainer">
      <div className="head">면접 공유 커뮤니티</div>
      <div className="boardDetail">
        <div className="boardTitle">{board.title}</div>

        <div className="boardLine"></div>
        <div className="boardInfo">
          <div className="boardDate">{board.createdTime.substring(0, 10)}</div>
          <div className="boardHits">조회수 {board.hit}</div>
        </div>
        {board.userId === userValue.userId && (
          <div className="boardEdit">
            <div
              style={{ margin: "5px", marginLeft: "auto" }}
              onClick={handleDelete}
            >
              삭제
            </div>
            <Link
              to={"/community/edit"}
              state={board}
              style={{
                width: "70px",
                margin: "5px",
                paddingRight: "10px",
                textDecoration: "none",
                color: "#828282",
              }}
            >
              수정
            </Link>
          </div>
        )}

        <div className="boardMiddle">
          <div className="boardContent">{board.content}</div>
          {report != null && <Report data={report}></Report>}

          <div className="commentContainer">
            <div className="commentRegistUser">
              <img className="registImg" src={userValue.userProfileUrl}></img>
              <div className="registNickname">{userValue.userNickname}</div>
            </div>
            <div className="boardComment">
              <div className="commentRegist">
                <textarea
                  className="commentInput"
                  type="text"
                  placeholder="모의 면접 피드백 답변을 남겨 보세요!"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCommentSubmit();
                    }
                  }}
                />
                <button
                  className="commentButton"
                  style={{ marginLeft: "30px" }}
                  onClick={handleCommentSubmit}
                >
                  답변등록
                </button>

                <div></div>
              </div>

              <div style={{ marginRight: "800px", marginBottom: "15px" }}>
                답변 {comments.length}
              </div>
              <div className="comments">
                {comments.map((commentData) => (
                  <Comment comment={commentData}></Comment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BoardDetail;
