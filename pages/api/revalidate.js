export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (
    !req.query.secret ||
    !process.env.MY_SECRET_TOKEN ||
    req.query.secret !== process.env.MY_SECRET_TOKEN
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.revalidate('/')
    return res.json({ revalidated: true })
  } catch (err) {
    return res.json({ revalidated: false })
  }
}