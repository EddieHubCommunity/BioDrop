// pages/api/randomProfile.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method != 'GET') {
    return res.status(400).json({ error: 'Invalid request: GET request required' });
  }

  try {
    await client.connect();
    const database = client.db('linkfree');

    // Use the "profiles" collection
    const collection = database.collection('profiles');
    const userProfiles = await collection.find({}).toArray();

    // Select a random profile from the userProfiles array
    const randomProfile = userProfiles[Math.floor(Math.random() * userProfiles.length)];

    res.status(200).json(randomProfile);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch user profiles' });
  } finally {
    await client.close();
  }
}

