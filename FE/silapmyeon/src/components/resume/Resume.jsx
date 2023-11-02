function Resume({resumeId, companyName, interviewDate, createdTime, modifiedTime, reviewId}) {
    return (
        <tr>
            <td>{ resumeId}</td>
            <td>{ companyName}</td>
            <td>{ interviewDate}</td>
            <td>{ createdTime}</td>
        </tr>
    );
}

export default Resume;