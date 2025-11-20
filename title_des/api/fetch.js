export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "URL missing" });

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html"
      }
    });

    const html = await response.text();

    res.status(200).json({ html });

  } catch (error) {
    res.status(500).json({
      error: "Fetch failed",
      message: error.message
    });
  }
}
