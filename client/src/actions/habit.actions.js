import * as types from './ActionTypes';

export const getHabits = () => {
  const jwt = localStorage.getItem('jwt');
  const headers = new Headers();
  headers.append('jwt', jwt);

  return (dispatch) => {
    console.log('%c new data get!', 'color: blue')
    dispatch({ type: types.HABIT_GET_ALL_START });
    fetch(`/api/v1/habits/all`, {
      headers 
    })
      .then(res => res.json())
      .then(json => {
        // Sort habits by pos
        if (json.habits) {
          json.habits.sort((a, b) => a.pos - b.pos);
          dispatch({
            type: types.HABIT_GET_ALL_DONE,
            payload: json.habits
          })  
        }
      })
      .catch(err => dispatch({ type: types.HABIT_ASYNC_FAIL, payload: err.message }));
  }
}

export const addNewHabit = (data, history) => {
  const jwt = localStorage.getItem('jwt');
  const headers = new Headers();
  headers.append('jwt', jwt);
  headers.append("Content-Type", "application/json; charset=utf-8");

  return (dispatch) => {
    dispatch({ type: types.HABIT_ASYNC_START });
    fetch(`/api/v1/habits/new`, {
      method: "POST",
      mode: "cors", 
      credentials: "include", 
      headers,
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) dispatch({ type: types.HABIT_ASYNC_FAIL, payload: json.error });
        else {
          dispatch({ type: types.HABIT_ADD_NEW_DONE })
          history.goBack();
        }
      })
      .catch(err => dispatch({ type: types.HABIT_ASYNC_FAIL, payload: err.message }));
  }
}

export const saveChange = (data) => {
  const jwt = localStorage.getItem('jwt');
  const headers = new Headers();
  headers.append('jwt', jwt);
  headers.append("Content-Type", "application/json; charset=utf-8");
  
  // Get user-rearranged habit list index 
  const habits = data.map((habit, index) => ({ title: habit.title, pos: index }));

  return (dispatch) => {
    dispatch({ type: types.HABIT_SAVE_START });
    fetch(`/api/v1/habits/save-all`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers,
      body: JSON.stringify({ habits })
    })
      .then(res => res.json())
      .then(json => {
        console.log('save', json)
        dispatch({ type: types.HABIT_SAVE_CHANGE_DONE })
      })
      .catch(err => dispatch({ type: types.HABIT_ASYNC_FAIL, payload: err.message }));
  }
}

export const logHabit = (id) => {
  const jwt = localStorage.getItem('jwt');
  const headers = new Headers();
  headers.append('jwt', jwt);
  headers.append("Content-Type", "application/json; charset=utf-8");

  return (dispatch) => {
    dispatch({ 
      type: types.HABIT_LOG_START,
      payload: { id }
    });
    fetch(`/api/v1/habits/${id}/records/new`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers
    })
      .then(res => res.json())
      .then(json => {
        dispatch({ 
          type: types.HABIT_LOG_DONE,
          payload: { id }
        })
      })
      .catch(err => dispatch({ type: types.HABIT_ASYNC_FAIL, payload: err.message }));
  }
}

export const undoLogHabit = (id) => {
  const jwt = localStorage.getItem('jwt');
  const headers = new Headers();
  headers.append('jwt', jwt);
  headers.append("Content-Type", "application/json; charset=utf-8");
  
  return (dispatch) => {
    dispatch({
      type: types.HABIT_LOG_START,
      payload: { id }
    });
    fetch(`/api/v1/habits/${id}/records/`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers
    })
      .then(res => res.json())
      .then(json => {
        dispatch({ 
          type: types.HABIT_LOG_DONE,
          payload: { id }
        })
      })
      .catch(err => dispatch({ type: types.HABIT_ASYNC_FAIL, payload: err.message }));
  }
}

export const deleteHabit = id => {
  const jwt = localStorage.getItem('jwt');
  const headers = new Headers();
  headers.append('jwt', jwt);
  headers.append("Content-Type", "application/json; charset=utf-8");

  return (dispatch) => {
    dispatch({ type: types.HABIT_ASYNC_START, payload: id });
    fetch(`/api/v1/habits/${id}/`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers
    })
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: types.HABIT_DELETE_DONE,
          payload: id
        })
      })
      .catch(err => dispatch({ type: types.HABIT_ASYNC_FAIL, payload: err.message }));
  }
}