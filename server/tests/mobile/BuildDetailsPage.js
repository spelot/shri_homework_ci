const assert = require("chai").assert;

describe("mobile build details page", function () {
  it("should have correct commit message", function () {
    return this.browser
      .url("http://localhost:9999/build/a8a9a36f-e9ac-4809-a0b4-192d018e926d")
      .waitForExist(".Text_type_commit", 5000)
      .getText(".Text_type_commit")
      .then(function (text) {
        assert.equal(text, "fix readme file + added h2");
      });
  });

  it("should match to screenshot", function () {
    return this.browser
      .url("http://localhost:9999/build/a8a9a36f-e9ac-4809-a0b4-192d018e926d")
      .waitForExist(".Card", 5000)
      .assertView("mobile_build_details_page", "html", {
        tolerance: 5,
        antialiasingTolerance: 4,
        allowViewportOverflow: true,
        captureElementFromTop: true,
        compositeImage: true,
        screenshotDelay: 10,
      });
  });
});
