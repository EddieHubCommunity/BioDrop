import { clientEnv } from "@config/schemas/clientSchema";

export async function sendRequest(requestConfig) {
  const url = `${clientEnv.NEXT_PUBLIC_BASE_URL}${requestConfig.url}`;
  try {
    const res = await fetch(url, {
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

export function formatErrorMsg(err) {
  let errorMsg = err;
  if (typeof err === "object") {
    errorMsg = Object.keys(err)
      .map((val) => `${val} is required`)
      .join(", ");
  }
  return errorMsg;
}
