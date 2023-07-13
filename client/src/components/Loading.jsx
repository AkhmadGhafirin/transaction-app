import loading from "../assets/loading.gif";
// import loading1 from "../assets/loading1.gif";
const Loading = () => {
  return (
    <>
      <div className="container d-flex justify-content-center mt-5 pt-5">
        <img src={loading} alt="loading" width={"25%"} />
      </div>
    </>
  );
};

export default Loading;
