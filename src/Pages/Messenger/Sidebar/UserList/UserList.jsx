// Import
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import "./UserList.css";
import { startConversation, createNewConversation } from "actions/user.action";
import _ from "lodash";
import Unit from "./Unit";

// Component
export default function ChatList() {
  const dispatch = useDispatch();
  const { conversations, userList } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  const [selectedId, setSelectedId] = useState("");
  // start conversation
  function handleOnClick(conversation) {
    setSelectedId(conversation.id);
    dispatch(startConversation(conversation));
  }

  // create new conversation
  async function handleCreateConversation() {
    const receiverEmail = prompt("Please enter your friend email :");
    if (userList && receiverEmail) {
      // find receiver by email in user list
      const receiver = _.find(userList, { email: receiverEmail });
      createNewConversation(user, receiver);
    }
  }

  return (
    <div className="sidebar__body">
      {conversations.length > 0 ? (
        conversations.map((conversation) => (
          <Unit
            key={conversation.id}
            conversation={conversation}
            onClick={() => handleOnClick(conversation)}
            selectedId={selectedId}
          />
        ))
      ) : (
        <Skeleton count={5} height={70} width={330} />
      )}
      <div className="add-conversation" onClick={handleCreateConversation}>
        <PersonAddIcon className="add-icon" />
      </div>
    </div>
  );
}
