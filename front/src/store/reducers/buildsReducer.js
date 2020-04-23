import constants from "../../utils/constants";

const defaultState = {
  data: [],
  details: null,
  log: null,
  newBuildId: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case constants.FETCH_BUILDS:
      return {
        ...state,
        data: [...action.payload],
      };
    case constants.FETCH_MORE_BUILDS:
      const lastBuild = state.data[state.data.length - 1];
      const lastBuildNumber = lastBuild ? lastBuild.buildNumber : -1;

      const correctLastNewBuilds = [];
      for (let i = 0; i < action.payload.length; i++) {
        if (action.payload[i].buildNumber >= lastBuildNumber) continue;

        correctLastNewBuilds.push(action.payload[i]);
      }
      return {
        ...state,
        data: [...state.data, ...correctLastNewBuilds],
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
    case constants.NEW_BUILD_ID:
      return {
        ...state,
        newBuildId: action.payload,
      };
    default:
      return state;
  }
}

export const getBuildsData = (state) => state.builds.data;
export const getDetails = (state) => state.builds.details;
export const getLog = (state) => state.builds.log;
export const getNewBuildId = (state) => state.builds.newBuildId;
