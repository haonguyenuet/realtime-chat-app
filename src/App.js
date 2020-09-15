import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "actions/auth.action";
import Loading from "components/Loading";
import Authentication from "Pages/Authentication/index";
import Messenger from "Pages/Messenger/index";
import "./App.css";

function App() {
  const { authenticating, authenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authenticated) {
      dispatch(isLoggedIn());
    }
  }, []);

  return (
    <div className="App">
      {authenticating ? (
        <Loading />
      ) : authenticated ? (
        <Messenger />
      ) : (
        <Authentication />
      )}
    </div>
  );
}

export default App;
