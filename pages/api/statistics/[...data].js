export default function handler(req, res) {
  const { data } = req.query;
  let statusCode = 200;

  // if `PUT`
  // TODO: increment user view `PUT /api/statistics/[username]`
  // TODO: increment user link click `PUT /api/statistics/[username]/[link url]`
  // TODO: increment totals view
  // TODO: increment totals clicks
  // return status code: 201

  // if `GET`
  // TODO: get user statistics `GET /api statistics/[username]

  res.status(statusCode).json({
    username: data[0],
    views: 411,
    links: [
      {
        url: "http://github.com/eddiejaoude",
        clicks: 109,
      },
    ],
  });
}
