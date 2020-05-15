import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import settingsReducer from "./settingsReducer";
import buildsReducer from "./buildsReducer";

const rootReducer = combineReducers({
  common: commonReducer,
  settings: settingsReducer,
  builds: buildsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
