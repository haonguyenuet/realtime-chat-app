import db from "firebase.js";
import { userConstant } from "./constant";

// get user list
export const getUserList = (uid) => {
  return async (dispatch) => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });
      dispatch({
        type: `${userConstant.GET_USERLIST}_SUCCESS`,
        payload: { userList: users },
      });
    });
    return unsubscribe;
  };
};
// get conversations
export const getConversations = (uid) => {
  return async (dispatch) => {
    const unsubscribe = db
      .collection("conversations")
      .onSnapshot((snapshot) => {
        const conversations = [];
        snapshot.forEach((doc) => {
          if (doc.data().user1_id === uid || doc.data().user2_id === uid) {
            const receiverId =
              doc.data().user1_id === uid
                ? doc.data().user2_id
                : doc.data().user1_id;
            conversations.push({
              id: doc.id,
              receiverId: receiverId,
              lastMessage: doc.data().lastMessage,
            });
          }
        });
        dispatch({
          type: `${userConstant.GET_CONVERSATIONS}_SUCCESS`,
          payload: { conversations: conversations },
        });
      });
    return unsubscribe;
  };
};

// start conversation and get conversation's messages
export const startConversation = (conversation) => {
  return async (dispatch) => {
    // const conversationId = userId.slice(0, 5) + guestUser.uid.slice(0, 5);
    // const reverseConversationId =
    //   guestUser.uid.slice(0, 5) + userId.slice(0, 5);

    // const converastionRef_1 = db.doc(`conversations/${conversationId}`);
    // const converastionRef_2 = db.doc(`conversations/${reverseConversationId}`);
    // const snapshot_1 = await converastionRef_1.get();
    // const snapshot_2 = await converastionRef_2.get();

    // if (!snapshot_1.exists && !snapshot_2.exists) {
    //   try {
    //     await converastionRef_1.set({
    //       user1_id: userId,
    //       user2_id: guestUser.uid,
    //       creatAt: new Date(),
    //     });
    //   } catch (err) {
    //     console.log("Error creating conversation document", err);
    //   }
    // }
    localStorage.setItem("conversation", JSON.stringify(conversation));
    dispatch({
      type: `${userConstant.START_CONVERSATION}_SUCCESS`,
      payload: conversation,
    });
  };
};
// Create new conversation
export const createNewConversation = async (user, receiver) => {
  // check receiver
  if (!receiver || receiver.email === user.email) {
    alert("Not found your friend!");
    return;
  }
  const conversationId = user.uid.slice(0, 5) + receiver.uid.slice(0, 5);
  const reverseConversationId = receiver.uid.slice(0, 5) + user.uid.slice(0, 5);

  const converastionRef_1 = db.doc(`conversations/${conversationId}`);
  const converastionRef_2 = db.doc(`conversations/${reverseConversationId}`);
  const snapshot_1 = await converastionRef_1.get();
  const snapshot_2 = await converastionRef_2.get();

  if (!snapshot_1.exists && !snapshot_2.exists) {
    try {
      await converastionRef_1.set({
        user1_id: user.uid,
        user2_id: receiver.uid,
        lastMessage: "",
        creatAt: new Date(),
      });
    } catch (err) {
      console.log("Error creating conversation document", err);
    }
  } else {
    alert("Room is existed");
  }
};
export const sendMessage = (user, message, conversationId) => {
  // post message
  db.collection("conversations")
    .doc(conversationId)
    .collection("messages")
    .add(message)
    .catch((err) => {
      console.error(err.message);
    });
  // update last message for this conversation
  db.collection("conversations")
    .doc(conversationId)
    .update({
      lastMessage: `${user.displayName}: ${message.content}`,
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const hasConversation = () => {
  return async (dispatch) => {
    const conversation = JSON.parse(localStorage.getItem("conversation"));
    if (conversation) {
      dispatch({
        type: `${userConstant.START_CONVERSATION}_SUCCESS`,
        payload: conversation,
      });
    }
  };
};

// export const filterConversations = (searchTerm) => {
//   return async (dispatch) => {
//     dispatch({
//       type: `${userConstant.FILTER_CONVERSATIONS}_SUCCESS`,
//       payload: searchTerm,
//     });
//   };
// };
