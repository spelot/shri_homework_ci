import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import settingsReducer from "./settingsReducer";
import buildsReducer from "./buildsReducer";

export default combineReducers({
  common: commonReducer,
  settings: settingsReducer,
  builds: buildsReducer,
});
