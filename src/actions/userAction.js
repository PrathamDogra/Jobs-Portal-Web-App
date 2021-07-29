import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "../constants";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./userActionType";
import { setSnackbar } from "./snackbarAction";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  const apiUrl = `${BASE_URL}/auth/register`;

  axios
    .post(apiUrl, userData)
    .then((res) => {
      history.push("/login");
      dispatch(setSnackbar(true, "success", "User Registered Successfully"));
    })
    .catch((err) => {
      dispatch(setSnackbar(true, "error", err.response.data.message));
    });
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  const apiUrl = `${BASE_URL}/auth/login`;

  axios
    .post(apiUrl, userData)
    .then((response) => {
      const res = response.data;
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((error) => {
      // let err;
      // if (error.response.status === 422) {
      //   err = "email";
      // } else if (error.response.status === 401) {
      //   err = "password";
      // }
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err,
      // });
      dispatch(setSnackbar(true, "error", error.response.data.message));
    });
};

// Set logged in user
export const setCurrentUser = (data) => {
  return {
    type: SET_CURRENT_USER,
    payload: data,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
