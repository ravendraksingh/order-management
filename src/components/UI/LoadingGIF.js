import Loading_2 from "../assets/Loading_2.gif";

const LoadingGIF = () => {
  return (
    <div style={{ textAlign: "center", margin: "25vh" }}>
      <p>Loading data...</p>
      <img src={Loading_2} style={{ height: "60px", width: "60px" }}></img>
    </div>
  );
};

export default LoadingGIF;
