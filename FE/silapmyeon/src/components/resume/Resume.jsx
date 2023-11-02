import "./ResumeStyle.css";
import { Link } from "react-router-dom";

function Resume({ resumeId, companyName, interviewDate, createdTime, modifiedTime, reviewId }) {
    return (
        <tr className="item">
            <td className="num">{ resumeId}</td>
            <td className="name"><Link to={`${resumeId}`}>{ companyName}</Link></td>
            <td className="interview">{ interviewDate}</td>
            <td className="create">{ createdTime}</td>
        </tr>
    );
}

export default Resume;