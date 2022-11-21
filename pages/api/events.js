import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const directoryPath = path.join(process.cwd(), "data");
  const files = fs.readdirSync(directoryPath);

  const users = files.map((file) => ({
    ...JSON.parse(fs.readFileSync(path.join(directoryPath, file), "utf8")),
    username: file.split(".")[0],
  }));

  const events = users
    .filter((user) => user.events)
    .map((user) =>
      user.events.map((event) => ({ ...event, author: user.username }))
    )
    .reduce(
      (previousValue, currentValue) => previousValue.concat(currentValue),
      []
    )
    .filter((event) => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  res.status(200).json(events);
}
