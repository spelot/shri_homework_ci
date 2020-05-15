// Describing the shape of the system's slice of state
export interface CommonState {
  isInProgress: boolean;
  isAppLoading: boolean;
  isPopupActive: boolean;
}

// Describing the different ACTION NAMES available
export const TOGGLE_PROGRESS = "TOGGLE_PROGRESS";
export const POPUP = "POPUP";
export const APP_LOADING = "APP_LOADING";

interface ToggleProgressAction {
  type: typeof TOGGLE_PROGRESS;
  payload: CommonState["isInProgress"];
}

interface PopupAction {
  type: typeof POPUP;
  payload: CommonState["isPopupActive"];
}

interface AppLoadingAction {
  type: typeof APP_LOADING;
  payload: CommonState["isAppLoading"];
}

export type CommonActionTypes =
  | ToggleProgressAction
  | PopupAction
  | AppLoadingAction;
