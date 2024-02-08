import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "bson";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Link from "@models/Link";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!["GET", "PATCH"].includes(req.method)) {
    return res.status(400).json({ error: "Invalid request: GET required" });
  }

  const username = session.username;

  let data = [];
  if (req.method === "GET") {
    data = await getLinksApi(username);
  }

  if (req.method === "PATCH") {
    data = await updateLinksOrderApi(username, req.body);
  }

  return res.status(200).json(data);
}

export async function getLinksApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getLinks = [];
  try {
    getLinks = await Link.find({ username }).sort({ order: 1 });
  } catch (e) {
    log.error(e, `failed to get links for username: ${username}`);
  }

  return JSON.parse(JSON.stringify(getLinks));
}

export async function updateLinksOrderApi(username, data) {
  await connectMongo();
  const log = logger.child({ username });

  data.map(async (link, idx) => {
    try {
      await Link.findOneAndUpdate(
        {
          username,
          _id: new ObjectId(link._id),
        },
        {
          order: idx,
        },
      );
    } catch (e) {
      log.error(e, `failed to update link order for username: ${username}`);
    }
  });

  return JSON.parse(JSON.stringify(await getLinksApi(username)));
}
