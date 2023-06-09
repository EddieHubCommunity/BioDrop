import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import { clientEnv } from "@config/schemas/clientSchema";
import logger from "@config/logger";
import Profile from "@models/Profile";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const username = session.username;
  if (!["GET", "PUT"].includes(req.method)) {
    return res
      .status(400)
      .json({ error: "Invalid request: GET or PUT required" });
  }

  let testimonials = {};
  if (req.method === "GET") {
    testimonials = await getTestimonialsApi(username);
  }
  if (req.method === "PUT") {
    testimonials = await updateTestimonialsApi(username, req.body);
  }

  if (testimonials.error) {
    return res.status(404).json({ message: testimonials.error });
  }
  return res.status(200).json(testimonials);
}

export async function getTestimonialsApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getTestimonials = (await Profile.findOne({ username })).testimonials;

  if (!getTestimonials) {
    log.info(`Testimonials not found for username: ${username}`);
    return { error: "Testimonials not found." };
  }

  getTestimonials = getTestimonials
    .map((testimonial) => ({
      _id: testimonial._id,
      isPinned: testimonial.isPinned,
      username: testimonial.username,
      title: testimonial.title,
      description: testimonial.description,
      date: testimonial.date,
      url: `${clientEnv.NEXT_PUBLIC_BASE_URL}/${testimonial.username}`,
      order: testimonial.order,
    }))
    .sort((a, b) => b.isPinned - a.isPinned);

  return JSON.parse(JSON.stringify(getTestimonials));
}

export async function updateTestimonialsApi(username, data) {
  await connectMongo();
  const log = logger.child({ username });

  let getTestimonials = await getTestimonialsApi(username);

  const updatedTestimonials = getTestimonials.map((t) => {
    if (data.includes(t.username)) {
      return { ...t, isPinned: true };
    }

    return { ...t, isPinned: false };
  });

  try {
    getTestimonials = await Profile.findOneAndUpdate(
      { username },
      {
        testimonials: updatedTestimonials,
      },
      { new: true }
    );
  } catch (e) {
    log.error(e, `failed to update testimonials for username: ${username}`);
  }

  return JSON.parse(JSON.stringify(getTestimonials));
}
