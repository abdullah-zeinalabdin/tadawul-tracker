export interface AssetsPerformanceItem {
    code: string,
    name: string,
    weight: number,
    gain: number,
    contribution: number,
}

export interface AssetsPerformanceProps {
    rows: AssetsPerformanceItem[],
}