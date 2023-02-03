import fs from "fs";
import path from "path";

import logger from "../../config/logger";
import findOneByUsernameBasic from "./findOneByUsernameBasic";

export default function findOneByUsernameFull(username) {
  let log;
  log = logger.child({ username: username });

  let data = findOneByUsernameBasic(username);

  if (!data.username) {
    log.error(`profile loading failed for username: ${username}`);
    return data;
  }

  if (data.testimonials) {
    const filePathTestimonials = path.join(
      process.cwd(),
      "data",
      username,
      "testimonials"
    );
    const testimonials = data.testimonials.flatMap((testimonialUsername) => {
      try {
        const testimonial = {
          ...JSON.parse(
            fs.readFileSync(
              path.join(filePathTestimonials, `${testimonialUsername}.json`),
              "utf8"
            )
          ),
          username: testimonialUsername,
        };

        // check testimonial author for LinkFree profile
        try {
          const filePath = path.join(
            process.cwd(),
            "data",
            `${testimonialUsername}.json`
          );
          JSON.parse(fs.readFileSync(filePath, "utf8"));

          return {
            ...testimonial,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/${testimonialUsername}`,
          };
        } catch (e) {
          log.warn(
            `testimonial ${testimonialUsername} loading failed for username: ${username}`
          );
          return {
            ...testimonial,
            url: `https://github.com/${testimonialUsername}`,
          };
        }
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
    log.error(`loading events for ${username} in ${filePathEvents}`);
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

  return data;
}
