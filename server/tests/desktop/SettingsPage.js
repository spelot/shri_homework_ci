const assert = require("chai").assert;

describe("desktop settings page", function () {
  it("should prompted correct repository name in input field", function () {
    return this.browser
      .url("http://localhost:9999/settings")
      .waitForExist("#repository", 2000)
      .getValue("#repository")
      .then(function (value) {
        assert.equal(value, "spelot/test-simple-rep");
      });
  });

  it("should match to screenshot", function () {
    return this.browser
      .url("http://localhost:9999/settings")
      .waitForExist(".Form", 2000)
      .assertView("desktop_settings_page", "html", {
        tolerance: 5,
        antialiasingTolerance: 4,
        allowViewportOverflow: true,
        captureElementFromTop: true,
        compositeImage: true,
        screenshotDelay: 10,
      });
  });
});
