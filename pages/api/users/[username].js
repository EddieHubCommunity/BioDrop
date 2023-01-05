import fs from "fs";
import path from "path";

import Profile from "../../../models/Profile";
import Link from "../../../models/Link";
import Stats from "../../../models/Stats";
import connectMongo from "../../../config/mongo";

export default async function handler(req, res) {
  await connectMongo();
  const { username } = req.query;

  const filePath = path.join(process.cwd(), "data", `${username}.json`);

  let data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!data) {
    return res.status(404).json({});
  }

  if (data.testimonials) {
    const filePathTestimonials = path.join(
      process.cwd(),
      "data",
      username,
      "testimonials"
    );
    const testimonials = data.testimonials.flatMap((username) => {
      try {
        const testimonial = {
          ...JSON.parse(
            fs.readFileSync(
              path.join(filePathTestimonials, `${username}.json`),
              "utf8"
            )
          ),
          username,
        };

        return testimonial;
      } catch (e) {
        return [];
      }
    });
    data = { ...data, testimonials };
  }

  const filePathEvents = path.join(process.cwd(), "data", username, "events");
  let eventFiles = [];
  try {
    eventFiles = fs
      .readdirSync(filePathEvents)
      .filter((item) => item.includes("json"));
  } catch (e) {
    console.log(`ERROR loading events "${filePathEvents}"`);
  }
  const events = eventFiles.flatMap((filename) => {
    try {
      const event = {
        ...JSON.parse(
          fs.readFileSync(path.join(filePathEvents, filename), "utf8")
        ),
        username,
      };

      return event;
    } catch (e) {
      return [];
    }
  });
  if (events.length) {
    data = { ...data, events };
  }

  const getProfile = await Profile.findOne({ username });
  if (!getProfile) {
    try {
      await Profile.create({
        username,
        views: 1,
      });
    } catch (e) {
      console.log("ERROR creating profile stats", e);
    }
  }
  if (getProfile) {
    try {
      await Profile.updateOne(
        {
          username,
        },
        {
          $inc: { views: 1 },
        }
      );
    } catch (e) {
      console.log("ERROR incrementing profile stats", e);
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
          $inc: { views: 1 },
        }
      );
    } catch (e) {
      console.log("ERROR incrementing platform stats", e);
    }
  }

  if (!getPlatformStats) {
    try {
      await Stats.create({
        date,
        views: 1,
      });
    } catch (e) {
      console.log("ERROR creating platform stats", e);
    }
  }

  if (!data.displayStatsPublic) {
    return res.status(200).json({ username, ...data });
  }

  const latestProfile = await Profile.findOne({ username });
  const links = await Link.find({ profile: latestProfile._id });

  const profileWithStats = {
    username,
    ...data,
    views: latestProfile.views,
    links: data.links.map((link) => {
      const statFound = links.find((linkStats) => linkStats.url === link.url);
      if (statFound) {
        return {
          ...link,
          clicks: statFound.clicks,
        };
      }

      return link;
    }),
  };

  res.status(200).json(profileWithStats);
}
