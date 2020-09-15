// Import
import db from "firebase.js";
import React, { useEffect, useRef, useState } from "react";
import FlipMove from "react-flip-move";
import Message from "../Message/Message";
import "./ConversationDisplay.css";

// Component
export default function ConversationDisplay({ user, conversationId }) {
  const conversationDisplayRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("conversations")
      .doc(conversationId)
      .collection("messages")
      .orderBy("createAt")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, [conversationId, setMessages]);

  useEffect(() => {
    if (conversationDisplayRef) {
      conversationDisplayRef.current.scrollTop =
        conversationDisplayRef.current.scrollHeight;
    }
  });

  return (
    <div className="chatting-area__display" ref={conversationDisplayRef}>
      <FlipMove>
        {messages.length > 0 ? (
          messages.map(({ id, message }) => {
            return <Message key={id} userId={user.uid} message={message} />;
          })
        ) : (
          <div className="chatting-area__not-mesage">
            <span>Not a message</span>
          </div>
        )}
      </FlipMove>
    </div>
  );
}
