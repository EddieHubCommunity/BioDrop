import Stats from "../../../models/Stats";
import Profile from "../../../models/Profile";

export default async function handler(req, res) {
  const date = new Date();
  date.setHours(1, 0, 0, 0);
  let statsToday = await Stats.findOne({
    date,
  });
  if (!statsToday) {
    statsToday = {
      views: 0,
      clicks: 0,
    };
  }
  const totalProfiles = await Profile.find({}).estimatedDocumentCount();
  const data = {
    views: statsToday.views,
    clicks: statsToday.clicks,
    users: totalProfiles,
  };

  res.status(200).json(data);
}
