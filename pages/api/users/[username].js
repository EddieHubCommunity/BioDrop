import path from "path";

import Profile from "../../../models/Profile";
import Link from "../../../models/Link";
import Stats from "../../../models/Stats";
import ProfileStats from "../../../models/ProfileStats";
import connectMongo from "../../../config/mongo";
import { readAndParseJsonFile, filterEmptyObjects, getJsonFilesInDirectory } from "../../../utils";

export default async function handler(req, res) {
  await connectMongo();
  const { username } = req.query;

  const filePath = path.join(process.cwd(), "data", `${username}.json`);

  let data = await readAndParseJsonFile(filePath);

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
    const testimonials = await Promise.all( data.testimonials.flatMap( async (username) => {
        const filePath = path.join(filePathTestimonials, `${username}.json`);
        try {
          const userTestimonial = await readAndParseJsonFile(filePath);
          const testimonial = {
            ...userTestimonial,
            username,
          };

          return testimonial;
        } catch (e) {
          return {};
        }
      })
    );
    const filteredTestimonials = filterEmptyObjects(testimonials);
    data = { ...data, testimonials: filteredTestimonials };
  }

  const filePathEvents = path.join(process.cwd(), "data", username, "events");
  let eventFiles = [];
  try {
    eventFiles = await getJsonFilesInDirectory(filePathEvents);
  } catch (e) {
    console.log(`ERROR loading events "${filePathEvents}"`);
  }
  const events = await Promise.all( eventFiles.flatMap(async (filename) => {
      const filePath = path.join(filePathEvents, filename);
      try {
        const userEvent = await readAndParseJsonFile(filePath);
        const event = {
          ...userEvent,
          username,
        };

        return event;
      } catch (e) {
        return {};
      }
    })
  );

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
  const getProfileStats = await ProfileStats.findOne({
    username: username,
    date: date,
  });
  if (getProfileStats) {
    try {
      await ProfileStats.updateOne(
        {
          username: username,
          date,
        },
        {
          $inc: { views: 1 },
        }
      );
    } catch (e) {
      console.log("ERROR incrementing profile stats", e);
    }
  }
  if (!getProfileStats) {
    try {
      await ProfileStats.create({
        username: username,
        date,
        views: 1,
        profile: getProfile._id,
      });
    } catch (e) {
      console.log("ERROR creating profile stats", e);
    }
  }

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
