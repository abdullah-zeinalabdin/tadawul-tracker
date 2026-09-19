import { useState } from "react";

const logoDev = import.meta.env.VITE_LOGO_DEV_TOKEN
const brandFetch = import.meta.env.VITE_BRANDFETCH_CLIENT_ID

interface Props {
    domain: string,
    ticker: string,
}

export default function CompanyLogo({ domain, ticker }: Props) {
    const [attempts, setAttempts] = useState(0);
    
    const sources = [
        `https://img.logo.dev/${domain}?token=${logoDev}`,
        `https://cdn.brandfetch.io/${domain}?c=${brandFetch}`,
    ]

    if(!domain || attempts >= sources.length) {
        return(<span>{ticker}</span>);
    }

    return (
        <img 
            src={sources[attempts]}
            onError={() => setAttempts(prev => prev + 1)}
            alt={ticker}
            style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                objectFit: "cover",
                backgroundColor: "#fff",
            }}
        />
    )
}