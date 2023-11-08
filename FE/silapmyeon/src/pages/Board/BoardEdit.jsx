import React, {useState, useEffect} from "react";
import "../Board/BoardRegistStyle.css"


function BoardEdit(){
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [reports,setReport] = useState([]);
    const [selectedReport,setSelectedReport] = useState(null);

    const handleReportSelect =(report) =>{
        setSelectedReport(report.id); //리포트 id확인하기
    }

    const postData = {
        title:title,
        content:content,
        // userId,
        reportId:selectedReport
        
    }

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
                    <button className="button"style={{marginLeft:'auto'}}>수정하기</button>
                </div>
            </div>
        </div>

    )
}
export default BoardEdit;