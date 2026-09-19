export interface AssetsPerformanceItem {
    code: string,
    name: string,
    domain: string | null,
    weight: number,
    gain: number,
    contribution: number,
}

export interface AssetsPerformanceProps {
    rows: AssetsPerformanceItem[],
}

export type SortColumn = "weight" | "gain" | "contribution";
export type SortDirection = "asc" | "desc";