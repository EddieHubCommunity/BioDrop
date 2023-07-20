export async function sendRequest(requestConfig) {
  try {
    const res = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : "GET",
      headers: requestConfig.headers ? requestConfig.headers : {},
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    });
    const data = await res.json();
    if (!res.ok) {
      let errMessage = res.statusText;
      if (data.message) {
        if (typeof data.message === "string") errMessage = data.message;
        else {
          errMessage = Object.keys(data.message)
            .map((val) => `${val} is required`)
            .join(", ");
        }
      }
      if (data.error) {
        errMessage = data.error;
      }

      throw new Error(`Request failed! ${errMessage}.`);
    }
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
