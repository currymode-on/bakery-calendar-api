export default async function handler(req, res) {
    const { method, query, body } = req

    const CAL_API_KEY = process.env.CAL_API_KEY

    if (!CAL_API_KEY) {
        return res.status(500).json({ error: 'Missing CAL_API_KEY' })
    }

    const endpoint = query.endpoint
    if (!endpoint) {
        return res.status(400).json({ error: 'Missing endpoint param' })
    }

    const url = `https://api.cal.com/v1/${endpoint}`

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${CAL_API_KEY}`,
            },
            body: method !== 'GET' ? JSON.stringify(body) : undefined,
        })

        const data = await response.json()
        console.log(data);
        res.status(response.status).json(data)
    } catch (e) {
        res.status(500).json({ error: 'Proxy error', details: e.message })
    }
}
