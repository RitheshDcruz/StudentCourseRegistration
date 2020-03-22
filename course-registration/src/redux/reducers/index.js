import { combineReducers } from "redux";
import students from "./studentReducer";

const rootReducer = combineReducers({
  students
});

export default rootReducer;
