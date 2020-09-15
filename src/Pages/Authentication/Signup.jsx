// Import
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { signUp } from "actions/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "firebase.js";
import {} from "@material-ui/core";

// Component
export default function Signup() {
  const dispatch = useDispatch();
  const { emailError, passwordError } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  function handleUploadAvatar(e) {
    const file = e.target.files[0];
    if (file) {
      const uploadTask = storage.ref(`profileImages/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("profileImages")
            .child(file.name)
            .getDownloadURL()
            .then((url) => setPhotoURL(url));
        }
      );
    }
  }

  function clearInputs() {
    setEmail("");
    setPassword("");
    setUserName("");
  }

  // handle Sign up
  function handleSignup(e) {
    // prevent page reloads
    e.preventDefault();
    // Check input
    if (!userName) return;
    const user = {
      displayName: userName,
      email,
      password,
      photoURL,
    };
    dispatch(signUp(user));

    clearInputs();
  }
  return (
    <form onSubmit={handleSignup}>
      {/* Title */}
      <h2 className="auth__title">Sign up</h2>
      {/* Email */}
      <div className="auth__form-control">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          required
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
      </div>
      {/* Password */}
      <div className="auth__form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
      </div>
      {/* User Name */}
      <div className="auth__form-control">
        <label htmlFor="userName">Your Name</label>
        <input
          type="text"
          required
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {/* Avatar Photo */}
      <div className="auth__form-control">
        <label htmlFor="avatar">Avatar</label>
        <input type="file" id="avatar" onChange={handleUploadAvatar} />
      </div>
      {/* Direct */}
      <div className="btnContainer">
        <button type="submit">Sign up</button>
        <p>
          Already have an account ?<Link to="/">Log in</Link>
        </p>
      </div>
      {/*  */}
    </form>
  );
}
