module.exports = async (method, url, data) => {
  let response, full, short;

  try {
    full = await method(url, data);
    short = full.data;
  } catch (error) {
    console.log(error.toJSON());
    if (error.response) {
      if (error.response.status === 401) {
        console.error(
          "--- 401 Unauthorized Error happen, may be need to change apiToken in .env ---"
        );
        process.exit(1);
      } else if (error.response.status === 500) {
        full = error.response;
        short = {
          status: error.response.status,
          error: error.message,
        };
      }
    } else {
      process.exit(1);
    }
  }

  response = {
    full,
    short,
  };
  return response;
};
