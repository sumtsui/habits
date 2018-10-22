import * as types from './ActionTypes';

export const onMenuOpen = () => ({
  type: types.NAV_MENU_OPEN
});

export const onMenuClose = () => ({
  type: types.NAV_MENU_CLOSE
});

export const onPromptOpen = () => ({
  type: types.NAV_PROMPT_OPEN
});

export const onPromptClose = () => ({
  type: types.NAV_PROMPT_CLOSE
});