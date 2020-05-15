import constants from "../../../utils/constants";
import {
  fetchBuilds,
  fetchMoreBuilds,
  fetchDetails,
  fetchLog,
  startNewBuild,
  rebuild,
} from "../../../store/actions/buildsActions";
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

describe("buildsActions Tests", () => {
  describe("fetchBuilds action", () => {
    it("should change state correctly if the fetch response was successful", async () => {
      const store = mockStore({
        data: [],
        details: null,
        log: null,
        newBuildId: null,
      });
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              data: [
                {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  buildNumber: 3,
                  commitMessage: "string",
                  commitHash: "string",
                  branchName: "string",
                  authorName: "string",
                  status: "Waiting",
                  start: "2020-04-23T23:21:17.304Z",
                  duration: 0,
                },
                {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  buildNumber: 2,
                  commitMessage: "string",
                  commitHash: "string",
                  branchName: "string",
                  authorName: "string",
                  status: "Waiting",
                  start: "2020-04-23T23:21:17.304Z",
                  duration: 0,
                },
                {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  buildNumber: 1,
                  commitMessage: "string",
                  commitHash: "string",
                  branchName: "string",
                  authorName: "string",
                  status: "Waiting",
                  start: "2020-04-23T23:21:17.304Z",
                  duration: 0,
                },
              ],
            })
          )
        )
      );

      await store.dispatch(fetchBuilds({ limit: 10 }));

      expect(store.getActions()[0]).toEqual({
        type: constants.FETCH_BUILDS,
        payload: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 3,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 2,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
        ],
      });
    });

    it("should change state correctly if the fetch response was not successful", async () => {
      jest.setTimeout(30000);
      const store = mockStore({
        data: [],
        details: null,
        log: null,
        newBuildId: null,
      });
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

      await store.dispatch(fetchBuilds({ limit: 10 }));

      expect(store.getActions()[0]).toEqual(undefined);
    });
  });

  describe("fetchMoreBuilds action", () => {
    it("should change state correctly if the fetch response was successful", async () => {
      const store = mockStore({
        data: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 3,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
        ],
        details: null,
        log: null,
        newBuildId: null,
      });
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              data: [
                {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  buildNumber: 3,
                  commitMessage: "string",
                  commitHash: "string",
                  branchName: "string",
                  authorName: "string",
                  status: "Waiting",
                  start: "2020-04-23T23:21:17.304Z",
                  duration: 0,
                },
                {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  buildNumber: 2,
                  commitMessage: "string",
                  commitHash: "string",
                  branchName: "string",
                  authorName: "string",
                  status: "Waiting",
                  start: "2020-04-23T23:21:17.304Z",
                  duration: 0,
                },
                {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  buildNumber: 1,
                  commitMessage: "string",
                  commitHash: "string",
                  branchName: "string",
                  authorName: "string",
                  status: "Waiting",
                  start: "2020-04-23T23:21:17.304Z",
                  duration: 0,
                },
              ],
            })
          )
        )
      );

      await store.dispatch(fetchMoreBuilds({ limit: 10, offset: 1 }));

      expect(store.getActions()[0]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: true,
      });

      expect(store.getActions()[1]).toEqual({
        type: constants.FETCH_MORE_BUILDS,
        payload: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 3,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 2,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
        ],
      });

      expect(store.getActions()[2]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: false,
      });
    });

    it("should change state correctly if the fetch response was not successful", async () => {
      jest.setTimeout(30000);
      const store = mockStore({
        data: [],
        details: null,
        log: null,
        newBuildId: null,
      });
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

      await store.dispatch(fetchMoreBuilds({ limit: 10, offset: 1 }));

      expect(store.getActions()[0]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: true,
      });

      // max errors = 10
      expect(store.getActions()[10]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: false,
      });
    });
  });

  describe("fetchDetails action", () => {
    it("should change state correctly if the fetch response was successful", async () => {
      const store = mockStore({
        data: [
          {
            id: "1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
        ],
        details: null,
        log: null,
        newBuildId: null,
      });
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              data: {
                id: "1",
                configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                buildNumber: 1,
                commitMessage: "string",
                commitHash: "string",
                branchName: "string",
                authorName: "string",
                status: "Waiting",
                start: "2020-04-23T23:21:17.304Z",
                duration: 0,
              },
            })
          )
        )
      );

      await store.dispatch(fetchDetails(1, 0, true));

      expect(store.getActions()[0]).toEqual({
        type: constants.DETAILS_BUILD,
        payload: {
          id: "1",
          configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          buildNumber: 1,
          commitMessage: "string",
          commitHash: "string",
          branchName: "string",
          authorName: "string",
          status: "Waiting",
          start: "2020-04-23T23:21:17.304Z",
          duration: 0,
        },
      });
    });

    it("should change state correctly if the fetch response was not successful", async () => {
      jest.setTimeout(30000);
      const store = mockStore({
        data: [],
        details: null,
        log: null,
        newBuildId: null,
      });
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

      await store.dispatch(fetchDetails(1, 0, true));

      expect(store.getActions()[0]).toEqual(undefined);
    });
  });

  describe("fetchLog action", () => {
    it("should change state correctly if the fetch response was successful", async () => {
      const store = mockStore({
        data: [
          {
            id: "1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
        ],
        details: null,
        log: null,
        newBuildId: null,
      });
      window.fetch = jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve(
            mockResponse(200, null, JSON.stringify("Some log build here..."))
          )
        );

      await store.dispatch(fetchLog(1, 0, true));

      expect(store.getActions()[0]).toEqual({
        type: constants.LOG_BUILD,
        payload: "Some log build here...",
      });
    });

    it("should change state correctly if the fetch response was not successful", async () => {
      jest.setTimeout(30000);
      const store = mockStore({
        data: [],
        details: null,
        log: null,
        newBuildId: null,
      });
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

      await store.dispatch(fetchLog(1, 0, true));

      expect(store.getActions()[0]).toEqual(undefined);
    });
  });

  describe("startNewBuild action", () => {
    it("should change state correctly if the fetch response was successful", async () => {
      const store = mockStore({
        data: [],
        details: null,
        log: null,
        newBuildId: null,
      });
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              data: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                buildNumber: 0,
                status: "Waiting",
              },
            })
          )
        )
      );

      await store.dispatch(startNewBuild(1));

      expect(store.getActions()[0]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: true,
      });

      expect(store.getActions()[1]).toEqual({
        type: constants.DETAILS_BUILD,
        payload: {},
      });

      expect(store.getActions()[2]).toEqual({
        type: constants.NEW_BUILD_ID,
        payload: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      });

      expect(store.getActions()[3]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: false,
      });

      expect(store.getActions()[4]).toEqual({
        type: constants.POPUP,
        payload: false,
      });
    });

    it("should change state correctly if the fetch response was not successful", async () => {
      jest.setTimeout(30000);
      const store = mockStore({
        data: [],
        details: null,
        log: null,
        newBuildId: null,
      });
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

      await store.dispatch(startNewBuild(1));

      expect(store.getActions()[0]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: true,
      });

      expect(store.getActions()[10]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: false,
      });

      expect(store.getActions()[11]).toEqual({
        type: constants.POPUP,
        payload: false,
      });
    });
  });

  describe("rebuild action", () => {
    it("should change state correctly if the fetch response was successful", async () => {
      const store = mockStore({
        data: [
          {
            id: "1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
        ],
        details: null,
        log: null,
        newBuildId: null,
      });
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              data: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
                buildNumber: 2,
                status: "Waiting",
              },
            })
          )
        )
      );

      await store.dispatch(rebuild(1));

      expect(store.getActions()[0]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: true,
      });

      expect(store.getActions()[1]).toEqual({
        type: constants.DETAILS_BUILD,
        payload: {},
      });

      expect(store.getActions()[2]).toEqual({
        type: constants.NEW_BUILD_ID,
        payload: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
      });

      expect(store.getActions()[3]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: false,
      });
    });

    it("should change state correctly if the fetch response was not successful", async () => {
      jest.setTimeout(30000);
      const store = mockStore({
        data: [
          {
            id: "1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T23:21:17.304Z",
            duration: 0,
          },
        ],
        details: null,
        log: null,
        newBuildId: null,
      });
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

      await store.dispatch(rebuild(1));

      expect(store.getActions()[0]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: true,
      });

      expect(store.getActions()[10]).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: false,
      });
    });
  });
});
