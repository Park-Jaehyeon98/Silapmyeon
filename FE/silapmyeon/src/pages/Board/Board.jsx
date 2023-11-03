import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import "../Board/BoardStyle.css"
import Card from "../../components/Card/Card";

function Board(){
    const [cards, setCards] = useState([]);
    const [user,setUser]= useState(null);
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo4LFwidXNlckVtYWlsXCI6XCJhZGgzNTc2QGdtYWlsLmNvbVwiLFwicm9sZVwiOlwiUk9MRV9VU0VSXCIsXCJ0eXBlXCI6XCJBVEtcIn0iLCJpYXQiOjE2OTg5NzQwOTQsImV4cCI6MTcwMDE4MzY5NH0.xNeaWic-4X_r1MG3YAueEne0GL2Mpoo4JruII7UATt0';

    const [searchText, setSearchText] = useState('');

    const handleSearch =() =>{
        //여기다 검색  api 작성 하면 됨

        
    };

    useEffect(()=>{
        fetch('https://k9b107a.p.ssafy.io/api/boards',{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data =>{
                data.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
                setCards(data) 
            })
            .catch(error =>{
                console.error('Board api호출 오류',error);
            });

            fetch('https://k9b107a.p.ssafy.io/api/user',{
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

    },[]);
    
    return(
        <div className="board">
            <div className="head">면접 공유 커뮤니티</div>
            <div className = "search">
                <div className="company">
                    <input className="input" type="text" placeholder="기업명 검색"
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
                    <Link to ="/board/create" style={ {marginLeft:'auto', paddingRight:'100px'}}>
                        <button className="button">글 작성하기</button>
                    </Link>
            </div>

            <div className="cards">
                {cards.map(cardData => (
                    <Link to ="/board/detail" key = {cardData.id}>
                    <Card card = {cardData} user={user}></Card>
                    </Link>
                ))}
            </div>
        </div>
    );

}

export default Board;