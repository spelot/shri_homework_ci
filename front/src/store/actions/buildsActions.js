import constants from "../../utils/constants";
import history from "../../history";
import { togglePopup, toggleProgress } from "./commonActions";

export const fetchBuilds = (params) => (dispatch) => {
  const requestUrl = new URL(`${constants.SERVER_API}/builds`);
  requestUrl.search = new URLSearchParams(params).toString();
  console.log("fetchBuilds: ", requestUrl);
  return fetch(requestUrl)
    .then((res) => res.json())
    .then(({ data, error }) => {
      if (error) {
        return fetchBuilds(params)(dispatch);
      }

      dispatch({
        type: constants.FETCH_BUILDS,
        payload: data,
      });
    });
};

export const fetchMoreBuilds = (params) => (dispatch) => {
  dispatch(toggleProgress(true));

  const requestUrl = new URL(`${constants.SERVER_API}/builds`);
  requestUrl.search = new URLSearchParams(params).toString();
  console.log("fetchMoreBuilds: ", requestUrl);
  return fetch(requestUrl)
    .then((res) => res.json())
    .then(({ data, error }) => {
      if (error) {
        return fetchMoreBuilds(params)(dispatch);
      }

      dispatch({
        type: constants.FETCH_MORE_BUILDS,
        payload: data,
      });
      dispatch(toggleProgress(false));
    });
};

export const fetchDetails = (buildId) => (dispatch) => {
  console.log("fetchDetails: ", buildId);
  return fetch(`${constants.SERVER_API}/builds/${buildId}`)
    .then((res) => res.json())
    .then(({ data, error }) => {
      if (error) {
        // if wrong buildId passed need to redirect on / page
        history.push("/");
        return;
      }

      dispatch({
        type: constants.DETAILS_BUILD,
        payload: data,
      });
    });
};

export const fetchLog = (buildId) => (dispatch) => {
  console.log("fetchLog: ", buildId);
  return fetch(`${constants.SERVER_API}/builds/${buildId}/logs`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        // if wrong buildId passed need to redirect on / page
        history.push("/");
        return;
      }

      dispatch({
        type: constants.LOG_BUILD,
        payload: data,
      });
    });
};

export const fetchBuildDetailsAndLog = (buildId) => async (dispatch) => {
  await Promise.all([
    fetchDetails(buildId)(dispatch),
    fetchLog(buildId)(dispatch),
  ]);
};

export const startNewBuild = (commitHash = "") => (dispatch) => {
  console.log("add build by commit: ", commitHash);
  dispatch(toggleProgress(true));

  return fetch(`${constants.SERVER_API}/builds/${commitHash}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then(({ data, error }) => {
      dispatch({
        type: constants.DETAILS_BUILD,
        payload: data,
      });
      dispatch(toggleProgress(false));
      dispatch(togglePopup(false));
      // переход на страницу деталей по только что добавленному новому билду
      history.push(`/build/${data.id}`);
    });
};

export const rebuild = (commitHash = "") => (dispatch) => {
  console.log("rebuild build by commit: ", commitHash);
  dispatch(toggleProgress(true));

  fetch(`${constants.SERVER_API}/builds/${commitHash}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then(({ data, error }) => {
      dispatch({
        type: constants.DETAILS_BUILD,
        payload: data,
      });
      dispatch(toggleProgress(false));
      // переход на страницу деталей по только что добавленному новому билду
      history.push(`/build/${data.id}`);
    });
};
