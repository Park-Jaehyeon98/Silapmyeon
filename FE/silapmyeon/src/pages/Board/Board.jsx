import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Board/BoardStyle.css";
import Card from "../../components/Card/Card";
import { axiosAuth } from "../../api/settingAxios";
import "../../App.css";
function Board() {
  const [cards, setCards] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 9,
  });

  const [searchText, setSearchText] = useState("");
  const [first, setFirst] = useState("true");
  const [last, setLast] = useState("false");

  const handleSearch = async () => {
    const reqUrl =
      "/boards/search?page=" + pageInfo.pageNumber + "&search=" + searchText;
    await axiosAuth
      .get(reqUrl)
      .then((response) => {
        console.log(response.data);
        const responseData = response.data;
        const searchData = responseData.content;

        searchData.sort(
          (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
        );
        if (searchData.length > 0) {
          setCards(searchData);
          setPageInfo(responseData.pageable);
          setFirst(responseData.first);
          setLast(responseData.last);
        } else window.confirm("검색어가 존재하지 않습니다.");
      })
      .catch((error) => {
        console.error("글 검색 오류 발생", error);
      });
  };

  useEffect(() => {
    console.log(searchText);
    const reqUrl =
      "/boards/search?page=" + pageInfo.pageNumber + "&search=" + searchText;
    axiosAuth
      .get(reqUrl)
      .then((response) => {
        console.log(response.data);
        const responseData = response.data;
        const searchData = responseData.content;

        searchData.sort(
          (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
        );
        if (searchData.length > 0) {
          setCards(searchData);
          setPageInfo(responseData.pageable);
          setFirst(responseData.first);
          setLast(responseData.last);
        } else window.confirm("검색어가 존재하지 않습니다.");
      })
      .catch((error) => {
        console.error("글 검색 오류 발생", error);
      });
  }, [pageInfo.pageNumber]);

  return (
    <div className="board">
      <div className="head">면접 공유 커뮤니티</div>
      <div className="search">
        <div className="company">
          🔎
          <input
            className="input"
            type="text"
            placeholder="제목 검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {/* <button className="searchButton" onClick={handleSearch}>
            검색
          </button> */}
        </div>
        <Link
          to="/community/regist"
          style={{ marginLeft: "auto", paddingRight: "100px" }}
        >
          <button className="button">글 작성하기</button>
        </Link>
      </div>
      <div className="cards">
        {cards.map((cardData) => (
          <Link
            to={`/community/detail/${cardData.boardId}`}
            className="cardLink"
          >
            <Card card={cardData}></Card>
          </Link>
        ))}
      </div>

      {/* 페이지네이션 버튼 */}

      <div className="pagenation">
        <button
          onClick={() =>
            setPageInfo({ ...pageInfo, pageNumber: pageInfo.pageNumber - 1 })
          }
          disabled={first}
        >
          이전
        </button>
        <span>{pageInfo.pageNumber + 1}</span>
        <button
          onClick={() =>
            setPageInfo({ ...pageInfo, pageNumber: pageInfo.pageNumber + 1 })
          }
          disabled={last}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Board;
