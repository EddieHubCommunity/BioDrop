import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "bson";
import mongoose from "mongoose";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";
import { Milestone } from "@models/Profile/Milestone";
import logChange from "@models/middlewares/logChange";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const username = session.username;

  if (!["GET", "PUT", "DELETE"].includes(req.method)) {
    return res
      .status(400)
      .json({ error: "Invalid request: GET or PUT or DELETE required" });
  }

  const { data } = req.query;
  const context = { req, res };

  let milestone = {};
  if (req.method === "GET") {
    milestone = await getMilestoneApi(username, data[0]);
  }
  if (req.method === "DELETE") {
    milestone = await deleteMilestoneApi(context, username, data[0]);
  }
  if (req.method === "PUT") {
    if (data?.length && data[0]) {
      milestone = await updateMilestoneApi(
        context,
        username,
        data[0],
        req.body,
      );
    } else {
      milestone = await addMilestoneApi(context, username, req.body);
    }
  }

  if (milestone.error) {
    return res.status(404).json({ message: milestone.error });
  }
  return res.status(200).json(milestone);
}

export async function getMilestoneApi(username, id) {
  await connectMongo();
  const log = logger.child({ username });
  const getMilestone = await Profile.aggregate([
    {
      $match: {
        username,
      },
    },
    {
      $unwind: "$milestones",
    },
    {
      $match: {
        "milestones._id": new ObjectId(id),
      },
    },
    {
      $replaceRoot: {
        newRoot: "$milestones",
      },
    },
  ]);

  if (!getMilestone) {
    log.info(`milestone not found for username: ${username}`);
    return { error: "Milestone not found." };
  }

  return JSON.parse(JSON.stringify(getMilestone[0]));
}

export async function updateMilestoneApi(
  context,
  username,
  id,
  updateMilestone,
) {
  await connectMongo();
  const log = logger.child({ username });

  const beforeUpdate = await getMilestoneApi(username, id);

  let getMilestone = {};

  try {
    await Milestone.validate(updateMilestone, [
      "url",
      "date",
      "title",
      "icon",
      "description",
      "dateFormat",
    ]);
  } catch (e) {
    log.error(
      e,
      `validation failed to update milestone for username: ${username}`,
    );
    return { error: e.errors };
  }

  try {
    await Profile.findOneAndUpdate(
      {
        username,
        "milestones._id": new ObjectId(id),
      },
      {
        $set: {
          source: "database",
          "milestones.$": updateMilestone,
        },
      },
      { upsert: true, new: true },
    );
    getMilestone = await getMilestoneApi(username, id);
  } catch (e) {
    const error = `failed to update milestone for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  // Add to Changelog
  try {
    logChange(await getServerSession(context.req, context.res, authOptions), {
      model: "Milestone",
      changesBefore: beforeUpdate,
      changesAfter: await getMilestoneApi(username, id),
    });
  } catch (e) {
    log.error(
      e,
      `failed to record Milestone changes in changelog for username: ${username}`,
    );
  }

  return JSON.parse(JSON.stringify(getMilestone));
}

export async function deleteMilestoneApi(context, username, id) {
  await connectMongo();
  const log = logger.child({ username });

  const beforeDelete = await getMilestoneApi(username, id);

  try {
    await Profile.findOneAndUpdate(
      {
        username,
      },
      {
        $set: {
          source: "database",
        },
        $pull: {
          milestones: {
            _id: new ObjectId(id),
          },
        },
      },
      { upsert: true, new: true },
    );
  } catch (e) {
    const error = `failed to delete milestone for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  // Add to Changelog
  try {
    logChange(await getServerSession(context.req, context.res, authOptions), {
      model: "Milestone",
      changesBefore: beforeDelete,
      changesAfter: null,
    });
  } catch (e) {
    log.error(
      e,
      `failed to record Milestone changes in changelog for username: ${username}`,
    );
  }

  return JSON.parse(JSON.stringify({}));
}

export async function addMilestoneApi(context, username, addMilestone) {
  await connectMongo();
  const log = logger.child({ username });
  let getMilestone = {};

  try {
    await Milestone.validate(addMilestone, [
      "url",
      "date",
      "title",
      "icon",
      "description",
      "dateFormat",
    ]);
  } catch (e) {
    log.error(
      e,
      `validation failed to add milestone for username: ${username}`,
    );
    return { error: e.errors };
  }

  const id = new mongoose.Types.ObjectId();

  try {
    await Profile.findOneAndUpdate(
      {
        username,
      },
      {
        $set: {
          source: "database",
        },
        $push: { milestones: { ...addMilestone, _id: id } },
      },
      { upsert: true, new: true },
    );
    getMilestone = await getMilestoneApi(username, id);
  } catch (e) {
    const error = `failed to add milestone for username: ${username}`;
    log.error(e, error);
    return { error };
  }

  // Add to Changelog
  try {
    logChange(await getServerSession(context.req, context.res, authOptions), {
      model: "Milestone",
      changesBefore: null,
      changesAfter: getMilestone,
    });
  } catch (e) {
    log.error(
      e,
      `failed to record Milestone changes in changelog for username: ${username}`,
    );
  }

  return JSON.parse(JSON.stringify(getMilestone));
}
