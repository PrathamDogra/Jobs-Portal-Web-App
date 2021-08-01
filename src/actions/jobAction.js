import {
  GET_JOB,
  GET_ALL_JOBS,
  SET_SHOW_JOB_DETAILS,
  SELECT_JOB,
  GET_ALL_CANDIDATES,
} from "./jobActionType";

import { setSnackbar } from "./snackbarAction";
import axios from "axios";
import { BASE_URL } from "../constants";

const apiDispatch = (actionType = "", data) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const createJob = (jobData) => {
  const apiUrl = `${BASE_URL}/jobs`;
  return (dispatch) => {
    axios
      .post(apiUrl, jobData)
      .then((response) => {
        dispatch(setSnackbar(true, "success", "Job posted successfully"));
        dispatch(getJobsList());
      })
      .catch((error) => {
        dispatch(setSnackbar(true, "error", "Error in job posting"));
      });
  };
};

export const getJobsList = () => {
  const apiUrl = `${BASE_URL}/recruiters/jobs`;
  return (dispatch) => {
    axios
      .get(apiUrl)
      .then((response) => {
        dispatch(apiDispatch(GET_ALL_JOBS, response.data.data));
      })
      .catch((error) => {
        dispatch(setSnackbar(true, "info", "Create a Job"));
      });
  };
};

export const getJob = (id) => {
  const apiUrl = `${BASE_URL}/jobs/${id}`;
  return (dispatch) => {
    axios
      .get(apiUrl)
      .then((response) => {
        dispatch(apiDispatch(GET_JOB, response.data));
      })
      .catch((error) => {
        dispatch(setSnackbar(true, "error", "Error in selected Job"));
      });
  };
};

export const getAllCandidates = (id) => {
  const apiUrl = `${BASE_URL}/recruiters/jobs/${id}/candidates`;
  return (dispatch) => {
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.message) {
          dispatch(apiDispatch(GET_ALL_CANDIDATES, []));
        } else {
          dispatch(apiDispatch(GET_ALL_CANDIDATES, response.data));
        }
      })
      .catch((error) => {
        dispatch(setSnackbar(true, "error", "Error in getting candidates"));
      });
  };
};

export const setShowJobDetails = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_SHOW_JOB_DETAILS, payload: data });
  };
};

export const setJobIdSelected = (id) => {
  return (dispatch) => {
    dispatch({ type: SELECT_JOB, payload: id });
  };
};
