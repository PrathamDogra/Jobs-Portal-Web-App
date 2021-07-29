import {
  SET_CURRENT_USER,
  USER_LOADING,
  GET_ERRORS,
} from "../actions/userActionType";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: payload ? true : false,
        user: payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ERRORS:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
