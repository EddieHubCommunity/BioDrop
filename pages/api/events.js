import fs from "fs";
import path from "path";

import logger from "../../config/logger";

export default async function handler(req, res) {
  const directoryPath = path.join(process.cwd(), "data");

  let userFolders;
  try {
    userFolders = fs
      .readdirSync(directoryPath)
      .filter((item) => !item.includes("json"));
  } catch (e) {
    logger.error(e, "failed to load profiles");
  }

  const events = userFolders.flatMap((folder) => {
    const eventsPath = path.join(directoryPath, folder, "events");
    let eventFiles = [];
    try {
      eventFiles = fs.readdirSync(eventsPath);
    } catch (e) {
      logger.info(e, `no events in ${eventsPath}`);
      return [];
    }
    const eventFilesContent = eventFiles.flatMap((file) => {
      try {
        return {
          ...JSON.parse(fs.readFileSync(path.join(eventsPath, file), "utf8")),
          username: folder,
        };
      } catch (e) {
        logger.error(e, `failed loading event "${file}" in "${eventsPath}"`);
        return [];
      }
    });

    return eventFilesContent;
  });

  const eventsFiltered = events
    .reduce(
      (previousValue, currentValue) => previousValue.concat(currentValue),
      []
    )
    .filter((event) => new Date(event.date.end) > new Date())
    .sort((a, b) => new Date(a.date.start) - new Date(b.date.start));

  res.status(200).json(eventsFiltered);
}
