import findAllBasic from "../../../services/profiles/findAllBasic";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res
      .status(400)
      .json({ error: "Invalid request: GET request required" });
  }

  const profiles = findAllBasic();

  res.status(200).json(profiles);
}
