import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './containers/App';
// import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';

const incrementMiddleware = store => next => action => {
  if (action.type === 'HABIT_ASYNC_START') {
    const jwt = localStorage.getItem('jwt');
  }
  next(action);
}

const store = createStore(reducers, {}, applyMiddleware(incrementMiddleware, ReduxThunk));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();