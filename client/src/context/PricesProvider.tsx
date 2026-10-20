import { useEffect, useMemo, type ReactNode } from "react";
import { usePositions } from "./usePositions";
import { usePrices } from "./usePrices";
import { useAuth } from "./Authentication/useAuth";
import { PricesContext } from "./PricesContext";


interface PricesProviderProps {
    children: ReactNode
}


export function PricesProvider( { children }: PricesProviderProps) {
    const positions = usePositions();
    const tickers = useMemo(() => positions.map((p) => p.ticker), [positions]);
    const { prices, sessionExpired, isInitialLoad } = usePrices(tickers);

    const { logout } = useAuth();
    
    useEffect(() => {
        if(sessionExpired) {
            logout("Your session expired, please log in again.");
            return;
        }
        // eslint-disable-next-line
    }, [sessionExpired])

    const contextValue = useMemo(() => ({prices, sessionExpired, isInitialLoad}), [prices, sessionExpired, isInitialLoad]);
    
    return (
        <PricesContext.Provider value={contextValue} >
            { children }
        </PricesContext.Provider>
    )
}