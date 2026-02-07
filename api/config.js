export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    res.status(200).json({
        eventTypeId: process.env.CAL_EVENT_TYPE_ID
            ? Number(process.env.CAL_EVENT_TYPE_ID)
            : null,

        eventTypeSlug: process.env.CAL_EVENT_TYPE_SLUG || null,
        username: process.env.CAL_USERNAME || null,

        defaultDuration: process.env.CAL_DEFAULT_DURATION || null,
        timeZone: "Europe/London",
    });
}