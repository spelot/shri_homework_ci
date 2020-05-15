import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";

const initialState = {};

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(middlewareEnhancer)
);

export default store;
