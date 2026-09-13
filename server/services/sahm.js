export const fetchQuote = async(ticker) => {
    const response = await fetch(
        `https://api.sahmk.sa/api/v1/quote/${ticker}/`,
        { headers: { "X-API-Key": process.env.SHMK_API_KEY } }
    );

    if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
    }

    return response.json();
};

export const fetchMarketSummary = async() => {
    const response = await fetch(
        `https://api.sahmk.sa/api/v1/market/summary/?index=TASI`,
        { headers: { "X-API-Key": process.env.SHMK_API_KEY } }
    );

    if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
    }

    return response.json();
};