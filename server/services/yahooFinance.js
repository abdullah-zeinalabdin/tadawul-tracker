import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

const SAUDI_SUFFIX = ".SR";
const TASI_SYMBOL = "^TASI.SR";

export async function fetchQuote(ticker) {
    const symbol = `${ticker}${SAUDI_SUFFIX}`;
    const quote = await yahooFinance.quote(symbol);

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

    return {
        index_value: quote.regularMarketPrice,
        is_delayed: (quote.exchangeDataDelayedBy ?? 0) > 0,
    };
}