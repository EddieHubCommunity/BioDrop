import findAllBasic from "../../../services/profiles/findAllBasic";
import hydrateWithStats from "../../../services/profiles/hydrateWithStats";

export default async function handler(req, res) {
  const profiles = findAllBasic();
  const profilesWithStats = await hydrateWithStats(profiles);

  res.status(200).json(profilesWithStats);
}
