import Logo from "../ui/Logo";

const LoadingScreen = () => {
  return (
    <>
      <section className="custom-min-h w-full flex flex-col justify-center items-center bg-base-100">
        <Logo loadingMode={true} />
        <progress className="progress w-60" />
      </section>
    </>
  );
};

export default LoadingScreen;
