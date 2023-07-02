import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "bson";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { LinkStats, Profile, Link } from "@models/index";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  const username = session.username;
  if (!["GET", "PUT", "POST", "DELETE"].includes(req.method)) {
    return res.status(400).json({
      error: "Invalid request: GET or PUT or POST or DELETE required",
    });
  }

  const { data } = req.query;

  let link = {};
  if (req.method === "GET") {
    link = await getLinkApi(username, data[0]);
  }
  if (req.method === "DELETE") {
    link = await deleteLinkApi(username, data[0]);
  }
  if (req.method === "PUT") {
    link = await updateLinkApi(username, data[0], req.body);
  }
  if (req.method === "POST") {
    link = await addLinkApi(username, req.body);
  }

  if (link.error) {
    return res.status(400).json({ message: link.error });
  }

  return res.status(200).json(link);
}

export async function getLinkApi(username, id) {
  await connectMongo();
  const log = logger.child({ username });

  let getLink = await Link.findOne({ username, _id: id });

  if (!getLink) {
    log.info(`link ${id} not found for username: ${username}`);
    return { error: "Link not found." };
  }

  return JSON.parse(JSON.stringify(getLink));
}

export async function addLinkApi(username, data) {
  await connectMongo();
  const log = logger.child({ username });

  let getLink = {};
  const errors = await Link.validate(data, ["group", "name", "icon", "url"]);
  if (errors) {
    log.error(
      errors,
      `validation failed to add link for username: ${username}`
    );
    return { error: errors.errors };
  }

  try {
    const profile = await Profile.findOne({ username });
    getLink = await Link.create(
      [
        {
          username,
          group: data.group,
          name: data.name,
          url: data.url,
          icon: data.icon,
          isEnabled: data.isEnabled,
          isPinned: data.isPinned,
          profile: new ObjectId(profile._id),
        },
      ],
      { new: true }
    );

    log.info(`link ${data.url} created for username: ${username}`);

    await Profile.findOneAndUpdate(
      { username },
      {
        $set: { source: "database" },
        $push: { links: new ObjectId(getLink[0]._id) },
      },
      { upsert: true }
    );
  } catch (e) {
    log.error(e, `failed to add link ${data.url} for username: ${username}`);
    return { error: e.errors };
  }
  getLink = await getLinkApi(username, getLink[0]._id);

  return JSON.parse(JSON.stringify(getLink));
}

export async function updateLinkApi(username, id, data) {
  await connectMongo();
  const log = logger.child({ username });

  let getLink = {};

  const errors = await Link.validate(data, ["group", "name", "icon", "url"]);
  if (errors) {
    log.error(
      errors,
      `validation failed to update link for username: ${username}`
    );
    return { error: errors.errors };
  }

  try {
    getLink = await Link.findOneAndUpdate(
      {
        _id: id,
        username,
      },
      {
        group: data.group,
        name: data.name,
        url: data.url,
        icon: data.icon,
        isEnabled: data.isEnabled,
        isPinned: data.isPinned,
      },
      { upsert: true }
    );

    await Profile.findOneAndUpdate(
      { username },
      {
        $set: { source: "database" },
      },
      { upsert: true }
    );
    log.info(`link ${data.url} updated for username: ${username}`);
  } catch (e) {
    log.error(e, `failed to update link ${data.url} for username: ${username}`);
    return { error: e.errors };
  }

  return JSON.parse(JSON.stringify(getLink));
}

export async function deleteLinkApi(username, id) {
  await connectMongo();
  const log = logger.child({ username });

  let getLink = await getLinkApi(username, id);

  if (getLink.error) {
    return getLink;
  }

  // delete linkstats
  try {
    await LinkStats.deleteMany({ link: new ObjectId(id) });
  } catch (e) {
    log.error(
      e,
      `failed to delete link stats for username ${username} and url ${getLink.url}`
    );
    return { error: e.errors };
  }

  // delete link from profile
  try {
    await Profile.findOneAndUpdate(
      {
        username,
      },
      {
        $pull: {
          links: { $in: id },
        },
      },
      { new: true }
    );
  } catch (e) {
    const error = `failed to delete link from profile for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  // delete link
  try {
    await Link.deleteOne({ _id: new ObjectId(id) });
  } catch (e) {
    const error = `failed to delete link from profile for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  return JSON.parse(JSON.stringify({}));
}
