import connectMongo from "../../config/mongo";
import logger from "../../config/logger";
import Profile from "../../models/Profile";

export default async function hydrateWithStats(users) {
  await connectMongo();

  let getStats = [];
  try {
    getStats = await Profile.find({
      username: { $in: users.map((user) => user.username) },
    });
  } catch (e) {
    logger.error(e, "failed loading profile stats");
    return users;
  }

  // merge profiles with their profile views if set to public
  const profiles = users.map((user) => {
    const stats = getStats.find((stat) => stat.username === user.username);
    if (stats && user.displayStatsPublic) {
      return {
        ...user,
        views: stats._doc.views,
      };
    }

    return user;
  });

  logger.info(`${profiles.length} profiles merges with their stats`);

  return profiles;
}
