//Import
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { sendMessage } from "actions/user.action";
import React, { useState } from "react";
import "./TypingForm.css";

// Component
export default function TypingForm({ user, conversationId }) {
  const [input, setInput] = useState("");

  function handleSendMessage(e) {
    e.preventDefault();
    const message = {
      content: input,
      fromId: user.uid,
      createAt: new Date(),
    };
    sendMessage(user, message, conversationId);
    setInput("");
  }
  return (
    <form onSubmit={handleSendMessage} className="typing__form">
      <FormControl className="form__control">
        <Input
          placeholder="Enter your message..."
          className="form__input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <FormHelperText />
        <IconButton
          disabled={!input}
          variant="contained"
          type="submit"
          className="form__btn"
          color="primary"
        >
          <SendIcon />
        </IconButton>
      </FormControl>
    </form>
  );
}
