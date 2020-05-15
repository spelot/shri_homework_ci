import constants from "../../../utils/constants";
import settingsReducer from "../../../store/reducers/settingsReducer";

const defaultState = {
  config: {},
};

describe("settingsReducer Tests", () => {
  describe("FETCH_CONFIG action", () => {
    it("should change state correctly with full config payload", () => {
      const action = {
        type: constants.FETCH_CONFIG,
        payload: {
          repoName: "repoName",
          buildCommand: "buildCommand",
          mainBranch: "mainBranch",
          period: 10,
        },
      };
      const state = settingsReducer(defaultState, action);
      expect(state).toEqual({
        config: {
          repoName: "repoName",
          buildCommand: "buildCommand",
          mainBranch: "mainBranch",
          period: 10,
        },
      });
    });

    it("should change state correctly with payload={}", () => {
      const action = {
        type: constants.FETCH_CONFIG,
        payload: {},
      };
      const state = settingsReducer(defaultState, action);
      expect(state).toEqual({
        config: {},
      });
    });
  });

  describe("SAVE_CONFIG action", () => {
    it("should change state correctly with full config payload", () => {
      const action = {
        type: constants.SAVE_CONFIG,
        payload: {
          repoName: "repoName",
          buildCommand: "buildCommand",
          mainBranch: "mainBranch",
          period: 100,
        },
      };
      const state = settingsReducer(defaultState, action);
      expect(state).toEqual({
        config: {
          repoName: "repoName",
          buildCommand: "buildCommand",
          mainBranch: "mainBranch",
          period: 100,
        },
      });
    });
  });
});
