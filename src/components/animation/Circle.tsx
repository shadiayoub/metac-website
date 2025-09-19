import React, { useEffect, useState } from "react";

interface CircleProps {
  style: React.CSSProperties | any;
}

export default function Circle({ style }: CircleProps) {
  return (
    <div className="fixed transition-all  pointer-events-none" style={style}>
      <video
        controls={false}
        muted={true}
        autoPlay={true}
        loop={true}
        playsInline
        className={"w-full h-full object-cover rounded-full"}
      >
        <source src="/main/circle.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
