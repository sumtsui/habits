import {
  NAV_MENU_OPEN,
  NAV_MENU_CLOSE,
  NAV_PROMPT_OPEN,
  NAV_PROMPT_CLOSE
} from '../actions/ActionTypes';

const initialState = {
  menuOpen: false,
  promptOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case NAV_MENU_OPEN:
      return {
        ...state,
        menuOpen: true
      }
    
    case NAV_MENU_CLOSE:
      return {
        ...state,
        menuOpen: false
      }

    case NAV_PROMPT_OPEN:
      return {
        ...state,
        promptOpen: true
      }
    
    case NAV_PROMPT_CLOSE:
      return {
        ...state,
        promptOpen: false
      }

    default:
      return state;
  }
}