import {
  HABIT_ASYNC_START,
  HABIT_GET_ALL_DONE,
  HABIT_ADD_NEW_DONE,
  HABIT_SAVE_CHANGE_DONE,
  HABIT_RECORD_DONE,
  HABIT_RECORD_UNDO_DONE,
  HABIT_DELETE_DONE,
  AUTH_LOGOUT_DONE,
  HABIT_ASYNC_FAIL,
  HABIT_RECORD_TOGGLED
} from '../actions/ActionTypes';

import { 
  getThisWeekData, 
  getLastWeekData, 
  getLastMonthData, 
  getThisMonthData,
  capFirstLetter
} from '../utils';

const initialState = {
  habits: [],
  loading: false,
  isHabitDeleted: false,
  todayRecordChanged: false,
  changedHabitID: '',
  deletedHabitID: '',
  error: '',
  changeSaved: false,
  habitAdded: false,
  toggledHabitID: ''
}

export default (state = initialState, action) => {
  switch (action.type) {

    case HABIT_ASYNC_START:
      return {
        ...state,
        loading: true,
        error: '',
        changeSaved: false,
        habitAdded: false
      }

    case HABIT_GET_ALL_DONE:
      const habits = action.payload.map(habit => ({
        ...habit,
        title: capFirstLetter(habit.title),
        thisWeek: getThisWeekData(habit.records),
        lastWeek: getLastWeekData(habit.records),
        thisMonth: getThisMonthData(habit.records),
        lastMonth: getLastMonthData(habit.records),
      }));
      return {
        ...state,
        habits: habits,
        loading: false
      }

    case HABIT_ADD_NEW_DONE:
      return {
        ...state,
        loading: false,
        habitAdded: true, 
      }

    case HABIT_SAVE_CHANGE_DONE:
      return {
        ...state,
        loading: false,
        changeSaved: true
      }

    case HABIT_RECORD_DONE:
      return {
        ...state,
        todayRecordChanged: action.payload.bool,
        changedHabitID: action.payload.id,
        loading: false,
        toggledHabitID: ''
      }

    case HABIT_RECORD_UNDO_DONE:
      return {
        ...state,
        todayRecordChanged: action.payload.bool,
        changedHabitID: action.payload.id,
        loading: false,
        toggledHabitID: ''
      }

    case HABIT_RECORD_TOGGLED: 
      return {
        ...state,
        toggledHabitID: action.payload,
      }

    case HABIT_DELETE_DONE: 
      return {
        ...state,
        deletedHabitID: action.payload,
        loading: false,
      }
    
    // prevent when sign in with another account with no habit and see previous account's habits
    case AUTH_LOGOUT_DONE: 
      return {
        ...state,
        habits: [],
        loading: false
      }
    
    case HABIT_ASYNC_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    
    default:
      return state
  }
}