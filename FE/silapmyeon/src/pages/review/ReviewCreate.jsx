function ReviewCreate() {
  return (
    <div style={{ height: "100vh" }}>
      <div>면접 후기 등록</div>
      <input value={"기업명"} />
      <input value={"년도"} />
      <input value={"분기"} />
      <input value={"신입"} />
      <input value={"1차"} />
      <input value={"직무"} />
      <div>가장 기억에 남는 질문 한 가지를 남겨주세요.</div>
      <input />
      <div>자유롭게 면접 후기를 남겨주세요.</div>
      <textarea />
      <button>완료</button>
    </div>
  );
}

export default ReviewCreate;
