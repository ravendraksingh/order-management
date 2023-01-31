import Loading_2 from "../../assets/Loading_2.gif";

const LoadingGIF = () => {
  return (
    <div style={{ textAlign: "center", margin: "25vh" }}>
      <p>Loading...</p>
      <img
        src={Loading_2}
        style={{ height: "60px", width: "60px" }}
        alt="Loading..."
      />
    </div>
  );
};

export default LoadingGIF;
