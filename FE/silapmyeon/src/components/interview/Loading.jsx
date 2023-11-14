import { Oval } from "react-loader-spinner";

function Loading() {
  return (
    <div>
      <div style={{ color: "#37397E", fontSize: "25px", marginBottom: "15px" }}>
        질문을 생성 중 입니다!
      </div>
      <Oval
        height={100}
        width={100}
        color="#8186d5"
        wrapperStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#8186d5"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default Loading;
