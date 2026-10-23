export const fetchQuotes = async(tickers) => {
    const joinedTickers = tickers.join(",");
    const response = await fetch(
        `https://api.oanor.com/tadawul-api/v1/quote?codes=${joinedTickers}`,
        { headers: { "x-oanor-key": process.env.OANOR_API_KEY } }
    );

    if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
    }

    const body = await response.json();

    if(!Array.isArray(body.data?.quotes)) {
        throw Error("Wrong Data Type");
    }

    const normalizedTickers = body.data.quotes.reduce((acc, next) => {

        if(next.price === null || next.price === undefined) {
            return acc;
        }

        acc[next.ticker] = { 
            name_en: next.company,
            price: next.price,
            change: Number(Number(next.change).toFixed(2)),
            change_percent: next.change_percent
        };

        return acc;
    }, {});

    return normalizedTickers;
};
