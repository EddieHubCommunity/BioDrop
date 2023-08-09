export async function sendRequest(requestConfig) {
  try {
    const res = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    });
    const data = await res.json();
    if (!res.ok) {
      throw data.message || data.error || res.statusText;
    }
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
