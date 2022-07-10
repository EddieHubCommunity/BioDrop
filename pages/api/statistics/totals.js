export default function handler(req, res) {
  res.status(200).json({
    users: 1021,
    views: 10342,
    clicks: 12033,
  });
}
