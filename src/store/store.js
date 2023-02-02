import {combineReducers, configureStore} from "@reduxjs/toolkit";
import taskReducer from "./task";
import {logger} from "./middleware/logger";
import errorReducer from "./errors";
const rootReducers = combineReducers({
  errors: errorReducer,
  tasks: taskReducer
});
export function createStore() {
  return configureStore({
    reducer: rootReducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export default createStore()
