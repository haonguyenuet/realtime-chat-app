import React, { useEffect, useRef } from "react";

function AutoTypingText({ children }) {
  const textRef = useRef(null);
  let index = 0;

  useEffect(() => {
    const text = children || "You're special";
    const intervalId = setInterval(() => {
      textRef.current.innerHTML = text.slice(0, index);
      index++;
      if (index > text.length) {
        index = 0;
      }
    }, 250);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <span ref={textRef}></span>;
}

export default AutoTypingText;
