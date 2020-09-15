// Import
import React, { useEffect } from "react";

import "./index.css";
import Sidebar from "./Sidebar/Sidebar";
import ChattingArea from "./ChattingArea/ChattingArea";
import { useSelector, useDispatch } from "react-redux";
import { hasConversation } from "actions/user.action";
import Home from "./Home/Home";

// Component
export default function Messenger() {
  const { startedConversation } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!startedConversation) {
  //     dispatch(hasConversation());
  //   }
  // }, []);

  return (
    <div className="container">
      <div className="messenger__main">
        <Sidebar />
        {startedConversation ? <ChattingArea /> : <Home />}
      </div>
    </div>
  );
}
