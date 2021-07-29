import { SET_SNACKBAR } from "../actions/snackbarActionType";

// eslint-disable-next-line no-unused-vars
const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

export default function snackbarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SNACKBAR:
      const { snackbarOpen, snackbarMessage, snackbarType } = action;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage,
      };
    default:
      return state;
  }
}
