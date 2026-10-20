import { useContext } from "react";
import { PricesContext } from "./PricesContext";

export const usePricesContext = () => {
    const context = useContext(PricesContext);
    if(context === null) {
        throw Error("Not Using Provider");
    }
    else {
        return context;
    }
}