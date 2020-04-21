import constants from "../../utils/constants";

export const toggleProgress = (isInProgress) => ({
  type: constants.TOGGLE_PROGRESS,
  payload: isInProgress,
});

export const toggleAppLoading = (bool) => ({
  type: constants.APP_LOADING,
  payload: bool,
});

export const togglePopup = (bool) => ({
  type: constants.POPUP,
  payload: bool,
});
