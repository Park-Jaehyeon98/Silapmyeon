import React, { useEffect, useState } from "react";
import "./Home.css"
import { getUser } from "../../api/userAPI";


function Home() {

    const [userNickname, setUserNickName] = useState('');
    const [userProfileUrl, setUserProfileUrl] = useState('');
    const [userId, setUserId] = useState(0);
    useEffect(() => {
        console.log("test!!!!!" + sessionStorage.getItem('user'))
        const User = JSON.parse(sessionStorage.getItem('user'))?.UserAtom;
        setUserNickName(User.userNickname);
        setUserProfileUrl(User.userProfileUrl);
        setUserId(User.userId);
    }, []);

    return(
        <div className="home">
            home화면
            {userNickname} | {userId}
            <div>
             <img src={userProfileUrl} alt="userProfile"/>
            </div>
        </div>
    );

}

export default Home;