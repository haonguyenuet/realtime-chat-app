import AutoTypingText from "components/AutoTyping";
import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";
function Home() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="home">
      <div className="home__greeting">
        <h1>
          He<span>ll</span>o!
        </h1>
        <AutoTypingText>{user.displayName}</AutoTypingText>
      </div>
      <div className="home__image">
        <img src={require("images/home_image.jpg")} alt="home_image" />
      </div>
    </div>
  );
}

export default Home;
