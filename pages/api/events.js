import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const directoryPath = path.join(process.cwd(), "data");
  const userFolders = fs
    .readdirSync(directoryPath)
    .filter((item) => !item.includes("json"));
  const events = userFolders.flatMap((folder) => {
    const eventsPath = path.join(directoryPath, folder, "events");
    let eventFiles = [];
    try {
      eventFiles = fs.readdirSync(eventsPath);
    } catch (e) {
      console.log(`ERROR no events in "${eventsPath}"`);
      return [];
    }
    const eventFilesContent = eventFiles.flatMap((file) => {
      try {
        return {
          ...JSON.parse(fs.readFileSync(path.join(eventsPath, file), "utf8")),
          username: folder,
        };
      } catch (e) {
        console.log(`ERROR loading event "${file}" in "${eventsPath}"`);
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
