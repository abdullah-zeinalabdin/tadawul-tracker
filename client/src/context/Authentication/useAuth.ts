import { useContext } from "react"
import { AuthContext } from "./AuthContext"

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw Error("Not Using Provider");
    }
    else {
        return context;
    }
}