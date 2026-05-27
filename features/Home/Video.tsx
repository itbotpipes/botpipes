import React from "react";

const Video = () => {
  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <video
        loop
        muted
        autoPlay
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/about-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
