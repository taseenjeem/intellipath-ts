"use client";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  return (
    <>
      <div className="w-full lg:w-[70%] bg-base-200 p-5 rounded-2xl">
        <div className="relative h-full">
          <ReactPlayer
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          />
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
