import { combineReducers } from "redux";

import { auth } from "./auth.reducer";
import { alert } from "./alert.reducer";
import { category } from "./cateogry.reducer";

const rootReducer = combineReducers({
  auth,
  category,
  alert
});

export default rootReducer;
