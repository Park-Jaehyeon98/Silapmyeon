import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Board/BoardStyle.css";
import Card from "../../components/Card/Card";
import { axiosAuth } from "../../api/settingAxios";
import "../../App.css";
import styles from "../review/ReviewListStyle.module.css";
function Board() {
  const [cards, setCards] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 9,
  });

  const [searchText, setSearchText] = useState("");
  const [first, setFirst] = useState("true");
  const [last, setLast] = useState("false");
  const [totalPages, setPage] = useState("");
  const [totlaElements, setElements] = useState("");

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

  const pageNums = [];
  const maxPagesToShow = 5;

  const startIndex = Math.floor(pageInfo.pageNumber / maxPagesToShow) * 5;
  const endIndex = Math.min(totalPages, startIndex + 5);

  const handlePageChange = (page) => {
    setPageInfo({ ...pageInfo, pageNumber: page });
  };
  pageNums.push(
    <a
      className={styles.pn}
      onClick={() => handlePageChange(startIndex - 1 < 0 ? 0 : startIndex - 1)}
    >
      이전
    </a>
  );
  for (let index = startIndex; index < endIndex; index++) {
    console.log("currentPage:", pageInfo.pageNumber);
    console.log("index + 1:", index + 1);

    pageNums.push(
      <a
        key={index}
        onClick={() => handlePageChange(index)}
        className={`${styles.pageNum} ${
          pageInfo.pageNumber == index ? styles.selectedPage : ""
        }`}
      >
        {index + 1}
      </a>
    );
  }
  pageNums.push(
    <a
      className={styles.pn}
      onClick={() =>
        handlePageChange(
          endIndex + 1 >= totalPages ? totalPages - 1 : endIndex + 1
        )
      }
    >
      다음
    </a>
  );

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
          setPage(responseData.totalPages);
          setElements(responseData.totlaElements);
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
          <button className="searchButton" onClick={handleSearch}>
            검색
          </button>
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
        {pageNums.length === 2 ? null : <div>{pageNums}</div>}
      </div>
    </div>
  );
}

export default Board;
