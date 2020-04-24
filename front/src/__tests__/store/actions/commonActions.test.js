import constants from "../../../utils/constants";
import {
  toggleProgress,
  togglePopup,
  toggleAppLoading,
} from "../../../store/actions/commonActions";

describe("commonActions Tests", () => {
  describe("toggleProgress action", () => {
    it("should change state correctly with payload=true", () => {
      const action = toggleProgress(true);
      expect(action).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: true,
      });
    });

    it("should change state correctly with payload=false", () => {
      const action = toggleProgress(false);
      expect(action).toEqual({
        type: constants.TOGGLE_PROGRESS,
        payload: false,
      });
    });
  });

  describe("togglePopup action", () => {
    it("should change state correctly with payload=true", () => {
      const action = togglePopup(true);
      expect(action).toEqual({
        type: constants.POPUP,
        payload: true,
      });
    });

    it("should change state correctly with payload=false", () => {
      const action = togglePopup(false);
      expect(action).toEqual({
        type: constants.POPUP,
        payload: false,
      });
    });
  });

  describe("toggleAppLoading action", () => {
    it("should change state correctly with payload=true", () => {
      const action = toggleAppLoading(true);
      expect(action).toEqual({
        type: constants.APP_LOADING,
        payload: true,
      });
    });

    it("should change state correctly with payload=false", () => {
      const action = toggleAppLoading(false);
      expect(action).toEqual({
        type: constants.APP_LOADING,
        payload: false,
      });
    });
  });
});
