import {
  AUTH_ASYNC_START,
  AUTH_ASYNC_FAIL,
  AUTH_TEXT_CHANGED,
  AUTH_LOGIN_DONE,
  AUTH_LOGOUT_DONE,
  AUTH_SIGNUP_DONE,
  AUTH_STILL_LOGGED_IN
} from '../actions/ActionTypes';

const initialState = {
  isLogin: false,
  email: '',
  password: '',
  error: '',
  loading: false,
  repeatPassword: '',
}

export default (state = initialState, action) => {
  switch(action.type) {

    case AUTH_TEXT_CHANGED:
      return {
        ...state,
        [action.payload.target.name]: action.payload.target.value,
      }
    
    case AUTH_ASYNC_START: 
      return {
        ...state,
        loading: true,
        error: ''
      }

    case AUTH_ASYNC_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case AUTH_LOGIN_DONE: 
      return {
        ...state,
        isLogin: true,
        loading: false,
        password: '',
        email: '',
      }

    case AUTH_LOGOUT_DONE:
      return {
        ...state,
        isLogin: false,
        loading: false,
        password: '',
        email: '',
      }

    case AUTH_SIGNUP_DONE:
      return {
        ...state,
        isLogin: true,
        loading: false,
        password: '',
        email: '',
        repeatPassword: ''
      }
    
    case AUTH_STILL_LOGGED_IN:
      return {
        ...state,
        isLogin: true
      }

    default:
      return state;
  }
}

