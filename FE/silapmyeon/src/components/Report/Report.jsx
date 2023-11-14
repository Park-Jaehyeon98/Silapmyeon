import styles from "../../styles/ReportDetail.module.css";

function Report({ data }) {
  return (
    <div
      className={styles.container}
      style={{ padding: "8px", border: "1px solid #828282", margin: "20px" }}
    >
      <div className={styles.titleContainer}>
        <h1>{data.company}</h1>
        <h1>모의 면접</h1>
        <h1>REPORT</h1>
      </div>
      <div className={styles.interviewContainer}>
        <h2>면접 문항</h2>
        {data.interviews.map((item, index) => (
          <div className={styles.interview} key={index}>
            <div className={styles.interviewItem}>
              <p>문항 {index + 1}</p>
            </div>
            <div className={styles.interviewItem}>
              <div className={styles.qna}>{item.question}</div>
              <div className={styles.qna}>{item.answer}</div>
            </div>
            <video
              className={styles.interviewItem}
              width="100%"
              height="300px"
              controls
            >
              <source src={item.url} type="video/webm" />
              video tag.
            </video>
          </div>
        ))}
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Report;
