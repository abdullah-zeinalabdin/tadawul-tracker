import { createContext } from "react";
import type { TickerData } from "./usePrices";

export interface PricesContextType {
    prices: Record<string, TickerData>,
    sessionExpired: boolean,
    isInitialLoad: boolean,
}

export const PricesContext = createContext<PricesContextType | null>(null);