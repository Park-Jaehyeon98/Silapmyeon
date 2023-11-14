import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { axiosAuth } from "../../api/settingAxios";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../Recoil/UserAtom";

function BoardEdit() {
  const [reports, setReport] = useState([]);
  const [board, setBoard] = useState("");
  const [editedBoard, setEditedBoard] = useState({
    title: "",
    content: "",
    reportId: "",
  });
  const [userValue, setUserValue] = useRecoilState(UserAtom);
  const location = useLocation();
  const boardData = location.state;
  const handleTitleChange = (e) => {
    setEditedBoard({ ...editedBoard, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setEditedBoard({ ...editedBoard, content: e.target.value });
  };

  const handleReportChange = async (e) => {
    setEditedBoard({ ...editedBoard, reportId: e.target.value });
  };
  const handleUpdate = async () => {
    if (editedBoard.title === "") window.confirm("제목을 입력해 주세요.");
    else if (editedBoard.content === "") window.confirm("내용을 입력해 주세요");
    else {
      const reqUrl = "/boards/" + board.boardId;
      await axiosAuth
        .put(reqUrl, editedBoard)
        .then((response) => {
          console.log("게시글 수정 완료");
          const confirmed = window.confirm("게시글 수정이 완료 되었습니다.");
          window.location.href = "/community/detail/" + board.boardId;
        })
        .catch((error) => {
          console.error("게시글 수정 오류 발생:", error, editedBoard);
        });
    }
  };

  useEffect(() => {
    setBoard(boardData);
    setEditedBoard(boardData);
  }, []);

  return (
    <div className="registContainer">
      <div className="head">면접 공유 커뮤니티</div>
      <div className="registCommunity">
        <div className="registTitle" style={{ margin: "10px" }}>
          <div className="textBig">제목</div>
          <div>
            <input
              type="text"
              value={editedBoard.title}
              onChange={handleTitleChange}
              style={{
                border: "none",
                outline: "none",
                width: "500px",
                fontSize: "20px",
              }}
            ></input>
            <div style={{ height: "0px", border: "1px solid #494CA2" }}></div>
          </div>
        </div>
        <div className="registContent" style={{ margin: "10px" }}>
          <textarea
            type="text"
            value={editedBoard.content}
            onChange={handleContentChange}
            className="registInput"
          ></textarea>
        </div>
        <div className="registReport" style={{ margin: "10px" }}>
          <div className="textBig">리포트</div>
          <select onChange={handleReportChange}>
            <option value="">선택해 주세요.</option>
            {reports.map((report) => (
              <option key={report.id} value={report.id}>
                {report.title}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "80%" }}
        >
          <button className="button" onClick={handleUpdate}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default BoardEdit;
