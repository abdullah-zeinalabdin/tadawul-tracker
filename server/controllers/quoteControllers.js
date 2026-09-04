export const quoteByTicker = async(req, res) => {
    const { ticker } = req.params;
    try {
        const response = await fetch(`https://api.sahmk.sa/api/v1/quote/${ticker}/`,
            { headers: { "X-API-Key": process.env.SHMK_API_KEY } }
        )

        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        res.status(200).json(data);
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}