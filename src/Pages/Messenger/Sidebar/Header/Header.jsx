// Import
import { Avatar } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { signOut } from "actions/auth.action";
import CircleButton from "components/CircleButton";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";

// Component
export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // handle sign out
  function handleSignOut() {
    dispatch(signOut(user.uid));
  }
  return (
    <div className="sidebar__header">
      <div className="sidebar__headerLeft">
        <Avatar src={user.photoURL || ""} className="avatar" />
        <h4>{user.displayName}</h4>
      </div>
      <div className="sidebar__headerRight">
        <CircleButton>
          <CreateIcon />
        </CircleButton>

        <CircleButton onClick={handleSignOut}>
          <ExitToAppOutlinedIcon />
        </CircleButton>
      </div>
    </div>
  );
}
