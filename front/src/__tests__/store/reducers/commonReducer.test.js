import constants from "../../../utils/constants";
import commonReducer from "../../../store/reducers/commonReducer";

const defaultState = {
  isInProgress: false,
  isAppLoading: true,
  isPopupActive: false,
};

describe("commonReducer Tests", () => {
  describe("TOGGLE_PROGRESS action", () => {
    it("should change state correctly with payload=true", () => {
      const action = {
        type: constants.TOGGLE_PROGRESS,
        payload: true,
      };
      const state = commonReducer(defaultState, action);
      expect(state).toEqual({
        isInProgress: true,
        isAppLoading: true,
        isPopupActive: false,
      });
    });

    it("should change state correctly with payload=false", () => {
      const action = {
        type: constants.TOGGLE_PROGRESS,
        payload: false,
      };
      const state = commonReducer(defaultState, action);
      expect(state).toEqual({
        isInProgress: false,
        isAppLoading: true,
        isPopupActive: false,
      });
    });
  });

  describe("APP_LOADING action", () => {
    it("should change state correctly with payload=true", () => {
      const action = {
        type: constants.APP_LOADING,
        payload: true,
      };
      const state = commonReducer(defaultState, action);
      expect(state).toEqual({
        isInProgress: false,
        isAppLoading: true,
        isPopupActive: false,
      });
    });

    it("should change state correctly with payload=false", () => {
      const action = {
        type: constants.APP_LOADING,
        payload: false,
      };
      const state = commonReducer(defaultState, action);
      expect(state).toEqual({
        isInProgress: false,
        isAppLoading: false,
        isPopupActive: false,
      });
    });
  });

  describe("POPUP action", () => {
    it("should change state correctly with payload=true", () => {
      const action = {
        type: constants.POPUP,
        payload: true,
      };
      const state = commonReducer(defaultState, action);
      expect(state).toEqual({
        isInProgress: false,
        isAppLoading: true,
        isPopupActive: true,
      });
    });

    it("should change state correctly with payload=false", () => {
      const action = {
        type: constants.POPUP,
        payload: false,
      };
      const state = commonReducer(defaultState, action);
      expect(state).toEqual({
        isInProgress: false,
        isAppLoading: true,
        isPopupActive: false,
      });
    });
  });
});
