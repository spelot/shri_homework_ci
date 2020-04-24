import constants from "../../utils/constants";
import history from "../../history";
import { togglePopup, toggleProgress } from "./commonActions";

export const fetchBuilds = (params, errorsCount = 0) => (dispatch) => {
  const requestUrl = new URL(`${constants.SERVER_API}/builds`);
  requestUrl.search = new URLSearchParams(params).toString();
  console.log("fetchBuilds: ", requestUrl);
  return fetch(requestUrl)
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
          type: constants.FETCH_BUILDS,
          payload: data,
        });
      }
    });
};

export const fetchMoreBuilds = (params, errorsCount = 0) => (dispatch) => {
  dispatch(toggleProgress(true));

  const requestUrl = new URL(`${constants.SERVER_API}/builds`);
  requestUrl.search = new URLSearchParams(params).toString();
  console.log("fetchMoreBuilds: ", requestUrl);
  return fetch(requestUrl)
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
          type: constants.FETCH_MORE_BUILDS,
          payload: data,
        });
      }

      dispatch(toggleProgress(false));
    });
};

export const fetchDetails = (
  buildId,
  errorsCount = 0,
  isNeedDispatchInEnd = false
) => (dispatch) => {
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
          type: constants.DETAILS_BUILD,
          payload: data,
        });
      } else {
        return data;
      }
    });
};

export const fetchLog = (
  buildId,
  errorsCount = 0,
  isNeedDispatchInEnd = false
) => (dispatch) => {
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
          type: constants.LOG_BUILD,
          payload: data,
        });
      } else {
        return data;
      }
    });
};

export const fetchBuildDetailsAndLog = (buildId) => async (dispatch) => {
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
    type: constants.LOG_BUILD,
    payload: logData,
  });
  dispatch({
    type: constants.DETAILS_BUILD,
    payload: detailsData,
  });
  dispatch(toggleProgress(false));
};

export const startNewBuild = (commitHash = "", errorsCount = 0) => (
  dispatch
) => {
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
        type: constants.DETAILS_BUILD,
        payload: {},
      });
      dispatch({
        type: constants.NEW_BUILD_ID,
        payload: data.id,
      });
      dispatch(toggleProgress(false));
      dispatch(togglePopup(false));
      // переход на страницу деталей по только что добавленному новому билду
      history.push(`/build/${data.id}`);
    });
};

export const rebuild = (commitHash = "", errorsCount = 0) => (dispatch) => {
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
        type: constants.DETAILS_BUILD,
        payload: {},
      });
      dispatch({
        type: constants.NEW_BUILD_ID,
        payload: data.id,
      });
      dispatch(toggleProgress(false));
      // переход на страницу деталей по только что добавленному новому билду
      history.push(`/build/${data.id}`);
    });
};
