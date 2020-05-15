import constants from "../../utils/constants";
import history from "../../history";
import { toggleAppLoading, toggleProgress } from "./commonActions";
import { fetchBuilds } from "./buildsActions";
import {
  SettingsState,
  FETCH_CONFIG,
  SAVE_CONFIG,
} from "../../types/store/settingsTypes";
import { Dispatch } from "redux";

export const saveSettings = (
  config: SettingsState["config"],
  errorsCount = 0
) => (dispatch: Dispatch): Promise<any> => {
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
          type: SAVE_CONFIG,
          payload: config,
        });
      }

      dispatch(toggleProgress(false));
      history.goBack();
    });
};

export const fetchSettings = (errorsCount = 0, isNeedDispatchInEnd = false) => (
  dispatch: Dispatch
): Promise<any> => {
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
          type: FETCH_CONFIG,
          payload: data,
        });
      } else {
        return data;
      }
    });
};

export const fetchSettingsBeforeUsingApp = () => async (
  dispatch: Dispatch
): Promise<any> => {
  const settingsData = await fetchSettings()(dispatch);

  if (settingsData === null) return;

  if (settingsData.repoName) {
    await fetchBuilds({ limit: 10 })(dispatch);
  }

  dispatch({
    type: FETCH_CONFIG,
    payload: settingsData,
  });

  dispatch(toggleAppLoading(false));
};
