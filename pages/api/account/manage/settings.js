import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import Profile from "@models/Profile";
import logChange from "@models/middlewares/logChange";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const username = session.username;
  if (!["GET", "PATCH"].includes(req.method)) {
    return res
      .status(400)
      .json({ error: "Invalid request: GET or PUT required" });
  }

  const context = { req, res };

  let profile = {};
  if (req.method === "GET") {
    profile = await getSettingsApi(username);
  }
  if (req.method === "PATCH") {
    profile = await updateSettingsApi(context, username, req.body);
  }

  if (profile.error) {
    return res.status(400).json({ message: profile.error });
  }
  return res.status(200).json(profile);
}

export async function getSettingsApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getProfile = await Profile.findOne({ username }, ["settings"]);

  if (!getProfile) {
    log.info(`peofile not found for username: ${username}`);
    return { error: "Profile not found." };
  }

  return JSON.parse(JSON.stringify(getProfile.settings));
}

export async function updateSettingsApi(context, username, data) {
  await connectMongo();
  const log = logger.child({ username });

  const beforeUpdate = await getSettingsApi(username);

  let getProfile = {};
  try {
    await Profile.validate({ data }, ["settings"]);
  } catch (e) {
    return { error: e.errors };
  }

  const update = { ...beforeUpdate, ...data };
  update.domain = update.domain.replaceAll(".", "|"); // TODO: use getter/setter instead
  try {
    getProfile = await Profile.findOneAndUpdate(
      { username },
      { source: "database", settings: update },
      {
        upsert: true,
        new: true,
      },
    );
    log.info(`profile premium settings updated for username: ${username}`);
  } catch (e) {
    log.error(e, `failed to updated profile premium for username: ${username}`);
  }

  if (data.domain !== getProfile.settings.domain) {
    log.info(`profile premium settings updated for username: ${username}`);

    // remove previous custom domain if exists
    if (beforeUpdate.domain) {
      log.info(
        `attempting to remove existing domain "${data.domain}" for: ${username}`,
      );
      let domainRemoveRes;
      try {
        domainRemoveRes = await fetch(
          `https://api.vercel.com/v9/projects/${process.env.PROJECT_ID_VERCEL}/domains/${data.domain}${process.env.TEAM_ID_VERCEL}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
            },
            method: "DELETE",
          },
        );
        const domainRemoveJson = domainRemoveRes.json();
        log.info(`domain removed for: ${username}`, domainRemoveJson);
      } catch (e) {
        log.error(
          e,
          `failed to remove previous custom domain for username: ${username}`,
        );
      }
    }

    // add new custom domain
    if (data.domain) {
      log.info(`attempting to add domain "${data.domain}" for: ${username}`);
      let domainAddRes;
      try {
        domainAddRes = await fetch(
          `https://api.vercel.com/v10/projects/${process.env.PROJECT_ID_VERCEL}/domains${process.env.TEAM_ID_VERCEL}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.VERCEL_AUTH_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: data.domain }),
          },
        );
        await domainAddRes.json();
      } catch (e) {
        log.error(
          e,
          `failed to add new custom domain "${data.domain}" for username: ${username}`,
        );
      }
    }
  }

  // Add to Changelog
  try {
    logChange(await getServerSession(context.req, context.res, authOptions), {
      model: "Profile",
      changesBefore: beforeUpdate,
      changesAfter: await getSettingsApi(username),
    });
  } catch (e) {
    log.error(
      e,
      `failed to record Settings changes in changelog for username: ${username}`,
    );
  }

  return JSON.parse(JSON.stringify(getProfile.settings));
}
