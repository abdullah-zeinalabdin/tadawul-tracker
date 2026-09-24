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
            for(const t of tickers) {
                try {
                    const tickerData = await fetchApp(`http://localhost:4000/quote/${t}`);
                    const specTickerData: TickerData = {
                        name_en: tickerData.name_en,
                        price: tickerData.price,
                        change: tickerData.change,
                        change_percent: tickerData.change_percent
                    }
                    setPrices(prev => ({...prev, [t]: specTickerData}));
                }
                catch(error) {
                    if(error instanceof Error && "status" in error && error.status === 401) {
                        console.error('Session expired, stopping price fetches');
                        setSessionExpired(true);
                        break;
                    }
                    console.error('Fetch operation failed:', error);
                }
            }
        }

        loadPrices();
    }, [tickers])

    return { prices, sessionExpired };
}