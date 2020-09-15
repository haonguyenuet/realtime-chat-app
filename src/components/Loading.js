import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function Loading() {
  return (
    <div className="container">
      <div className="messenger__main">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar__header">
            <div className="sidebar__headerLeft">
              <Skeleton circle={true} height={50} width={50} />
            </div>
          </div>
          <div className="sidebar__search"></div>
          <div className="sidebar__body">
            <Skeleton count={5} height={70} width={330} />
          </div>
        </div>
        {/*  */}
        <div className="home">
          <Skeleton className="skeleton__home" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
