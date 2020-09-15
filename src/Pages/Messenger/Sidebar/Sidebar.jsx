// Import
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getConversations, getUserList } from "actions/user.action";

import Header from "./Header/Header";
import SidebarSearch from "./SidebarSearch/SidebarSearch";
import UserList from "./UserList/UserList";

// Component
export default function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // get user list
  useEffect(() => {
    const unsubscribe = dispatch(getUserList(user.uid));
    return () => unsubscribe;
  }, []);
  // get conversation list
  useEffect(() => {
    const unsubscribe = dispatch(getConversations(user.uid));
    return () => unsubscribe;
  }, []);

  return (
    <div className="sidebar">
      <Header />
      <SidebarSearch />
      <UserList />
    </div>
  );
}
