import {createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todosService";
import {setError} from "./errors";

const initialState = {entities: [], isLoading: true};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    create(state, action) {
      state.entities.push(action.payload);
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(el => el.id === action.payload.id);
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestedFailed(state) {
      state.isLoading = false;
    }
  }
});

const {actions, reducer: taskReducer} = taskSlice;
const {
  received,
  create,
  update,
  remove,
  taskRequested,
  taskRequestedFailed
} = actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch (error) {
    dispatch(taskRequestedFailed());
    dispatch(setError(error.message));
  }
};

export const createTask = () => async (dispatch) => {
  try {
    const data = await todosService.post();
    const newData = {...data, title: `New task`, completed: false}
    dispatch(create(newData));
  } catch (error) {
    dispatch(taskRequestedFailed());
    dispatch(setError(error.message));
  }
};

export const getTask = () => (state) => {
  return state.tasks.entities;
};
export const getTaskLoadingStatus = () => (state) => {
  return state.tasks.isLoading;
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({id, completed: true}));
};

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}`});
};

export function taskDeleted(id) {
  return remove({ id });
};

export default taskReducer;