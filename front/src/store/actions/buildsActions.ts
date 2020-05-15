import constants from "../../utils/constants";
import history from "../../history";
import { togglePopup, toggleProgress } from "./commonActions";
import {
  DETAILS_BUILD,
  FETCH_MORE_BUILDS,
  FETCH_BUILDS,
  LOG_BUILD,
  NEW_BUILD_ID,
} from "../../types/store/buildsTypes";
import {
  BuildModel,
  BuildModelArrayHomeworkApiRequest,
} from "../../../../server/typings/api";
import { Dispatch, Action } from "redux";

export const fetchBuilds = (
  params: BuildModelArrayHomeworkApiRequest,
  errorsCount = 0
) => (dispatch: Dispatch): Action | Promise<any> => {
  const requestUrl = new URL(`${constants.SERVER_API}/builds`);
  requestUrl.search = new URLSearchParams(params as string[][]).toString();
  console.log("fetchBuilds: ", requestUrl);
  return fetch((requestUrl as unknown) as string)
    .then((res) => res.json())
    .then(async ({ data, error }) => {
      if (error) {
        errorsCount++;
        if (errorsCount < 10) {
          await new Promise((r) => setTimeout(r, 1000));
          return fetchBuilds(params, errorsCount)(dispatch);
        }
      } else {
        dispatch({
          type: FETCH_BUILDS,
          payload: data,
        });
      }
    });
};

export const fetchMoreBuilds = (
  params: BuildModelArrayHomeworkApiRequest,
  errorsCount = 0
) => (dispatch: Dispatch): Action | Promise<any> => {
  dispatch(toggleProgress(true));

  const requestUrl = new URL(`${constants.SERVER_API}/builds`);
  requestUrl.search = new URLSearchParams(params as string[][]).toString();
  console.log("fetchMoreBuilds: ", requestUrl);
  return fetch((requestUrl as unknown) as string)
    .then((res) => res.json())
    .then(async ({ data, error }) => {
      if (error) {
        errorsCount++;
        if (errorsCount < 10) {
          await new Promise((r) => setTimeout(r, 1000));
          return fetchMoreBuilds(params, errorsCount)(dispatch);
        }
      } else {
        dispatch({
          type: FETCH_MORE_BUILDS,
          payload: data,
        });
      }

      dispatch(toggleProgress(false));
    });
};

export const fetchDetails = (
  buildId: BuildModel["id"],
  errorsCount = 0,
  isNeedDispatchInEnd = false
) => (dispatch: Dispatch): Action | Promise<any> => {
  console.log("fetchDetails: ", buildId);
  return fetch(`${constants.SERVER_API}/builds/${buildId}`)
    .then((res) => res.json())
    .then(async ({ data, error }) => {
      if (error) {
        errorsCount++;
        if (errorsCount < 10) {
          await new Promise((r) => setTimeout(r, 1000));
          return fetchDetails(
            buildId,
            errorsCount,
            isNeedDispatchInEnd
          )(dispatch);
        }

        if (isNeedDispatchInEnd) {
          // if wrong buildId passed need to redirect on / page
          history.push("/");
        }

        return null;
      }

      if (isNeedDispatchInEnd) {
        dispatch({
          type: DETAILS_BUILD,
          payload: data,
        });
      } else {
        return data;
      }
    });
};

export const fetchLog = (
  buildId: BuildModel["id"],
  errorsCount = 0,
  isNeedDispatchInEnd = false
) => (dispatch: Dispatch): Action | Promise<any> => {
  console.log("fetchLog: ", buildId);
  return fetch(`${constants.SERVER_API}/builds/${buildId}/logs`)
    .then((res) => res.json())
    .then(async (data) => {
      if (data.error) {
        errorsCount++;
        if (errorsCount < 10) {
          await new Promise((r) => setTimeout(r, 1000));
          return fetchLog(buildId, errorsCount, isNeedDispatchInEnd)(dispatch);
        }

        if (isNeedDispatchInEnd) {
          // if wrong buildId passed need to redirect on / page
          history.push("/");
        }

        return null;
      }

      if (isNeedDispatchInEnd) {
        dispatch({
          type: LOG_BUILD,
          payload: data,
        });
      } else {
        return data;
      }
    });
};

export const fetchBuildDetailsAndLog = (buildId: BuildModel["id"]) => async (
  dispatch: Dispatch
): Promise<any> => {
  dispatch(toggleProgress(true));

  const [detailsData, logData] = await Promise.all([
    fetchDetails(buildId)(dispatch),
    fetchLog(buildId)(dispatch),
  ]);

  if (logData === null || detailsData === null) {
    dispatch(toggleProgress(false));
    // if wrong buildId passed need to redirect on / page
    history.push("/");
    return null;
  }

  dispatch({
    type: LOG_BUILD,
    payload: logData,
  });
  dispatch({
    type: DETAILS_BUILD,
    payload: detailsData,
  });
  dispatch(toggleProgress(false));
};

export const startNewBuild = (commitHash = "", errorsCount = 0) => (
  dispatch: Dispatch
): Action | Promise<any> => {
  console.log("try to add build by commit: ", commitHash);
  dispatch(toggleProgress(true));

  return fetch(`${constants.SERVER_API}/builds/${commitHash}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then(async ({ data, error }) => {
      if (error) {
        errorsCount++;
        if (errorsCount < 10) {
          await new Promise((r) => setTimeout(r, 1000));
          return startNewBuild(commitHash, errorsCount)(dispatch);
        }

        dispatch(toggleProgress(false));
        dispatch(togglePopup(false));
        return null;
      }

      dispatch({
        type: DETAILS_BUILD,
        payload: {},
      });
      dispatch({
        type: NEW_BUILD_ID,
        payload: data.id,
      });
      dispatch(toggleProgress(false));
      dispatch(togglePopup(false));
      // переход на страницу деталей по только что добавленному новому билду
      history.push(`/build/${data.id}`);
    });
};

export const rebuild = (commitHash = "", errorsCount = 0) => (
  dispatch: Dispatch
): Action | Promise<any> => {
  console.log("try to rebuild build by commit: ", commitHash);
  dispatch(toggleProgress(true));

  return fetch(`${constants.SERVER_API}/builds/${commitHash}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then(async ({ data, error }) => {
      if (error) {
        errorsCount++;
        if (errorsCount < 10) {
          await new Promise((r) => setTimeout(r, 1000));
          return rebuild(commitHash, errorsCount)(dispatch);
        }

        dispatch(toggleProgress(false));
        return null;
      }

      dispatch({
        type: DETAILS_BUILD,
        payload: {},
      });
      dispatch({
        type: NEW_BUILD_ID,
        payload: data.id,
      });
      dispatch(toggleProgress(false));
      // переход на страницу деталей по только что добавленному новому билду
      history.push(`/build/${data.id}`);
    });
};
