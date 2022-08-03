import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const directoryPath = path.join(process.cwd(), "data");
  const files = fs.readdirSync(directoryPath);

  const users = files.map((file) => ({
    ...JSON.parse(fs.readFileSync(path.join(directoryPath, file), "utf8")),
    username: file.split(".")[0],
  }));

  // TODO: get statistics from DB
  const statistics = [
    {
      username: "eddiejaoude",
      views: 411,
      links: [
        {
          url: "https://github.com/eddiejaoude",
          clicks: 109,
        },
      ],
    },
  ];

  // merge profiles with their profile views
  const profiles = users.map((user) => {
    const stats = statistics.find((stat) => stat.username === user.username);
    return {
      ...user,
      views: stats ? stats.views : 0,
    };
  });

  res.status(200).json(profiles);
}
