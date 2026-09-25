import { useState, useEffect } from "react";


export interface TickerData {
    name_en: string,
    price: number,
    change: number,
    change_percent: number,
}

export const usePrices = (tickers: string[]) => {
    const [prices, setPrices] = useState<Record<string, TickerData>>({});
    const [sessionExpired, setSessionExpired] = useState(false);

    const [pricesLoading, setPricesLoading] = useState(true);
    const isInitialLoad = pricesLoading && Object.keys(prices).length === 0;

    const fetchApp = async(link: string): Promise<TickerData> => {
        const response = await fetch(link, {credentials: "include"});
                
        if(!response.ok) {
            const error = new Error(`Error! Status: ${response.status}`) as Error & { status: number };
            error.status = response.status;
            throw error;
        }

        const data = await response.json();

        return data;
    }
    useEffect(() => {
        const loadPrices = async() => {
            setPricesLoading(true);
            const promiseData = tickers.map((t) => fetchApp(`http://localhost:4000/quote/${t}`));
            const tickerData = await Promise.allSettled(promiseData);

            const newPrices: Record<string, TickerData> = {};
            let expired = false;

            tickerData.forEach((result, i) => {
                if(result.status === "fulfilled") {
                    newPrices[tickers[i]] = {
                        name_en: result.value.name_en,
                        price: result.value.price,
                        change: result.value.change,
                        change_percent: result.value.change_percent,
                    };
                }
                if(result.status === "rejected") {
                    const error = result.reason;

                    if (error instanceof Error && "status" in error && error.status === 401) {
                        expired = true;
                    } 

                    else {
                        console.error('Fetch operation failed:', error);
                    }
                }
            })
            setPrices(prev => ({ ...prev, ...newPrices }));
            if (expired) setSessionExpired(true);
            setPricesLoading(false);
        }

        loadPrices();
    }, [tickers])

    return { prices, sessionExpired, pricesLoading, isInitialLoad };
}