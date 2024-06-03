export default async function handler(req , res ){
    const { waypoints } = req.body;

    if (!waypoints || waypoints.length < 2) {
        return res.status(400).json({ error: 'At least two waypoints are required' });
    }

    try {
        const response = await axios.post(`https://api.geoapify.com/v1/routing`, {
            apiKey: GEOAPIFY_API_KEY,
            mode: 'drive',
            waypoints: waypoints.map(point => ({ location: [point.lon, point.lat] }))
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching route data', details: error.message });
    }
} 