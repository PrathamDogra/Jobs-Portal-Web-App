import {
  GET_RESET_PASSWORD_TOKEN,
  INVALID_EMAIL,
} from "../actions/resetPasswordActionType";

const intialState = {
  resetToken: null,
  invalidEmail: false,
};

export default function resetPasswordReducer(
  state = intialState,
  { type, payload }
) {
  switch (type) {
    case GET_RESET_PASSWORD_TOKEN:
      return {
        ...state,
        resetToken: payload.data.token,
      };
    case INVALID_EMAIL:
      return {
        ...state,
        invalidEmail: payload,
      };
    default:
      return state;
  }
}
