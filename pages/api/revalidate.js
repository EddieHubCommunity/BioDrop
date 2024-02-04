import { serverEnv } from "@config/schemas/serverSchema";

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (
    !req.query.secret ||
    !serverEnv.BIODROP_API_SECRET ||
    req.query.secret !== serverEnv.BIODROP_API_SECRET
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/");
    await res.revalidate("/map");
    await res.revalidate("/search");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.json({ revalidated: false });
  }
}
