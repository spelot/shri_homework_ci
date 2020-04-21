import constants from "../../utils/constants";
import history from "../../history";
import { toggleAppLoading, toggleProgress } from "./commonActions";

export const saveSettings = (config) => (dispatch) => {
  dispatch(toggleProgress(true));

  fetch(`${constants.SERVER_API}/settings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(config),
  })
    .then((res) => res.json())
    .then(async ({ error }) => {
      if (error) {
        return saveSettings(config)(dispatch);
      }

      dispatch({
        type: constants.SAVE_CONFIG,
        payload: config,
      });

      dispatch(toggleProgress(false));
      history.goBack();
    });
};

export const fetchSettings = () => (dispatch) => {
  return fetch(`${constants.SERVER_API}/settings`)
    .then((res) => res.json())
    .then(({ data, error }) => {
      if (error) {
        return fetchSettings()(dispatch);
      }

      dispatch({
        type: constants.FETCH_CONFIG,
        payload: data,
      });
    });
};

export const fetchSettingsBeforeUsingApp = () => async (dispatch) => {
  await fetchSettings()(dispatch);
  dispatch(toggleAppLoading(false));
};
