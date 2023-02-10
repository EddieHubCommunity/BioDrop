import { Octokit } from "octokit";
import logger from "../../config/logger";

export default async function getLocationByUsername(username) {
  let location = {
    provided: "unknown",
    name: "unknown",
    lat: 0,
    lon: 0,
  };
  const octokit = new Octokit({});
  let github;
  try {
    github = await octokit.request(`GET /users/${username}`);
    logger.info(
      `github info fetched for username: ${username} and received location ${github.data.location}`
    );
  } catch (e) {
    logger.error(`location info from github failed for username ${username}`);
    return location;
  }

  if (!github.data.location || github.data.location.toLowerCase() === 'remote') {
    return location;
  }

  const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(
    github.data.location
  )}&format=json&limit=1`;

  try {
    const locationResponse = await fetch(url);
    const data = (await locationResponse.json())[0];
    location = {
      provided: github.data.location,
      name: data.display_name,
      lat: data.lat,
      lon: data.lon,
    };
  } catch {
    logger.error(
      `location info from open street map failed for username ${username}`
    );
    return { ...location, provided: github.data.location };
  }

  logger.info(
    `location info fetched for username ${username} with ${location.provided} and received ${location.name}`
  );

  return location;
}
