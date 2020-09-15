import { userConstant } from "actions/constant";

const initialState = {
  userList: [],
  conversations: [],
  startedConversation: false,
  conversation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${userConstant.GET_USERLIST}_SUCCESS`:
      return {
        ...state,
        userList: action.payload.userList,
      };
    case `${userConstant.GET_CONVERSATIONS}_SUCCESS`:
      return {
        ...state,
        conversations: action.payload.conversations,
      };

    case `${userConstant.START_CONVERSATION}_SUCCESS`:
      return {
        ...state,
        startedConversation: true,
        conversation: action.payload,
      };
    case `${userConstant.REFRESH_STATE}_SUCCESS`:
      return initialState;

    default:
      return state;
  }
};
