import fs from "fs";
import path from "path";

import { readAndParseJsonFile, getJsonFilesInDirectory, getNonJsonFilesInDirectory } from "../../utils";

export default async function handler(req, res) {
  const directoryPath = path.join(process.cwd(), "data");
  const userFolders = await getNonJsonFilesInDirectory(directoryPath);

  const events = await Promise.all( userFolders.flatMap(async (folder) => {
    const eventsPath = path.join(directoryPath, folder, "events");
    let eventFiles = [];
    try {
        eventFiles = await getJsonFilesInDirectory(eventsPath);
      } catch (e) {
        console.log(`ERROR no events in "${eventsPath}"`);
        return [];
      }
      const eventFilesContent = Promise.all( eventFiles.flatMap(async (file) => {
          try {
            const filePath = path.join(eventsPath, file);
            const eventData = await readAndParseJsonFile(filePath);
            return {
              ...eventData,
              username: folder,
            };
          } catch (e) {
            console.log(`ERROR loading event "${file}" in "${eventsPath}"`);
            return {};
          }
        })
      );

      return eventFilesContent;
    })
  );

  const eventsFiltered = events
    .reduce(
      (previousValue, currentValue) => previousValue.concat(currentValue),
      []
    )
    .filter((event) => new Date(event.date.end) > new Date())
    .sort((a, b) => new Date(a.date.start) - new Date(b.date.start));

  res.status(200).json(eventsFiltered);
}
