import constants from "../utils/constants";

const defaultState = {
  config: null
};

export const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SAVE_CONFIG:
      const { repository, command, branch, minutes } = action.payload;
      return {
        ...state,
        config: {
          repository,
          command,
          branch,
          minutes
        }
      };
    default:
      return state;
  }
};
