import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import Reducer from './Reducer';

const store = createStore(Reducers)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider stare={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
