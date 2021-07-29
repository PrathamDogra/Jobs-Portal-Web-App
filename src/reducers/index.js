import { combineReducers } from "redux";
import authReducer from "./authReducer";
import jobReducer from "./jobReducer";
import snackbarReducer from "./snackbarReducer";
import resetPasswordReducer from "./resetPasswordReducer";

const appReducer = combineReducers({
  authReducer,
  jobReducer,
  snackbarReducer,
  resetPasswordReducer,
});

export default function rootReducer(state, action) {
  return appReducer(state, action);
}
