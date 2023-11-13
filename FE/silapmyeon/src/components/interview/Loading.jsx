import { Oval } from "react-loader-spinner";

function Loading() {
  return (
    <div>
      <Oval
        height={100}
        width={100}
        color="#8186d5"
        wrapperStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
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
