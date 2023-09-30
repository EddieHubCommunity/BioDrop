import fs from "fs";
import path from "path";

import { serverEnv } from "@config/schemas/serverSchema";
import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  if (
    req.method !== "GET" ||
    req.query.secret !== serverEnv.BIODROP_API_SECRET
  ) {
    logger.error(
      `attempt to load profile json but security check failed: "${req.query.secret}"`,
    );
    return res.status(401).json({ error: "ONLY system calls allowed" });
  }
  await connectMongo();
  let totalNewTestimonials = 0;
  let newTestimonialsByProfile = [];

  // 1. get all profiles from db that use forms
  const profiles = await Profile.find({ source: "database" });
  logger.info(
    `"${profiles.length}" profiles loaded from DB to check for new testimonials`,
  );

  // 2. get all testimonials from json files
  profiles.map(async (profile) => {
    const filePathTestimonials = path.join(
      process.cwd(),
      "data",
      profile.username,
      "testimonials",
    );

    // load testimonials
    let newTestimonials = [];
    try {
      newTestimonials = fs
        .readdirSync(filePathTestimonials)
        .flatMap((testimonialFile) => {
          // skip if testimonial from user exists
          const username = testimonialFile.split(".")[0];
          if (profile.testimonials.find((t) => t.username === username)) {
            return [];
          }

          logger.info(
            `new testimonial "${username}" for "${profile.username}" found`,
          );

          // return new testimonial only
          return {
            ...JSON.parse(
              fs.readFileSync(
                path.join(filePathTestimonials, testimonialFile),
                "utf8",
              ),
            ),
            username,
            isPinned: false,
          };
        });
    } catch (e) {
      // error will happen on user with no testimonials folder
      logger.error(
        e,
        `no testimonials for "${profile.username}" found "${filePathTestimonials}"`,
      );
    }

    logger.info(
      `found "${newTestimonials.length}" new testimonials for "${profile.username}"`,
    );

    if (newTestimonials.length === 0) {
      return;
    }

    totalNewTestimonials += newTestimonials.length;
    newTestimonialsByProfile.push({
      [profile.username]: newTestimonials.length,
    });

    // 3. save new testimonials to db in relevant profiles
    await Promise.all(
      newTestimonials.map(async (newTestimonial) => {
        try {
          await Profile.findOneAndUpdate(
            {
              username: profile.username,
            },
            {
              $push: { testimonials: { ...newTestimonial } },
            },
            { upsert: true },
          );
          logger.info(
            `added testimonial by "${newTestimonial.username}" for profile "${profile.username}"`,
          );
        } catch (e) {
          logger.error(
            e,
            `failed to update testimonial for username "${profile.username}"`,
          );
        }
      }),
    );
  });

  return res.status(200).json({
    profiles: profiles.length,
    totalNewTestimonials,
    newTestimonialsByProfile,
  });
}
