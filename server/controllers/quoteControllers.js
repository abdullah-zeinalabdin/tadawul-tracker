import { fetchQuote } from "../services/sahm.js";

export const quoteByTicker = async(req, res) => {
    const { ticker } = req.params;
    try {
        const data = await fetchQuote(ticker);
        res.status(200).json(data);
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}