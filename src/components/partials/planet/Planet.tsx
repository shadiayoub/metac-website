import React from "react";

export default function Planet() {
  return (
    <>
      <div
        className={`w-full h-full flex items-center justify-center relative -z-10`}
      >
        <div
          className={`size-[580px] rounded-full bg-gradient-to-br from-[#B848D8] to-[#5F9FE7] blur-[60px]`}
        />
        <div
          className={`size-[580px] rounded-full bg-background border absolute`}
        />
      </div>
    </>
  );
}
