import { useState, useEffect } from "react";


export interface TickerData {
    name_en: string,
    price: number,
    change: number,
    change_percent: number,
}

export const usePrices = (tickers: string[]) => {
    const [prices, setPrices] = useState<Record<string, TickerData>>({});

    const fetchApp = async(link: string): Promise<TickerData | undefined> => {
        try {
            const response = await fetch(link);
                
            if(!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        }
        catch (error) {
            console.error('Fetch operation failed:', error);
        }
    }
    useEffect(() => {
        const loadPrices = async() => {
            for(const t of tickers) {
                const tickerData = await fetchApp(`http://localhost:4000/quote/${t}`);
                if(!tickerData) {
                    continue
                }
                const specTickerData: TickerData = {
                    name_en: tickerData.name_en,
                    price: tickerData.price,
                    change: tickerData.change,
                    change_percent: tickerData.change_percent
                }
                setPrices(prev => ({...prev, [t]: specTickerData}));
            }
        }

        loadPrices();
    }, [tickers])

    return prices
}