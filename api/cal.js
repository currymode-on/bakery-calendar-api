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

    const url = `https://api.cal.com/v2/${endpoint}`

    try {
        const response = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${CAL_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: method === 'GET' ? undefined : JSON.stringify(body)
        })

        const data = await response.json()
        return res.status(response.status).json(data)
    } catch (e) {
        return res.status(500).json({
            error: 'Proxy error',
            details: e.message
        })
    }
}
