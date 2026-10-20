import { useState, useEffect } from "react";


export interface TickerData {
    name_en: string,
    price: number,
    change: number,
    change_percent: number,
}

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
    throw new Error("VITE_API_URL is not set");
}

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

export const usePrices = (tickers: string[]) => {
    const [prices, setPrices] = useState<Record<string, TickerData>>({});
    const [sessionExpired, setSessionExpired] = useState(false);

    const [pricesLoading, setPricesLoading] = useState(true);
    const isInitialLoad = pricesLoading && Object.keys(prices).length === 0;

    useEffect(() => {
        let cancelled = false;
        const loadPrices = async() => {
            setSessionExpired(false);
            if (tickers.length === 0) {
                setPrices({});
                setPricesLoading(false);
                return;
            }
            setPricesLoading(true);
            const promiseData = tickers.map((t) => fetchApp(`${apiUrl}/quote/${t}`));
            const tickerData = await Promise.allSettled(promiseData);

            if (cancelled) return;  

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

        return () => {
            cancelled = true;
        };
    }, [tickers])

    return { prices, sessionExpired, pricesLoading, isInitialLoad };
}