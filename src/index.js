import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import * as actions from "./store/actions";
import {initialStore} from "./store/store";

const store = initialStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);

  const completeTask = (id) => {
    store.dispatch(actions.taskCompleted(id));
  };
  const changeTitle = (id) => {
    store.dispatch(actions.titleChanged(id));
  };
  const deleteTask = (id) => {
    store.dispatch(actions.taskDeleted(id));
  };
  return (
    <div>
      <ul>
        {state.map(el => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>completed</button>
            <button onClick={() => changeTitle(el.id)}>title</button>
            <button onClick={() => deleteTask(el.id)}>delete</button>
            <hr/>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

