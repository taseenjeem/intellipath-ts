const LoadingScreen = () => {
  return (
    <>
      <section className="custom-min-h w-full flex flex-col justify-center items-center">
        <span className="loading loading-infinity w-28" />
        <h1 className="text-xl">Loading...</h1>
      </section>
    </>
  );
};

export default LoadingScreen;
