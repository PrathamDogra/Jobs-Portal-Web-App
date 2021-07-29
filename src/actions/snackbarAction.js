import { SET_SNACKBAR } from "./snackbarActionType";

export const setSnackbar = (
  snackbarOpen,
  snackbarType = "success",
  snackbarMessage = ""
) => ({
  type: SET_SNACKBAR,
  snackbarOpen,
  snackbarType,
  snackbarMessage,
});
