import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import "../Board/BoardStyle.css"
import Card from "../../components/Card/Card";
import axios from 'axios';

function Board(){
    const [cards, setCards] = useState([]);
    const [user,setUser]= useState(null);
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo4LFwidXNlckVtYWlsXCI6XCJhZGgzNTc2QGdtYWlsLmNvbVwiLFwicm9sZVwiOlwiUk9MRV9VU0VSXCIsXCJ0eXBlXCI6XCJBVEtcIn0iLCJpYXQiOjE2OTkzNDQ0OTEsImV4cCI6MTcwMDU1NDA5MX0.68-q9pBIuhU_8JFxdcpUqlR6CruwZQ0Rjxm_zNbg-E4';
    const [pageInfo, setPageInfo] = useState({
        pageNumber :0,
        pageSize : 9,

    });
    const [searchText, setSearchText] = useState('');
    const [first,setFirst] = useState('true');
    const[last,setLast] = useState('false')
    const config ={
        headers:{
            'Authorization': `Bearer ${accessToken}`
        }
    }
    const handleSearch =() =>{
        axios.get('https://silapmyeon.com/api/boards/search?search='+searchText,config)
            .then(response =>{
                console.log(response);
                console.log('검색하기'+searchText);
                console.log(response.title)

                // content.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
                setCards(response);

            })
            .catch(error =>{
                console.error('글 검색 오류 발생',error)
            })
        
    };



    useEffect(()=>{
        fetch('https://silapmyeon.com/api/boards?page='+pageInfo.pageNumber,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data =>{
                const {content,pageable,first,last} = data;
                content.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
                console.log()
                setCards(content);
                setPageInfo(pageable);
                setFirst(first);
                setLast(last);
            })
            .catch(error =>{
                console.error('Board api호출 오류',error);
            });

            fetch('https://silapmyeon.com/api/user',{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => response.json())
                .then(data =>{
                    setUser(data) 
                })
                .catch(error =>{
                    console.error('user api호출 오류',error);
                });

    },[pageInfo.pageNumber]);
    
    return(
        <div className="board">
            <div className="head">면접 공유 커뮤니티</div>
            <div className = "search">
                <div className="company">
                    <input className="input" type="text" placeholder="제목 검색"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch();
                        }
                      }}
                    />
                    <button className="searchButton" onClick={handleSearch}>검색</button>
                </div>
                    <Link to ="/community/regist" style={ {marginLeft:'auto', paddingRight:'100px'}}>
                        <button className="button">글 작성하기</button>
                    </Link>
            </div>
            <div className="cards">
                {cards.map(cardData => (
                    <Link to ={`/community/detail/${cardData.boardId}`} className ="cardLink">
                    <Card card = {cardData} user={user}></Card>
                    </Link>
                ))}
            </div>

{/* 페이지네이션 버튼 */}

<div className="pagenation">
    <button onClick={() => setPageInfo({ ...pageInfo, pageNumber: pageInfo.pageNumber - 1 })} disabled={first}>
        이전
    </button>
    <span>
        {pageInfo.pageNumber + 1}
    </span>
    <button onClick={() => setPageInfo({ ...pageInfo, pageNumber: pageInfo.pageNumber + 1 })} disabled={last}>
        다음
    </button>
</div>


        </div>
    );

}

export default Board;