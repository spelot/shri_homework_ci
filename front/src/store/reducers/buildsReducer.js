import constants from "../../utils/constants";

const defaultState = {
  data: [],
  details: null,
  log: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case constants.FETCH_BUILDS:
      return {
        ...state,
        data: [...action.payload],
      };
    case constants.FETCH_MORE_BUILDS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    case constants.DETAILS_BUILD:
      return {
        ...state,
        details: {
          ...action.payload,
        },
      };
    case constants.LOG_BUILD:
      return {
        ...state,
        log: action.payload,
      };
    default:
      return state;
  }
}

export const getBuildsData = (state) => state.builds.data;
export const getDetails = (state) => state.builds.details;
export const getLog = (state) => state.builds.log;
