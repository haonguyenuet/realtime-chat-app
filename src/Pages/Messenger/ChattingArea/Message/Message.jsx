// Import
import { Tooltip } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";

// High Order Component
const Message = forwardRef(({ userId, message }, ref) => {
  const isUser = userId === message.fromId;

  return (
    <div ref={ref} className={`message ${isUser ? "message--user" : ""}`}>
      <Tooltip title={new Date(message.createAt?.toDate()).toUTCString()}>
        <div className={`message__card ${isUser ? "message__card--user" : ""}`}>
          <div className="message__content">{message.content}</div>
        </div>
      </Tooltip>
    </div>
  );
});

export default Message;
