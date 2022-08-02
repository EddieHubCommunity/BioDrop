import Link from "../../../models/Link";
import Profile from "../../../models/Profile";
import connectMongo from "../../../config/mongo";

export default async function handler(req, res) {
  await connectMongo();
  const { data } = req.query;
  const username = data[0];
  const url = data[1];

  if (req.method != "PUT" || !username || !url) {
    return res
      .status(400)
      .json({ error: "Invalid request: 'username' and url 'required'" });
  }

  const getProfile = await Profile.findOne({ username });

  if (!getProfile) {
    return res
      .status(404)
      .json({ error: "Invalid request: 'username' not found" });
  }

  const getLink = await Link.findOne({ username, url });
  if (getLink) {
    try {
      await Link.update(
        {
          username,
          url,
        },
        {
          $inc: { clicks: 1 },
        }
      );
    } catch (e) {
      console.log("ERROR incrementing link", e);
    }
  }

  if (!getLink) {
    try {
      const link = await Link.create({
        profile: getProfile._id,
        username,
        url,
        clicks: 1,
      });
      await Profile.update(
        {
          username,
        },
        {
          $push: { links: link._id },
        },
        { new: true, useFindAndModify: false }
      );
    } catch (e) {
      console.log("ERROR creating link", e);
    }
  }

  const latestLink = await Link.findOne({ username, url });
  console.log(latestLink);
  res.status(201).json(latestLink);
}
