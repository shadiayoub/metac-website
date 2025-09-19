"use client";
import React, { useEffect } from "react";

export default function CertikEmblem() {
  useEffect(() => {
    // Inject style to hide emblem initially
    const style = document.createElement("style");
    document.head.appendChild(style);
    style.sheet?.insertRule(".certik-emblem { display: none; }", 0);

    // Load script asynchronously
    const script = document.createElement("script");
    script.src =
      "https://emblem.certik-assets.com/script?pid=metacces&vid=5e87f712";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(style);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="certik-emblem"
      data-id="5e87f712"
      dangerouslySetInnerHTML={{
        __html:
          '<a href="https://skynet.certik.com/projects/metacces?utm_source=SkyEmblem&utm_campaign=metacces&utm_medium=link">View project at certik.com</a>',
      }}
    />
  );
}
