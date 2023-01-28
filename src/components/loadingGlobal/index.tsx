import { useNProgress } from "@tanem/react-nprogress";
import React from "react";
const Loading: React.FC<{ isRouteChanging: boolean }> = ({
  isRouteChanging,
}) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging,
  });
  return (
    <>
      <style jsx>{`
        .container {
          opacity: ${isFinished ? 0 : 1};
          pointer-events: none;
          transition: opacity ${animationDuration}ms linear;
        }
        .bar {
          background: #2e88fd;
          height: 2px;
          left: 0;
          margin-left: ${(-1 + progress) * 100}%;
          position: fixed;
          top: 0;
          transition: margin-left ${animationDuration}ms linear;
          width: 100%;
          z-index: 1031;
        }
        .spinner {
          box-shadow: 0 0 10px var(--active-color), 0 0 5px var(--active-color);
          display: block;
          height: 100%;
          opacity: 1;
          position: absolute;
          right: 0;
          transform: rotate(3deg) translate(0px, -4px);
          width: 100px;
        }
      `}</style>
      <div className="container">
        <div className="bar">
          <div className="spinner" />
        </div>
      </div>
    </>
  );
};

export default Loading;
