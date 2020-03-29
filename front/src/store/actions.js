import constants from "../utils/constants";

export const saveSettings = ({ repository, command, branch, minutes }) => ({
  type: constants.SAVE_CONFIG,
  payload: {
    repository,
    command,
    branch,
    minutes
  }
});
