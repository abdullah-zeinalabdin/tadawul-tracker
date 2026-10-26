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

const fetchPrices = async(tickers: string[]): Promise<Record<string, TickerData>> => {
    const response = await fetch(`${apiUrl}/quote?tickers=${tickers.join(",")}`, { credentials: "include" });

    if(!response.ok) {
        const error = new Error(`Error! Status: ${response.status}`) as Error & { status: number };
        error.status = response.status;
        throw error;
    }

    const data = await response.json();

    return data;
};

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

            let newPrices: Record<string, TickerData> = {};
            let expired = false;

            try {
                newPrices = await fetchPrices(tickers);
            }

            catch(error) {
                if (error instanceof Error && "status" in error && error.status === 401) {
                    expired = true;
                }
                else {
                    console.error('Fetch operation failed:', error);
                }
            }

            if (cancelled) return;  

            if (expired) setSessionExpired(true);
            setPricesLoading(false);
            if (typeof newPrices === 'object' && newPrices !== null) {
                setPrices(prev => ({ ...prev, ...newPrices }));
            }
        }

        loadPrices();

        return () => {
            cancelled = true;
        };
    }, [tickers])

    return { prices, sessionExpired, pricesLoading, isInitialLoad };
}