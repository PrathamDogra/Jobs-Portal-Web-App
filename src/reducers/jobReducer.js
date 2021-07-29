import {
  GET_JOB,
  GET_ALL_JOBS,
  SET_SHOW_JOB_DETAILS,
  SELECT_JOB,
  GET_ALL_CANDIDATES,
} from "../actions/jobActionType";

const initialState = {
  showJobDetails: false,
  jobs: [],
  jobId: null,
  jobDetails: {},
  candidates: [],
};

export default function jobReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_SHOW_JOB_DETAILS:
      return { ...state, showJobDetails: payload };
    case GET_ALL_JOBS:
      return { ...state, jobs: payload.data };
    case SELECT_JOB:
      return { ...state, jobId: payload };
    case GET_JOB:
      return { ...state, jobDetails: payload.data };
    case GET_ALL_CANDIDATES:
      if (payload === []) {
        return { ...state, candidates: payload };
      } else {
        return { ...state, candidates: payload.data };
      }

    default:
      return state;
  }
}
