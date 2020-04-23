const requestDecorator = require("./requestDecorator");

module.exports = async function axiosDelete(instance, url, data) {
  let isFetching = true;

  let errorsCount = 0;
  let response;
  while (isFetching) {
    response = await requestDecorator(instance.delete, url, data);
    console.log("---\nDELETE ", url, "\n", response.short, "\n---");

    if (response.full.status === 200 || errorsCount > 10) {
      isFetching = false;
    } else {
      errorsCount++;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  return response;
};
