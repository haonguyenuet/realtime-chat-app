// Import
import React from "react";
import { Avatar } from "@material-ui/core";
import _ from "lodash";
import { useSelector } from "react-redux";

// Component
export default function SidebarChat({ conversation, onClick, selectedId }) {
  const { userList } = useSelector((state) => state.user);
  const isActive = conversation.id === selectedId;
  const receiver = _.find(userList, { uid: conversation.receiverId });
  return (
    <div
      className={`sidebar__conversation ${
        isActive ? "sidebar__conversation--active" : ""
      }`}
      onClick={onClick}
    >
      <Avatar src={receiver.photoURL || ""} className="avatar" />
      <div className="conversation__info">
        <h3>{receiver.displayName}</h3>
        <p>
          {conversation.lastMessage
            ? conversation.lastMessage
            : "Not a message"}
        </p>
      </div>
      <span
        className={
          receiver.isOnline ? "onlineStatus" : "onlineStatus onlineStatus--off"
        }
      ></span>
    </div>
  );
}
