import constants from "../../utils/constants";
import history from "../../history";
import { toggleAppLoading, toggleProgress } from "./commonActions";
import { fetchBuilds } from "./buildsActions";

export const saveSettings = (config, errorsCount = 0) => (dispatch) => {
  dispatch(toggleProgress(true));

  return fetch(`${constants.SERVER_API}/settings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(config),
  })
    .then((res) => res.json())
    .then(async ({ error }) => {
      if (error) {
        errorsCount++;
        if (errorsCount < 10) {
          await new Promise((r) => setTimeout(r, 1000));
          return saveSettings(config, errorsCount)(dispatch);
        }
      } else {
        dispatch({
          type: constants.SAVE_CONFIG,
          payload: config,
        });
      }

      dispatch(toggleProgress(false));
      history.goBack();
    });
};

export const fetchSettings = (errorsCount = 0, isNeedDispatchInEnd = false) => (
  dispatch
) => {
  console.log("fetchSettings");
  return fetch(`${constants.SERVER_API}/settings`)
    .then((res) => res.json())
    .then(async ({ data, error }) => {
      if (error) {
        errorsCount++;
        if (errorsCount < 10) {
          await new Promise((r) => setTimeout(r, 1000));
          return fetchSettings(errorsCount, isNeedDispatchInEnd)(dispatch);
        }
        return null;
      }

      if (isNeedDispatchInEnd) {
        dispatch({
          type: constants.FETCH_CONFIG,
          payload: data,
        });
      } else {
        return data;
      }
    });
};

export const fetchSettingsBeforeUsingApp = () => async (dispatch) => {
  const settingsData = await fetchSettings()(dispatch);

  if (settingsData === null) {
    history.go();
    return;
  }

  if (settingsData.repoName) {
    await fetchBuilds({ limit: 10 })(dispatch);
  }

  dispatch({
    type: constants.FETCH_CONFIG,
    payload: settingsData,
  });

  dispatch(toggleAppLoading(false));
};
