import constants from "../../../utils/constants";
import buildsReducer from "../../../store/reducers/buildsReducer";

const defaultState = {
  data: [],
  details: null,
  log: null,
  newBuildId: null,
};

describe("buildsReducer Tests", () => {
  describe("FETCH_BUILDS action", () => {
    it("should change state correctly with some builds in payload", () => {
      const action = {
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
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 2,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 2,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 0,
          },
        ],
      };
      const state = buildsReducer(defaultState, action);
      expect(state).toEqual({
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
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 2,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 2,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 0,
          },
        ],
        details: null,
        log: null,
        newBuildId: null,
      });
    });

    it("should change state correctly with payload=[]", () => {
      const action = {
        type: constants.FETCH_BUILDS,
        payload: [],
      };
      const state = buildsReducer(defaultState, action);
      expect(state).toEqual({
        data: [],
        details: null,
        log: null,
        newBuildId: null,
      });
    });
  });

  describe("FETCH_MORE_BUILDS action", () => {
    it("should change state correctly if all payload builds have buildNumber < than last buildNumber in state", () => {
      const action = {
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
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 2,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 2,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 0,
          },
        ],
      };
      const state = buildsReducer(
        {
          ...defaultState,
          data: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              buildNumber: 6,
              commitMessage: "string",
              commitHash: "string",
              branchName: "string",
              authorName: "string",
              status: "Waiting",
              start: "2020-04-23T22:17:02.065Z",
              duration: 3,
            },
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
              configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              buildNumber: 5,
              commitMessage: "string",
              commitHash: "string",
              branchName: "string",
              authorName: "string",
              status: "Waiting",
              start: "2020-04-23T22:17:02.065Z",
              duration: 2,
            },
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
              configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              buildNumber: 4,
              commitMessage: "string",
              commitHash: "string",
              branchName: "string",
              authorName: "string",
              status: "Waiting",
              start: "2020-04-23T22:17:02.065Z",
              duration: 0,
            },
          ],
        },
        action
      );
      expect(state).toEqual({
        data: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 6,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 5,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 2,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 4,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 0,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 3,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 2,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 2,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 0,
          },
        ],
        details: null,
        log: null,
        newBuildId: null,
      });
    });

    it("should change state correctly if some payload builds have buildNumber >= than last buildNumber in state", () => {
      const action = {
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
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 2,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 2,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 0,
          },
        ],
      };
      const state = buildsReducer(
        {
          ...defaultState,
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
              start: "2020-04-23T22:17:02.065Z",
              duration: 3,
            },
          ],
        },
        action
      );
      expect(state).toEqual({
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
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 2,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 2,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 1,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 0,
          },
        ],
        details: null,
        log: null,
        newBuildId: null,
      });
    });

    it("should change state correctly if all payload builds have buildNumber >= than last buildNumber in state", () => {
      const action = {
        type: constants.FETCH_MORE_BUILDS,
        payload: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 6,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 5,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 2,
          },
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
            configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            buildNumber: 4,
            commitMessage: "string",
            commitHash: "string",
            branchName: "string",
            authorName: "string",
            status: "Waiting",
            start: "2020-04-23T22:17:02.065Z",
            duration: 0,
          },
        ],
      };
      const state = buildsReducer(
        {
          ...defaultState,
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
              start: "2020-04-23T22:17:02.065Z",
              duration: 3,
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
              start: "2020-04-23T22:17:02.065Z",
              duration: 3,
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
              start: "2020-04-23T22:17:02.065Z",
              duration: 3,
            },
          ],
        },
        action
      );
      expect(state).toEqual({
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
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
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
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
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
            start: "2020-04-23T22:17:02.065Z",
            duration: 3,
          },
        ],
        details: null,
        log: null,
        newBuildId: null,
      });
    });
  });

  describe("DETAILS_BUILD action", () => {
    it("should change state correctly with full details payload", () => {
      const action = {
        type: constants.DETAILS_BUILD,
        payload: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
          configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          buildNumber: 1,
          commitMessage: "string",
          commitHash: "string",
          branchName: "string",
          authorName: "string",
          status: "Waiting",
          start: "2020-04-23T22:17:02.065Z",
          duration: 0,
        },
      };
      const state = buildsReducer(defaultState, action);
      expect(state).toEqual({
        data: [],
        details: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
          configurationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          buildNumber: 1,
          commitMessage: "string",
          commitHash: "string",
          branchName: "string",
          authorName: "string",
          status: "Waiting",
          start: "2020-04-23T22:17:02.065Z",
          duration: 0,
        },
        log: null,
        newBuildId: null,
      });
    });
  });

  describe("LOG_BUILD action", () => {
    it("should change state correctly", () => {
      const action = {
        type: constants.LOG_BUILD,
        payload: "some log for build...",
      };
      const state = buildsReducer(defaultState, action);
      expect(state).toEqual({
        data: [],
        details: null,
        log: "some log for build...",
        newBuildId: null,
      });
    });
  });

  describe("NEW_BUILD_ID action", () => {
    it("should change state correctly", () => {
      const action = {
        type: constants.NEW_BUILD_ID,
        payload: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
      };
      const state = buildsReducer(defaultState, action);
      expect(state).toEqual({
        data: [],
        details: null,
        log: null,
        newBuildId: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
      });
    });
  });
});
