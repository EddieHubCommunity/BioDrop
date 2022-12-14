import Stats from "../../../models/Stats";
import Profile from "../../../models/Profile";
import connectMongo from "../../../config/mongo";

export default async function handler(req, res) {
  await connectMongo();
  let dailyStats = await Stats.find({});

  let views = 0;
  let clicks = 0;
  dailyStats.map((stat) => {
    views += stat.views;
    clicks += stat.clicks;
  });

  const totalProfiles = await Profile.find({}).estimatedDocumentCount();
  const data = {
    views,
    clicks,
    users: totalProfiles || 0,
  };

  res.status(200).json(data);
}
