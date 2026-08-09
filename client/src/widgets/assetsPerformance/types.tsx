export interface AssetsPerformanceItem {
    code: string,
    name: string,
    weight: number,
    gain: number,
}

export interface AssetsPerformanceProps {
    assetsPerformance: AssetsPerformanceItem[],
}