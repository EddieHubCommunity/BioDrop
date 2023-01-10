import Stats from "../../../models/Stats";
import connectMongo from "../../../config/mongo";

export default async function handler(req, res) {
  await connectMongo();
  const date = new Date();
  date.setHours(1, 0, 0, 0);
  let statsToday = await Stats.findOne({
    date,
  });
  if (!statsToday) {
    statsToday = {
      views: 0,
      clicks: 0,
      users: 0,
    };
  }

  res.status(200).json(statsToday);
}
