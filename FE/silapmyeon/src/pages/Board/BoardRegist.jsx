import React, {useState, useEffect} from "react";
import "../Board/BoardRegistStyle.css"
import axios from 'axios';

function BoardRegist(){
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [reports,setReport] = useState([]);
    const [selectedReport,setSelectedReport] = useState(null);
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo4LFwidXNlckVtYWlsXCI6XCJhZGgzNTc2QGdtYWlsLmNvbVwiLFwicm9sZVwiOlwiUk9MRV9VU0VSXCIsXCJ0eXBlXCI6XCJBVEtcIn0iLCJpYXQiOjE2OTkzNDQ0OTEsImV4cCI6MTcwMDU1NDA5MX0.68-q9pBIuhU_8JFxdcpUqlR6CruwZQ0Rjxm_zNbg-E4';
    
    const handleReportSelect =(report) =>{
        setSelectedReport(report.id); //리포트 id확인하기
    }

    const handleCreatePost = () =>{
        const postData = {
            title:title,
            content:content,
            // userId,
            reportId:selectedReport 
        }

        const config ={
            headers:{
                'Authorization': `Bearer ${accessToken}`
            }
        }


    axios.post('https://silapmyeon.com/api/boards',postData,config)
        .then(response =>{
            console.log('글 작성 완료');
        })
        .catch(error =>{
            console.error('글 작성 오류 발생',error)
        })
    };

    return(
        <div className="registContainer">
            <div className="head">면접 공유 커뮤니티</div>
            <div className = "registCommunity">
                <div className="registTitle" style={{margin:"10px"}}>
                    <div className="textBig">제목</div>
                    <div>
                        <input type = "text" value={title} onChange={(e)=> setTitle(e.target.value)} style={{border:"none",outline:"none",width:"250px"}}></input>
                    <div style={{  height: '0px', border: '1px solid #494CA2'}}></div>
                    </div>
                </div>
                <div className="registContent" style={{margin:"10px"}}>
                    <textarea type = "text" value={content} onChange={(e)=> setContent(e.target.value)} placeholder="내용을 입력해 주세요." className="registInput" ></textarea>
                </div>
                <div className="registReport" style={{margin:"10px"}}>
                    <div className="textBig">리포트</div>
                    <select onChange={(e) => handleReportSelect(e.target.value)}>
                        <option value="">선택해 주세요.</option>
                        {reports.map((report) => (
                        <option key={report.id} value={report.id}>
                            {report.title}
                        </option>
          ))}
        </select>


                </div>
                <div style={{display:"flex"}}>
                    <button className="button" onClick={handleCreatePost} style={{marginLeft:'auto'}}>등록하기</button>
                </div>
            </div>
        </div>

    )
}
export default BoardRegist;