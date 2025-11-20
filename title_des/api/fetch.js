export default async function handler(req, res) {
  try {
    const url = req.query.url;

    const response = await fetch(url);
    const html = await response.text();

    // Extract all title tags
    const titleMatches = [...html.matchAll(/<title[^>]*>(.*?)<\/title>/gi)];
    const titles = titleMatches.map(m => m[1].trim());
    const title = titles[0] || "No Title";

    // Extract all meta descriptions
    const descMatches = [
      ...html.matchAll(
        /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/gi
      ),
    ];
    const descriptions = descMatches.map(m => m[1].trim());
    const description = descriptions[0] || "No Description";

    res.status(200).json({
      url,
      title,
      description,
      titleCount: titles.length,
      descCount: descriptions.length,
    });
  } catch (error) {
    res.status(500).json({
      url: req.query.url,
      error: "Failed to fetch",
      title: "ERROR",
      description: "ERROR",
      titleCount: 0,
      descCount: 0
    });
  }
}
