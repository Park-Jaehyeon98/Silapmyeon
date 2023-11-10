import styles from "./ResumeStyle.module.css";
import { Link } from "react-router-dom";

function Resume({
  resumeId,
  companyName,
  interviewDate,
  createdTime,
  modifiedTime,
  reviewId,
  idx,
}) {
  return (
    <tr className={styles.item}>
      <td>{idx + 1}</td>
      <td>
        <Link to={`${resumeId}`} style={{ textDecoration: "none", color: "black" }}>
          {companyName}
        </Link>
      </td>
      <td>{interviewDate}</td>
      <td>{createdTime.slice(0, 10)}</td>
    </tr>
  );
}

export default Resume;
