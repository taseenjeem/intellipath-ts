"use client";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  return (
    <>
      <div className="mt-5 w-full bg-base-200 p-5 rounded-2xl">
        <div className="relative h-[calc(100vh-600px)] md:min-h-[calc(100vh-350px)]">
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
