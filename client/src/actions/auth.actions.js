import * as types from './ActionTypes';
import config from '../config';

export const onTextChanged = e => ({
  type: types.AUTH_TEXT_CHANGED,
  payload: e
});

export const loginUser = (e, data) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch({ type: types.AUTH_ASYNC_START });
    fetch(`/api/v1/users/log-in`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .then(({jwt, error}) => {
      if (error) dispatch({ type: types.AUTH_ASYNC_FAIL, payload: error });
      else {
        localStorage.setItem('jwt', jwt);
        dispatch({ type: types.AUTH_LOGIN_DONE });
      }
    })
    .catch(err => dispatch({ type: types.HABIT_ASYNC_FAIL, payload: err.message }));
  }
};

export const logoutUser = () => {
  localStorage.removeItem('jwt');
  return { type: types.AUTH_LOGOUT_DONE };
}

export const signupUser = (e, data) => {
  e.preventDefault();
  return (dispatch) => {
    dispatch({ type: types.AUTH_ASYNC_START });
    fetch(`/api/v1/users/sign-up`, {
      method: "POST", 
      mode: "cors", 
      credentials: "include",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(({ jwt, error }) => {
        if (error) dispatch({ type: types.AUTH_ASYNC_FAIL, payload: error });
        else {
          localStorage.setItem('jwt', jwt);
          dispatch({ type: types.AUTH_SIGNUP_DONE });
        }
      })
      .catch(err => dispatch({ type: types.HABIT_ASYNC_FAIL, payload: err.message }));
  }
}

export const keepLoggedIn = () => {
  return { type: types.AUTH_STILL_LOGGED_IN };
}


