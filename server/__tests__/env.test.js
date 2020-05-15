describe(".env api token tests", () => {
  const apiToken = process.env["API_TOKEN"];

  it("should have not undefined api token", () => {
    expect(apiToken).toBeDefined();
  });

  it("should have not empty string api token", () => {
    expect(apiToken).not.toHaveLength(0);
  });
});
