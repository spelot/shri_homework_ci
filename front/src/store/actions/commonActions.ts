import {
  CommonState,
  TOGGLE_PROGRESS,
  APP_LOADING,
  POPUP,
} from "../../types/store/commonTypes";

export const toggleProgress = (isInProgress: CommonState["isInProgress"]) => ({
  type: TOGGLE_PROGRESS,
  payload: isInProgress,
});

export const toggleAppLoading = (
  isAppLoading: CommonState["isAppLoading"]
) => ({
  type: APP_LOADING,
  payload: isAppLoading,
});

export const togglePopup = (isPopupActive: CommonState["isPopupActive"]) => ({
  type: POPUP,
  payload: isPopupActive,
});
