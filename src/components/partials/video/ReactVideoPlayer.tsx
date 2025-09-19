"use client";

import React from "react";
import ReactPlayer from "react-player/lazy";

interface ReactVideoPlayerProps {
  videoUrl: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

const ReactVideoPlayer = ({
  videoUrl,
  onPlay,
  onPause,
  onEnded,
}: ReactVideoPlayerProps) => {
  return (
    <>
      <ReactPlayer
        url={`${videoUrl}`}
        suppressHydrationWarning={true}
        controls={false}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        width={"100%"}
        height={"100%"}
        volume={50}
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "16/9",
          objectFit: "cover",
          // borderRadius: "36px",
          // border: "2px solid #B848D8",
          overflow: "hidden",
        }}
      />
    </>
  );
};

export default ReactVideoPlayer;
