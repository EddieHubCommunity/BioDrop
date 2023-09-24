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
      `attempt to load profile json but security check failed: "${req.query.secret}"`
    );
    return res.status(401).json({ error: "ONLY system calls allowed" });
  }
  await connectMongo();

  // 1. get all profiles from db that use forms
  const profiles = await Profile.find({ source: "database" });

  // 2. get all testimonials from json files
  profiles.map(async (profile) => {
    const filePathTestimonials = path.join(
      process.cwd(),
      "data",
      profile.username,
      "testimonials"
    );

    // load testimonials
    let newTestimonials = [];
    try {
      newTestimonials = fs
        .readdirSync(filePathTestimonials)
        .flatMap((testimonialFile) => {
          // skip if testimonial from user exists
          const username = testimonialFile.split(".")[0];
          if (
            profile.testimonials.find(
              (testimonial) => testimonial.username === username
            )
          ) {
            return [];
          }

          // return new testimonial only
          return {
            ...JSON.parse(
              fs.readFileSync(
                path.join(filePathTestimonials, testimonialFile),
                "utf8"
              )
            ),
            username,
            isPinned: false,
          };
        });
    } catch (e) {
      //error will happen on user with no (new) testimonials
    }

    // 3. save new testimonials to db in relevant profiles
    newTestimonials.map(async (newTestimonial) => {
      try {
        await Profile.findOneAndUpdate(
          {
            username: profile.username,
          },
          {
            $push: { testimonials: { ...newTestimonial } },
          },
          { upsert: true }
        );
        logger.info(
          `updating testimonial ${newTestimonial.username} for profile ${profile.username}`
        );
      } catch (e) {
        const error = `failed to update testimonial for username: ${profile.username}`;
        logger.error(e, error);
        return { error };
      }
    });

    return res.status(200).json({ profiles: profiles.length });
  });
}
