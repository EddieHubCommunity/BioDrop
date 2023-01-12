import Link from "../../../models/Link";
import Profile from "../../../models/Profile";
import Stats from "../../../models/Stats";
import connectMongo from "../../../config/mongo";

/**
 * @type {import('next').NextApiHandler}
 */
export default async function handler(req, res) {
  await connectMongo();

  const { username, url } = req.query;

  if (req.method != "GET" || !username || !url) {
    return res
      .status(400)
      .json({ error: "Invalid request: username and link required" });
  }

  let getProfile = await Profile.findOne({ username });

  if (!getProfile) {
    try {
      await Profile.create({
        username,
        views: 1,
      });

      getProfile = await Profile.findOne({ username });
    } catch (e) {
      const err = `ERROR creating profile: ${e}`;
      console.log(err);
      return res.status(500).json({ message: err });
    }
  }

  const getLink = await Link.findOne({ username, url });

  if (getLink) {
    try {
      await Link.updateOne(
        {
          username,
          url,
        },
        {
          $inc: { clicks: 1 },
        }
      );
    } catch (e) {
      const err = `ERROR incrementing link stats: ${e}`;
      console.log(err);
      return res.res(500).json({ message: err });
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

      await Profile.updateOne(
        {
          username,
        },
        {
          $push: { links: link._id },
        },
        { new: true, useFindAndModify: false }
      );
    } catch (e) {
      const err = `ERROR creating link: ${e}`;
      console.log(err);
      return res.res(500).json({ message: err });
    }
  }

  const date = new Date();

  date.setHours(1, 0, 0, 0);

  const getPlatformStats = await Stats.findOne({ date });

  if (getPlatformStats) {
    try {
      await Stats.updateOne(
        {
          date,
        },
        {
          $inc: { clicks: 1 },
        }
      );
    } catch (e) {
      const err = `ERROR incrementing platform stats: ${e}`;
      console.log(err);
      return res.res(500).json({ message: err });
    }
  }

  if (!getPlatformStats) {
    try {
      await Stats.create({
        date,
        clicks: 1,
      });
    } catch (e) {
      const err = `ERROR incrementing platform stats: ${e}`;
      console.log(err);
      return res.res(500).json({ message: err });
    }
  }

  return res.status(201).redirect(decodeURIComponent(url));
}
