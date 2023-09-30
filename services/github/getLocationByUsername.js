import logger from "@config/logger";
import { serverEnv } from "@config/schemas/serverSchema";

export default async function getLocationByUsername(username) {
  let location = {
    provided: "unknown",
    name: "unknown",
    lat: 0,
    lon: 0,
  };

  let github;
  const ghAuth = serverEnv.GITHUB_API_TOKEN
    ? {
        headers: {
          Authorization: `bearer ${serverEnv.GITHUB_API_TOKEN}`,
        },
      }
    : {};
  try {
    const data = await fetch(
      `https://api.github.com/users/${username}`,
      ghAuth,
    );
    github = await data.json();
    logger.info(
      `github info fetched for username: ${username} and received location ${github.location}`,
    );
  } catch (e) {
    logger.error(`location info from github failed for username ${username}`);
    return location;
  }

  if (!github.location || github.location.toLowerCase() === "remote") {
    return location;
  }

  const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(
    github.location,
  )}&format=json&limit=1`;

  try {
    const locationResponse = await fetch(url);
    const data = (await locationResponse.json())[0];
    location = {
      provided: github.location,
      name: data.display_name,
      lat: data.lat,
      lon: data.lon,
    };
  } catch {
    logger.error(
      `location info from open street map failed for username ${username}`,
    );
    return { ...location, provided: github.location };
  }

  logger.info(
    `location info fetched for username ${username} with ${location.provided} and received ${location.name}`,
  );

  return location;
}
