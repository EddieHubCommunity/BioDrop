import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const directoryPath = path.join(process.cwd(), "data");
  const files = fs
    .readdirSync(directoryPath)
    .filter((item) => item.includes("json"));

  const users = files.flatMap((file) => {
    const filePath = path.join(directoryPath, file);
    try {
      return {
        ...JSON.parse(fs.readFileSync(filePath, "utf8")),
        username: file.split(".")[0],
      };
    } catch (e) {
      console.log(`ERROR loading profile "${filePath}"`);
      return [];
    }
  });

  const events = users
    .filter((user) => user.events)
    .map((user) =>
      user.events.map((event) => ({ ...event, author: user.username }))
    )
    .reduce(
      (previousValue, currentValue) => previousValue.concat(currentValue),
      []
    )
    .filter((event) => new Date(event.date.end) > new Date())
    .sort((a, b) => new Date(a.date.start) - new Date(b.date.start));

  res.status(200).json(events);
}
