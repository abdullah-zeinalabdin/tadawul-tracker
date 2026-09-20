import { fetchQuote } from "../services/dataProvider.js";

export const quoteByTicker = async(req, res) => {
    const { ticker } = req.params;
    try {
        if(typeof(ticker) !== "string" || ticker.length !== 4) {
            return res.status(400).json({error: "Wrong form of stock's ticker, e.g: 2222"});
        }

        const data = await fetchQuote(ticker);
        res.status(200).json(data);
    }
    catch(error) {
        console.error(error);
        
        if(error.message === "Invalid ticker") {
            return res.status(404).json({error: "Invalid ticker"});
        }

        res.status(500).json({error: "Something went wrong, Please try again!"});
    }
}