import {
  GET_RESET_PASSWORD_TOKEN,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  INVALID_EMAIL,
} from "./resetPasswordActionType";
import { setSnackbar } from "./snackbarAction";
import axios from "axios";
import { BASE_URL } from "../constants";

const apiDispatch = (actionType = "", data) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const getResetPasswordToken = (email, history) => {
  const apiUrl = `${BASE_URL}/auth/resetpassword?email=${email}`;
  return (dispatch) => {
    axios
      .get(apiUrl)
      .then((response) => {
        dispatch(apiDispatch(GET_RESET_PASSWORD_TOKEN, response.data));
        history.push("/reset");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          dispatch({ type: INVALID_EMAIL, payload: true });
          dispatch(setSnackbar(true, "error", "Invalid Email"));
        }
      });
  };
};

export const changePassword = (body, history) => {
  const apiUrl = `${BASE_URL}/auth/resetpassword`;

  return (dispatch) => {
    axios
      .post(apiUrl, body)
      .then((response) => {
        dispatch(apiDispatch(CHANGE_PASSWORD, response.data));
        dispatch(setSnackbar(true, "success", "Password Updated Successfully"));
        history.push("/login");
      })
      .catch((error) => {
        dispatch(setSnackbar(true, "error", error.response.data.message));
        dispatch(apiDispatch(CHANGE_PASSWORD_ERROR, error.response));
      });
  };
};
