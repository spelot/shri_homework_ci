import { AppState } from ".";
import {
  SettingsState,
  SettingsActionTypes,
  SAVE_CONFIG,
  FETCH_CONFIG,
} from "../../types/store/settingsTypes";

const defaultState: SettingsState = {
  config: {},
};

export default function (state = defaultState, action: SettingsActionTypes) {
  switch (action.type) {
    case SAVE_CONFIG:
      const { repoName, buildCommand, mainBranch, period } = action.payload;
      return {
        ...state,
        config: {
          repoName,
          buildCommand,
          mainBranch,
          period,
        },
      };
    case FETCH_CONFIG:
      return {
        ...state,
        config: { ...action.payload },
      };
    default:
      return state;
  }
}

export const getSettingsConfig = (state: AppState) => state.settings.config;
export const getRepositoryName = (state: AppState) =>
  state.settings.config.repoName ? state.settings.config.repoName : "";
export const getBuildCommand = (state: AppState) =>
  state.settings.config.buildCommand ? state.settings.config.buildCommand : "";
export const getMainBranch = (state: AppState) =>
  state.settings.config.mainBranch ? state.settings.config.mainBranch : "";
export const getPeriod = (state: AppState) =>
  state.settings.config.period ? state.settings.config.period : "10";
