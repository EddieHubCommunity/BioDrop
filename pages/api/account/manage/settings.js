import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import { serverEnv } from "@config/schemas/serverSchema";
import Profile from "@models/Profile";
import logChange from "@models/middlewares/logChange";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
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

async function updateDomain(username, domain = "") {
  await Profile.findOneAndUpdate(
    { username },
    { source: "database", settings: { domain } },
  );
}

async function vercelDomainStatus(username, domain) {
  const log = logger.child({ username });
  let domainRes;
  const domainUrl = `https://api.vercel.com/v10/domains/${domain}/config?teamId=${serverEnv.VERCEL_TEAM_ID}`;
  const domainUrlError = `failed get status for custom domain "${domain}" for username: ${username}`;
  let domainJson;
  try {
    domainRes = await fetch(domainUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${serverEnv.VERCEL_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    domainJson = await domainRes.json();
    log.info(
      domainJson,
      `retrieve domain status for ${domain} for: ${username}`,
    );
  } catch (e) {
    log.error(e, domainUrlError);
    return { error: domainUrlError };
  }

  if (domainJson.error) {
    log.error(domainUrlError);
    return { error: domainUrlError };
  }

  return domainJson;
}

export async function getSettingsApi(username) {
  await connectMongo();
  const log = logger.child({ username });

  let getProfile = await Profile.findOne({ username }, ["settings"]);

  if (!getProfile) {
    log.info(`peofile not found for username: ${username}`);
    return { error: "Profile not found." };
  }

  let data = { ...getProfile.settings };

  if (getProfile.settings?.domain) {
    const vercel = await vercelDomainStatus(
      username,
      getProfile.settings.domain,
    );
    data.vercel = vercel;
  }

  return JSON.parse(JSON.stringify(data));
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

  // check if domain is already used
  if (data.domain && data.domain !== beforeUpdate.domain) {
    const domainCheck = await Profile.findOne({
      "settings.domain": update.domain,
    });
    if (domainCheck) {
      const domainCheckError = `Domain "${data.domain}" is already in use for username: ${username}`;
      log.error(domainCheckError);
      return { error: domainCheckError };
    }
  }

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
    const error = `failed to updated profile premium for username: ${username}`;
    log.error(e, error);
    return { error };
  }
  let result = { ...getProfile.settings };

  beforeUpdate.domain = beforeUpdate.domain.replaceAll("|", "."); // TODO: use getter/setter instead
  if (data.domain !== beforeUpdate.domain) {
    log.info(
      `trying to update profile premium settings domain for username: ${username}`,
    );

    // remove previous custom domain if exists
    if (beforeUpdate.domain) {
      log.info(
        `attempting to remove existing domain "${beforeUpdate.domain}" from the project for: ${username}`,
      );
      let domainRemoveRes;
      const domainRemoveUrl = `https://api.vercel.com/v9/projects/${serverEnv.VERCEL_PROJECT_ID}/domains/${beforeUpdate.domain}?teamId=${serverEnv.VERCEL_TEAM_ID}`;
      try {
        domainRemoveRes = await fetch(domainRemoveUrl, {
          headers: {
            Authorization: `Bearer ${serverEnv.VERCEL_AUTH_TOKEN}`,
          },
          method: "DELETE",
        });
        const domainRemoveJson = await domainRemoveRes.json();
        log.info(
          domainRemoveJson,
          `domain ${beforeUpdate.domain} removed for: ${username}`,
        );
      } catch (e) {
        updateDomain(username, beforeUpdate.domain);
        const error = `failed to remove previous project custom domain for username: ${username}`;
        log.error(e, error);
        return { error };
      }

      log.info(
        `attempting to remove existing domain "${beforeUpdate.domain}" from team for: ${username}`,
      );
      let domainProjectRemoveRes;
      const domainProjectRemoveUrl = `https://api.vercel.com/v6/domains/${beforeUpdate.domain}?teamId=${serverEnv.VERCEL_TEAM_ID}`;
      try {
        domainProjectRemoveRes = await fetch(domainProjectRemoveUrl, {
          headers: {
            Authorization: `Bearer ${serverEnv.VERCEL_AUTH_TOKEN}`,
          },
          method: "DELETE",
        });
        const domainProjectRemoveJson = await domainProjectRemoveRes.json();
        log.info(
          domainProjectRemoveJson,
          `domain ${beforeUpdate.domain} removed for: ${username}`,
        );
      } catch (e) {
        updateDomain(username, beforeUpdate.domain);
        const error = `failed to remove previous team custom domain for username: ${username}`;
        log.error(e, error);
        return { error };
      }
    }

    // add new custom domain
    if (data.domain) {
      log.info(
        `attempting to add domain "${data.domain}" to the project for: ${username}`,
      );
      let domainProjectAddRes;
      const domainProjectAddUrl = `https://api.vercel.com/v10/projects/${serverEnv.VERCEL_PROJECT_ID}/domains?teamId=${serverEnv.VERCEL_TEAM_ID}`;
      const domainProjectAddJsonError = `failed to add new project custom domain "${data.domain}" for username: ${username}`;
      let domainProjectAddJson;
      try {
        domainProjectAddRes = await fetch(domainProjectAddUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${serverEnv.VERCEL_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: data.domain }),
        });
        domainProjectAddJson = await domainProjectAddRes.json();
        if (domainProjectAddJson.error) {
          updateDomain(username, beforeUpdate.domain);
          log.error(domainProjectAddJsonError);
          return { error: domainProjectAddJsonError };
        }
        log.info(
          domainProjectAddJson,
          `domain ${data.domain} added to project for: ${username}`,
        );
      } catch (e) {
        updateDomain(username, beforeUpdate.domain);
        log.error(e, domainProjectAddJsonError);
        return { error: domainProjectAddJsonError };
      }

      if (getProfile.settings?.domain) {
        const vercel = await vercelDomainStatus(
          username,
          getProfile.settings.domain,
        );
        result.vercel = vercel;
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

  return JSON.parse(JSON.stringify(result));
}
