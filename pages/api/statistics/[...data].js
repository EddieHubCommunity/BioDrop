import User from "../../../models/User";
import connectMongo from "../../../config/mongo";

export default async function handler(req, res) {
  await connectMongo();
  const { data } = req.query;
  let statusCode = 200;

  const getUser = await User.findOne({ username: data[0] });

  if (req.method === "PUT") {
    if (getUser) {
      try {
        const updateUser = await User.update(
          {
            username: data[0],
          },
          {
            $inc: { views: 1 },
          }
        );
      } catch (e) {
        console.log("ERROR incrementing user profile", e);
      }
    }

    if (!getUser) {
      try {
        const createUser = await User.create({
          username: data[0],
          views: 1,
        });
      } catch (e) {
        console.log("ERROR creating user stats", e);
      }
    }
  }

  // TODO: increment user link click `PUT /api/statistics/[username]/[link url]`
  // TODO: increment totals view
  // TODO: increment totals clicks
  // return status code: 201

  res.status(statusCode).json(getUser);
}
