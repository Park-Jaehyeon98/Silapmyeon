import React, { useState, useEffect } from "react";
import "../Board/BoardRegistStyle.css";
import { axiosAuth } from "../../api/settingAxios";

import { useRecoilState } from "recoil";
import { UserAtom } from "../../Recoil/UserAtom";

function BoardRegist() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reports, setReport] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [userValue, setUserValue] = useRecoilState(UserAtom);

  const handleReportSelect = (reportId) => {
    setSelectedReport(reportId);
  };

  const handleCreatePost = async () => {
    const postData = {
      title: title,
      content: content,
      userId: userValue.userId,
      reportId: selectedReport,
    };

    if (postData.title === "") window.confirm("제목을 입력해 주세요.");
    else if (postData.content === "") window.confirm("내용을 입력해 주세요");
    else {
      const confirmed = window.confirm("게시글을 등록하시겠습니까?");
      if (confirmed) {
        const reqUrl = "/boards";
        await axiosAuth
          .post(reqUrl, postData)
          .then((response) => {
            // console.log("글 작성 완료");
            window.location.href = "/community";
          })
          .catch((error) => {
            console.error("글 작성 오류 발생", error);
          });
      }
    }
  };
  useEffect(() => {
    const reqUrl = "report/list/" + userValue.userId;
    axiosAuth
      .get(reqUrl)
      .then((response) => {
        console.log(response.data);
        setReport(response.data);
      })
      .catch((error) => {
        console.error("리포트 가져오기 오류", error);
      });
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ border: "none", outline: "none", width: "250px" }}
            ></input>
            <div style={{ height: "0px", border: "1px solid #494CA2" }}></div>
          </div>
        </div>
        <div className="registContent">
          <textarea
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요."
            className="registInput"
          ></textarea>
        </div>
        <div className="registReport" style={{ margin: "3px" }}>
          <div className="textBig">리포트</div>
          <select onChange={(e) => handleReportSelect(e.target.value)}>
            <option value="">선택해 주세요.</option>
            {reports.map((report) => (
              <option key={report.id} value={report.id}>
                {report.company}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "80%" }}
        >
          <button className="button" onClick={handleCreatePost}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default BoardRegist;
