import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({
    suppressNotices: ["yahooSurvey"],
    fetchOptions: {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
        }
    }
});

const SAUDI_SUFFIX = ".SR";
const TASI_SYMBOL = "^TASI.SR";

export async function fetchQuote(ticker) {
    const symbol = `${ticker}${SAUDI_SUFFIX}`;
    const quote = await yahooFinance.quote(symbol);

    if(!quote) {
        throw new Error("Invalid ticker");
    }

    return {
        symbol: ticker,
        name_en: quote.longName ?? quote.shortName ?? ticker,
        price: quote.regularMarketPrice,
        change: quote.regularMarketChange,
        change_percent: quote.regularMarketChangePercent,
    };
}

export async function fetchMarketSummary() {
    const quote = await yahooFinance.quote(TASI_SYMBOL);

    if (!quote) {
        throw new Error("Failed to fetch market summary");
    }
    
    return {
        index_value: quote.regularMarketPrice,
        is_delayed: (quote.exchangeDataDelayedBy ?? 0) > 0,
    };
}