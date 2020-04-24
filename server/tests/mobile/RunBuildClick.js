const assert = require("chai").assert;

describe("mobile click 'Run Build' on index page", function () {
  it("should show up the popup with correct header", function () {
    return this.browser
      .url("http://localhost:9999")
      .waitForExist(".BuildList", 2000)
      .click(".Header-Button.Button_icon_before")
      .waitForExist(".Text_type_popupHeader", 2000)
      .getText(".Text_type_popupHeader")
      .then(function (popupHeader) {
        assert.equal(popupHeader, "New build");
      });
  });

  it("should match to screenshot", function () {
    return this.browser
      .url("http://localhost:9999")
      .waitForExist(".BuildList", 2000)
      .click(".Header-Button.Button_icon_before")
      .waitForExist(".Text_type_popupHeader", 2000)
      .assertView("mobile_run_build_popup_index_page", "html", {
        tolerance: 5,
        antialiasingTolerance: 4,
        allowViewportOverflow: true,
        captureElementFromTop: true,
        compositeImage: true,
        screenshotDelay: 10,
      });
  });
});
