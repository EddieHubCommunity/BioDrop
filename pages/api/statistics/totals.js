import Stats from "../../../models/Stats";
import connectMongo from "../../../config/mongo";

export default async function handler(req, res) {
  await connectMongo();
  let dailyStats = await Stats.find({});

  let views = 0;
  let clicks = 0;
  let users = 0;
  dailyStats.forEach((stat) => {
    views += stat.views;
    clicks += stat.clicks;
    users += stat.users;
  });

  const data = {
    views,
    clicks,
    users,
  };

  res.status(200).json(data);
}
