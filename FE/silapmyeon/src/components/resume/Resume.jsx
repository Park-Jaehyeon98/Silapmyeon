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
      <td className={styles.num}>{idx + 1}</td>
      <td className={styles.name}>
        <Link to={`${resumeId}`}>{companyName}</Link>
      </td>
      <td className={styles.interview}>{interviewDate}</td>
      <td className={styles.create}>{createdTime}</td>
    </tr>
  );
}

export default Resume;
