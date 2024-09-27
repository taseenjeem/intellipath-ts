"use client";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  return (
    <>
      <div className="size-full lg:w-[70%] bg-base-200 p-5 rounded-2xl">
        <div className="relative h-full flex justify-center items-center z-10">
          <ReactPlayer
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
            controls
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          />
          <span className="text-xl font-semibold animate-pulse -z-10">
            Loading...
          </span>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
