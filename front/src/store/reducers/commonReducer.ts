import { AppState } from ".";
import {
  CommonState,
  CommonActionTypes,
  TOGGLE_PROGRESS,
  APP_LOADING,
  POPUP,
} from "../../types/store/commonTypes";

const defaultState: CommonState = {
  isInProgress: false,
  isAppLoading: true,
  isPopupActive: false,
};

export default function (state = defaultState, action: CommonActionTypes) {
  switch (action.type) {
    case TOGGLE_PROGRESS:
      return {
        ...state,
        isInProgress: action.payload,
      };
    case APP_LOADING:
      return {
        ...state,
        isAppLoading: action.payload,
      };
    case POPUP:
      return {
        ...state,
        isPopupActive: action.payload,
      };
    default:
      return state;
  }
}

export const getIsInProgress = (state: AppState) => state.common.isInProgress;
export const getIsAppLoading = (state: AppState) => state.common.isAppLoading;
export const getIsPopupActive = (state: AppState) => state.common.isPopupActive;
