// Import
import React, { Fragment } from "react";
import { Avatar } from "@material-ui/core";
import _ from "lodash";
import { useSelector } from "react-redux";
import "./Header.css";
// Component
export default function Header({ conversation }) {
  const { userList } = useSelector((state) => state.user);
  const receiver = _.find(userList, { uid: conversation.receiverId });
  return (
    <Fragment>
      <div className="chatting-area__header">
        <Avatar src={receiver.photoURL || ""} className="avatar" disable />
        <div className="chatting-area__info">
          <h3>{receiver ? receiver.displayName : null}</h3>
          <p>{receiver ? receiver.email : null}</p>
        </div>
      </div>
    </Fragment>
  );
}
