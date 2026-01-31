export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    );

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const CAL_API_KEY = process.env.CAL_API_KEY;
    if (!CAL_API_KEY) {
        return res.status(500).json({ error: "Missing CAL_API_KEY" });
    }

    const { endpoint, apiVersion, ...query } = req.query;
    if (!endpoint) {
        return res.status(400).json({ error: "Missing endpoint param" });
    }

    const url = new URL(`https://api.cal.com/v2${endpoint}`);

    Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
        method: req.method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CAL_API_KEY}`,
            "cal-api-version": apiVersion || "2024-08-13",
        },
        body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
}
