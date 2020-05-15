import {
  BuildsState,
  BuildsActionTypes,
  FETCH_BUILDS,
  FETCH_MORE_BUILDS,
  DETAILS_BUILD,
  LOG_BUILD,
  NEW_BUILD_ID,
} from "../../types/store/buildsTypes";
import { AppState } from ".";

const defaultState: BuildsState = {
  data: [],
  details: null,
  log: null,
  newBuildId: null,
};

export default function (
  state = defaultState,
  action: BuildsActionTypes
): BuildsState {
  switch (action.type) {
    case FETCH_BUILDS:
      return {
        ...state,
        data: [...action.payload],
      };
    case FETCH_MORE_BUILDS:
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
    case DETAILS_BUILD:
      return {
        ...state,
        details: {
          ...action.payload,
        },
      };
    case LOG_BUILD:
      return {
        ...state,
        log: action.payload,
      };
    case NEW_BUILD_ID:
      return {
        ...state,
        newBuildId: action.payload,
      };
    default:
      return state;
  }
}

export const getBuildsData = (state: AppState) => state.builds.data;
export const getDetails = (state: AppState) => state.builds.details;
export const getLog = (state: AppState) => state.builds.log;
export const getNewBuildId = (state: AppState) => state.builds.newBuildId;
