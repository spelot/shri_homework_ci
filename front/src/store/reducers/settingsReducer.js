import constants from "../../utils/constants";

const defaultState = {
  config: {},
  dictionary: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case constants.SAVE_CONFIG:
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
    case constants.FETCH_CONFIG:
      return {
        ...state,
        config: { ...action.payload },
      };
    case constants.FETCH_LANGUAGE_DICTIONARY:
      return {
        ...state,
        dictionary: { ...action.payload },
      };
    default:
      return state;
  }
}

export const getSettingsConfig = (state) => state.settings.config;
export const getLanguageDictionary = (state) => state.settings.dictionary;
export const getCurrentLanguge = (state) =>
  state.settings.dictionary.CURRENT_LANG || "en";
