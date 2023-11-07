import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "../Board/BoardDetailStyle.css";
import Comment from "../../components/Comment/Comment";

function BoardDetail(){
    const {boardId} = useParams();
    const[report, setReport] = useState([]);
    const [board, setBoard] = useState({createdTime:""});
    const [comments,setComment] = useState([]);
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo4LFwidXNlckVtYWlsXCI6XCJhZGgzNTc2QGdtYWlsLmNvbVwiLFwicm9sZVwiOlwiUk9MRV9VU0VSXCIsXCJ0eXBlXCI6XCJBVEtcIn0iLCJpYXQiOjE2OTg5NzQwOTQsImV4cCI6MTcwMDE4MzY5NH0.xNeaWic-4X_r1MG3YAueEne0GL2Mpoo4JruII7UATt0';

    useEffect(()=>{ 
        fetch('https://k9b107a.p.ssafy.io/api/boards/'+boardId,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data =>{
                const {boardResponse,reportResponse} = data;
                setBoard(boardResponse)
                setReport(reportResponse)
                setComment(boardResponse.comments)
            })
            .catch(error =>{
                console.error('Board detail api호출 오류',error);
            });


    },[]);

    return (
        <div className="boardDetailContainer">
            <div className="boardDetail">
                <div className="boardTitle">{board.title}</div>
                <div className="boardLine"></div>
                <div className="boardInfo">
                    <div className="boardDate">{ board.createdTime.substring(0,10)}</div>
                    <div className="boardHits">조회수 {board.hit}</div>
                </div>
                <div className="boardMiddle">
                        <div className="boardContent">{board.content}</div>
                        {/* <Report report = {report} className = "report"> </Report> */}
                        <div className="comments">
                            {comments.map(commentData => (
                            <Comment comment = {commentData}></Comment>
                             ))}
                        </div>
                    </div>
            </div>
        </div>


    );
}
export default BoardDetail;