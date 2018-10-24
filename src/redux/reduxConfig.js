import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

export const configureStore = preloadedState => {
  const middlewares = [thunk];
  const middlewaresEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, preloadedState, middlewaresEnhancer);
  return store;
};
