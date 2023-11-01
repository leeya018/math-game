import { combineReducers } from "redux";
import habitsReducer from "./habits";

// COMBINED REDUCERS
const reducers = {
  habits: habitsReducer,
};

export default combineReducers(reducers);
