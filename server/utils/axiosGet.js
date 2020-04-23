const requestDecorator = require("./requestDecorator");

module.exports = async function axiosGet(
  instance,
  url,
  data,
  isCruitial = false
) {
  let isFetching = true;

  let errorsCount = 0;
  let response;
  while (isFetching) {
    response = await requestDecorator(instance.get, url, data);
    console.log("---\nGET ", url, "\n", response.short, "\n---");

    if (response.full.status === 200 || (errorsCount > 10 && !isCruitial)) {
      isFetching = false;
    } else {
      errorsCount++;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  return response;
};
