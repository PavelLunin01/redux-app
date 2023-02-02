import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTask,
  getTaskLoadingStatus,
  createTask
} from "./store/task";
import {createStore} from "./store/store";
import {Provider, useDispatch, useSelector} from "react-redux";
import {getErrors} from "./store/errors";

const store = createStore();
const App = () => {
  const state = useSelector(getTask());
  const isLoading = useSelector(getTaskLoadingStatus());
  const error = useSelector(getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (id) => {
    dispatch(titleChanged(id));
  };
  const deleteTask = (id) => {
    dispatch(taskDeleted(id));
  };
  const addTask = () => {
    dispatch(createTask());
  };

  if (isLoading) {
    return <h1>Loading...</h1>
  };
  if (error) {
    return <p>Network error</p>
  }

  return (
    <div>
      <ul>
        {state.map(el => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(el.id))}>completed</button>
            <button onClick={() => changeTitle(el.id)}>title</button>
            <button onClick={() => deleteTask(el.id)}>delete</button>
            <hr/>
          </li>
        ))}
      </ul>
      <button onClick={() => addTask()}>Добавить задачу</button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

