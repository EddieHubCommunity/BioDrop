import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { username } = req.query;

  const directoryPath = path.join(process.cwd(), "data");
  const files = fs.readdirSync(directoryPath);
  const file = files.find((file) => file === `${username}.json`);

  if (!file) {
    return res.status(404).json({ [username]: "Not found" });
  }

  const data = JSON.parse(
    fs.readFileSync(`${path.join(directoryPath, file)}`, "utf8")
  );

  // TODO: get statistics from DB
  const statistics = {
    username: "eddiejaoude",
    views: 411,
    links: [
      {
        url: "https://github.com/eddiejaoude",
        clicks: 109,
      },
    ],
  };

  // merge links with link stats
  data.links = data.links.map((link) => ({
    ...link,
    ...statistics.links.find((linkStats) => linkStats.url === link.url),
  }));

  // merge profile with profile views
  const profile = {
    username,
    views: statistics.views,
    ...data,
  };

  res.status(200).json(profile);
}
