export default async function handler(req, res) {
  const DISCORD_WEBHOOK = "https://meos-api.vercel.app/api/webhook
";

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const data = {
    id: Date.now(),
    time: new Date().toISOString(),
    ...req.body
  };

  global.records = global.records || [];
  global.records.push(data);

  try {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content:
          `📋 **Nieuw MEOS-item**\n\`\`\`json\n${JSON.stringify(
            data,
            null,
            2
          )}\n\`\`\``
      })
    });
  } catch (err) {
    console.error(err);
  }

  res.json({ ok: true });
}
