import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import { clientEnv } from "@config/schemas/clientSchema";
import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const username = session.username;
  if (!["GET", "PUT", "PATCH"].includes(req.method)) {
    return res
      .status(400)
      .json({ error: "Invalid request: GET or PUT or PATCH required" });
  }

  let testimonials = {};
  if (req.method === "GET") {
    testimonials = await getTestimonialsApi(username);
  }
  if (req.method === "PUT") {
    testimonials = await updateTestimonialOrderApi(username, req.body);
  }
  if (req.method === "PATCH") {
    testimonials = await updateTestimonialPinnedApi(username, req.body);
  }

  if (testimonials.error) {
    return res.status(404).json({ message: testimonials.error });
  }
  return res.status(200).json(testimonials);
}

export async function getTestimonialsApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getTestimonials = await Profile.aggregate([
    {
      $match: {
        username,
      },
    },
    {
      $unwind: "$testimonials",
    },
    {
      $replaceRoot: {
        newRoot: "$testimonials",
      },
    },
  ]);

  if (!getTestimonials) {
    log.info(`Testimonials not found for username: ${username}`);
    return { error: "Testimonials not found." };
  }

  getTestimonials = getTestimonials.map((testimonial) => ({
    _id: testimonial._id,
    isPinned: testimonial.isPinned,
    username: testimonial.username,
    title: testimonial.title,
    description: testimonial.description,
    date: testimonial.date,
    url: `${clientEnv.NEXT_PUBLIC_BASE_URL}/${testimonial.username}`,
  }));

  return JSON.parse(JSON.stringify(getTestimonials));
}

export async function updateTestimonialPinnedApi(username, data) {
  await connectMongo();
  const log = logger.child({ username });

  try {
    await Profile.findOneAndUpdate(
      {
        username,
        "testimonials._id": data._id,
      },
      {
        $set: {
          source: "database",
          "testimonials.$.isPinned": data.isPinned,
        },
      },
    );
  } catch (e) {
    log.error(e, `failed to update testimonial for username: ${username}`);
  }

  return JSON.parse(JSON.stringify(await getTestimonialsApi(username)));
}

export async function updateTestimonialOrderApi(username, data) {
  await connectMongo();
  const log = logger.child({ username });

  try {
    await Profile.findOneAndUpdate(
      {
        username,
      },
      {
        $set: {
          source: "database",
          testimonials: data,
        },
      },
    );
  } catch (e) {
    log.error(e, `failed to update testimonial for username: ${username}`);
  }

  return JSON.parse(JSON.stringify(await getTestimonialsApi(username)));
}
