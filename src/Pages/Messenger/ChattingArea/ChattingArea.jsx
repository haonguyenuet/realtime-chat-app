import React from "react";
import { useSelector } from "react-redux";
import "./ChattingArea.css";
import ConversationDisplay from "./ConversationDisplay/ConversationDisplay";
import Header from "./Header/Header";
import TypingForm from "./TypingForm/TypingForm";

// Component
export default function ChattingArea() {
  const { user } = useSelector((state) => state.auth);
  const { conversation } = useSelector((state) => state.user);
  return (
    <div className="chatting-area__wrapper">
      <Header conversation={conversation} />
      <ConversationDisplay user={user} conversationId={conversation.id} />
      <TypingForm user={user} conversationId={conversation.id} />
    </div>
  );
}
