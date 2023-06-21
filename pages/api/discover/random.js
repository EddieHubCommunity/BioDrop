// pages/api/discover/random.js

import connectMongo from "@config/mongo";
import Profile from "@models/Profile";
import logger from "@config/logger"; // Import the logger

export default async function handler(req, res) {
  if (req.method != 'GET') {
    return res.status(400).json({ error: 'Invalid request: GET request required' });
  }

  try {
    // Connect to MongoDB using Mongoose
    await connectMongo();

    // Use the $sample aggregation stage to get a random profile
    const randomProfileArray = await Profile.aggregate([{ $sample: { size: 1 } }]).exec();

    // Get the first (and only) element from the randomProfileArray
    const randomProfile = randomProfileArray[0];
    // console.log(randomProfile);

    res.status(200).json(randomProfile);
  } catch (error) {
    logger.error(error, "Error fetching user profiles"); // Use the logger to log the error
    res.status(500).json({ error: "Failed to fetch user profiles" });
  }
}

