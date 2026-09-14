import { useEffect, useState } from "react"

export interface SnapshotData {
    date: string,
    unrealizedPL: number,
    totalCostBasis: number,
    tasiValue: number,
}

export const useSnapshots = () => {
    const [snapshots, setSnapshots] = useState<SnapshotData[]>([]);

    const fetchApp = async() => {
        try {
            const response = await fetch("http://localhost:4000/snapshots", { credentials: "include" });

            if(!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const data = await response.json();

            setSnapshots(data);
        }
        catch(error) {
            console.error('Fetch operation failed:', error);
        }
    }

    useEffect(() => {
        const callFetch = async() => {
            await fetchApp();
        }
        callFetch();
    }, [])

    return snapshots;
}