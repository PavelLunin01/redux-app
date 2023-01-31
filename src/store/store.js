import { legacy_createStore as createStore } from "redux";
import {taskReducer} from "./taskReducer";
const initialState = [{ id: 1, title: "task1", completed: false }, { id: 2, title: "task2", completed: false }];

export function initialStore() {
  return createStore(taskReducer, initialState);
};
