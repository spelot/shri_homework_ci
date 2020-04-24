import constants from "../../../utils/constants";
import {
  saveSettings,
  fetchSettings,
} from "../../../store/actions/settingsActions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      "Content-type": "application/json",
    },
  });
};

describe("settingsActions Tests", () => {
  describe("fetchSettings action", () => {
    it("should change state correctly if the fetch response was successful", async () => {
      const store = mockStore({ config: {} });
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              data: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                repoName: "repoName1",
                buildCommand: "buildCommand1",
                mainBranch: "mainBranch1",
                period: 15,
              },
            })
          )
        )
      );

      await store.dispatch(fetchSettings(0, true));

      expect(store.getActions()[0]).toEqual({
        type: constants.FETCH_CONFIG,
        payload: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          repoName: "repoName1",
          buildCommand: "buildCommand1",
          mainBranch: "mainBranch1",
          period: 15,
        },
      });
    });

    it("should change state correctly if the fetch response was not successful", async () => {
      jest.setTimeout(30000);
      const store = mockStore({ config: {} });
      window.fetch = jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve(
            mockResponse(
              500,
              null,
              JSON.stringify({ error: "Something wrong with server error 500" })
            )
          )
        );

      await store.dispatch(fetchSettings(0));

      expect(store.getActions()[0]).toEqual(undefined);
    });
  });

  describe("saveSettings action", () => {
    it("should change state correctly if the fetch response was successful", async () => {
      const store = mockStore({ config: {} });
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              repoName: "repoName1",
              buildCommand: "buildCommand1",
              mainBranch: "mainBranch1",
              period: 15,
            })
          )
        )
      );

      await store.dispatch(
        saveSettings({
          repoName: "repoName1",
          buildCommand: "buildCommand1",
          mainBranch: "mainBranch1",
          period: 15,
        })
      );

      expect(store.getActions()[0]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: true,
      });

      expect(store.getActions()[1]).toEqual({
        type: constants.SAVE_CONFIG,
        payload: {
          repoName: "repoName1",
          buildCommand: "buildCommand1",
          mainBranch: "mainBranch1",
          period: 15,
        },
      });

      expect(store.getActions()[2]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: false,
      });
    });
  });
});
