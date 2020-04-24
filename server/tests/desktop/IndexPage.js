const assert = require("chai").assert;

describe("desktop index page", function () {
  it("should print correct repository name", function () {
    return this.browser
      .url("http://localhost:9999")
      .waitForExist(".Text_type_repositoryName", 2000)
      .getText(".Text_type_repositoryName")
      .then(function (repoName) {
        assert.equal(repoName, "spelot/test-simple-rep");
      });
  });

  it("should match to screenshot", function () {
    return this.browser
      .url("http://localhost:9999")
      .waitForExist(".BuildList", 2000)
      .assertView("desktop_index_page", "html", {
        tolerance: 5,
        antialiasingTolerance: 4,
        allowViewportOverflow: true,
        captureElementFromTop: true,
        compositeImage: true,
        screenshotDelay: 10,
      });
  });
});
