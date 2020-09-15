import { authConstant } from "actions/constant";

const initialState = {
  user: {
    displayName: "",
    email: "",
    uid: "",
  },
  authenticating: false,
  authenticated: false,
  emailError: null,
  passwordError: null,
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case `${authConstant.USER_LOGIN}_REQUEST`:
      return {
        ...state,
        authenticating: true,
      };
    case `${authConstant.USER_LOGIN}_SUCCESS`:
      return {
        ...state,
        user: { ...action.payload.user },
        authenticating: false,
        authenticated: true,
      };
    case `${authConstant.USER_LOGIN}_ERROR_EMAIL`:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        emailError: action.payload.error,
      };
    case `${authConstant.USER_LOGIN}_ERROR_PASSWORD`:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        passwordError: action.payload.error,
      };
    case `${authConstant.USER_LOGOUT}_SUCCESS`:
      return initialState;
    default:
      return state;
  }
};
