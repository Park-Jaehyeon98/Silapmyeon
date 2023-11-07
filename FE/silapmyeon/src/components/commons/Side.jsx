import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import "../../styles/sidebar.css"

function Side(){
    const [user,setUser]= useState(null);
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjo4LFwidXNlckVtYWlsXCI6XCJhZGgzNTc2QGdtYWlsLmNvbVwiLFwicm9sZVwiOlwiUk9MRV9VU0VSXCIsXCJ0eXBlXCI6XCJBVEtcIn0iLCJpYXQiOjE2OTg5NzQwOTQsImV4cCI6MTcwMDE4MzY5NH0.xNeaWic-4X_r1MG3YAueEne0GL2Mpoo4JruII7UATt0';
    
    useEffect(()=>{

            fetch('https://k9b107a.p.ssafy.io/api/user',{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => response.json())
                .then(data =>{
                    setUser(data
                        ) 
                })
                .catch(error =>{
                    console.error('user api호출 오류',error);
                });

    },[]);
    
    
    return (
            <div className="sidebar">
                <div className="img">
                    <img className="profileImg" >
                    </img>
                </div>
                <div className="sidebarText">모의면접</div>
                <div className="sidebarText">마이페이지
                    <div className="sidebarSmallText">자소서</div>
                    <div className="sidebarSmallText">면접 리포트</div>
                    <div className="sidebarSmallText">면접 후기</div>
                </div>
                <Link to ="/community" className="sidebarText">면접 공유</Link>
            </div>

    );
}

export default Side;
