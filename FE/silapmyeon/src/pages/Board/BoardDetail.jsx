import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import "../Board/BoardDetailStyle.css";
import Comment from "../../components/Comment/Comment";
import axios from 'axios';



function BoardDetail(){
    const {boardId} = useParams();
    const[report, setReport] = useState([]);
    const [board, setBoard] = useState({createdTime:""});
    const [comments,setComment] = useState([]);
    const [commentText, setCommentText] = useState('');
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo4LFwidXNlckVtYWlsXCI6XCJhZGgzNTc2QGdtYWlsLmNvbVwiLFwicm9sZVwiOlwiUk9MRV9VU0VSXCIsXCJ0eXBlXCI6XCJBVEtcIn0iLCJpYXQiOjE2OTkzNDQ0OTEsImV4cCI6MTcwMDU1NDA5MX0.68-q9pBIuhU_8JFxdcpUqlR6CruwZQ0Rjxm_zNbg-E4';


        //글 삭제하기
    function handleDelete(){
        const confirmed = window.confirm("게시글을 삭제하시겠습니까?");
        if(confirmed){
            axios.delete('https://silapmyeon/api/boards/'+boardId)
                .then(response =>{
                    console.log('글 삭제 완료');
                })
                .catch(error =>{
                    console.error('글 삭제 오류 발생', error)
                })           
        }
    }
    useEffect(()=>{ 
        fetch('https://silapmyeon.com/api/boards/'+boardId,{
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
            <div className="head">면접 공유 커뮤니티</div>
            <div className="boardDetail">
                <div className="boardTitle">{board.title}</div>

                <div className="boardLine"></div>
                <div className="boardInfo">
                    <div className="boardDate">{ board.createdTime.substring(0,10)}</div>
                    <div className="boardHits">조회수 {board.hit}</div>
                </div>
                <div className="boardEdit">
                <div style = {{margin:'5px', marginLeft:'auto'}} onClick={handleDelete}>삭제</div>
                <Link to = {"/community/edit"} state={board} style={{margin:'5px' , paddingRight:'10px', textDecoration:'none',color:'#828282'}}>수정</Link>
            </div>

                <div className="boardMiddle" >
                        <div className="boardContent">{board.content}</div>
                        {/* <Report report = {report} className = "report"> </Report> */}

                        <div className="commentContainer">
                                <div className="commentRegistUser">
                                    <img className="registImg"></img> 
                                    <div className="registNickname">김싸피</div>
                                </div>                
                        <div className="boardComment">
                                <div className="commentRegist">
                                <textarea className="commentInput" type="text" placeholder="모의 면접 피드백 답변을 남겨 보세요!"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                        
                                        }
                                    }}
                                />
                                <button className="commentButton" style={{marginLeft:'30px'}}>답변등록</button>

                                <div>

                                </div>
                            </div>

                            <div style={{marginRight:'800px', marginBottom:'15px'}}>답변 {comments.length}</div>
                            <div className="comments">
                                {comments.map(commentData => (
                                <Comment comment = {commentData}></Comment>
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