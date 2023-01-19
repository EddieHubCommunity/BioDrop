import { Octokit } from "octokit";
import logger from "../../config/logger";

export default async function getLocationByUsername(username) {
  const octokit = new Octokit({});
  const github = await octokit.request(`GET /users/${username}`);
  logger.info(`github info fetched for username: ${username}`);

  const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(
    github.data.location
  )}&format=json&limit=1`;

  let location = {};
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
    logger.error(`location info failed for username ${username}`);
    location = {
      provided: github.data.location,
      name: "unknown",
      lat: 0,
      lon: 0,
    };
  }

  logger.info(`location info fetched for username ${username}`);

  return location;
}
