import { auth } from "firebase.js";
import db from "firebase.js";
import { authConstant, userConstant } from "./constant";

//handle sign up
export const signUp = (user) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstant.USER_LOGIN}_REQUEST`,
    });

    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const currUser = auth.currentUser;
        currUser
          .updateProfile({
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
          .then(() => {
            //if you are here means it is update successfully profile
            const userDoc = {
              displayName: user.displayName,
              photoURL: user.photoURL,
              email: user.email,
              uid: data.user.uid,
              createAt: new Date().toUTCString(),
              isOnline: true,
            };
            db.collection("users")
              .doc(data.user.uid)
              .set(userDoc)
              .then(() => {
                // if you are here means you create successfully user document to firestore
                const loggedInUser = {
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  email: user.email,
                  uid: data.user.uid,
                };
                // update logged in user in local storage
                localStorage.setItem(
                  "loggedInUser",
                  JSON.stringify(loggedInUser)
                );
                dispatch({
                  type: `${authConstant.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                });
              })
              .catch((err) => {
                console.error(err.message);
              });
          });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            dispatch({
              type: `${authConstant.USER_LOGIN}_ERROR_EMAIL`,
              payload: { error: err.message },
            });
            break;
          case "auth/weak-password":
            dispatch({
              type: `${authConstant.USER_LOGIN}_ERROR_PASSWORD`,
              payload: { error: err.message },
            });
            break;
          default:
            break;
        }
      });
  };
};
// handle sign in
export const signIn = (user) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConstant.USER_LOGIN}_REQUEST`,
    });

    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        // if you are here means you create successfully user document to firestore
        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const loggedInUser = {
              email: user.email,
              displayName: data.user.displayName,
              photoURL: data.user.photoURL,
              uid: data.user.uid,
            };
            // update logged in user in local storage
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            dispatch({
              type: `${authConstant.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            });
          })
          .catch((err) => {
            console.error(err.message);
          });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            dispatch({
              type: `${authConstant.USER_LOGIN}_ERROR_EMAIL`,
              payload: { error: err.message },
            });
            break;
          case "auth/wrong-password":
            dispatch({
              type: `${authConstant.USER_LOGIN}_ERROR_PASSWORD`,
              payload: { error: err.message },
            });
            break;
          default:
            break;
        }
      });
  };
};
//  Check user is logged in
export const isLoggedIn = () => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      dispatch({
        type: `${authConstant.USER_LOGIN}_SUCCESS`,
        payload: { user },
      });
    }
  };
};
// handle sign out
export const signOut = (uid) => {
  return async (dispatch) => {
    db.collection("users")
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        auth.signOut().then(() => {
          localStorage.clear();
          dispatch({
            type: `${authConstant.USER_LOGOUT}_SUCCESS`,
          });
          dispatch({
            type: `${userConstant.REFRESH_STATE}_SUCCESS`,
          });
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
};
