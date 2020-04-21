import constants from "../../utils/constants";

const defaultState = {
  isInProgress: false,
  isAppLoading: true,
  isPopupActive: false,
};

export default function (state = defaultState, action) {
  console.log(action);
  switch (action.type) {
    case constants.TOGGLE_PROGRESS:
      return {
        ...state,
        isInProgress:
          action.payload === undefined
            ? !state.common.isInProgress
            : action.payload,
      };
    case constants.APP_LOADING:
      return {
        ...state,
        isAppLoading: action.payload,
      };
    case constants.POPUP:
      return {
        ...state,
        isPopupActive: action.payload,
      };
    default:
      return state;
  }
}

export const getIsInProgress = (state) => state.common.isInProgress;
export const getIsAppLoading = (state) => state.common.isAppLoading;
export const getIsPopupActive = (state) => state.common.isPopupActive;
