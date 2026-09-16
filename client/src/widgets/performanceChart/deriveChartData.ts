import dayjs from "dayjs";
import type { SnapshotData } from "../../context/useSnapshots";

export interface ChartData {
    dates: string[],
    myPerformance: number[],
    tasiPerformance: number[],
}

export const deriveChartData = (snapshots: SnapshotData[]): ChartData => {
    if (snapshots.length === 0) {
        return { dates: [], myPerformance: [], tasiPerformance: [] };
    }

    const baselineTasi = snapshots[0].tasiValue;

    const dates = snapshots.map((s) => dayjs(s.date).format("MMM D"));

    const myPerformance = snapshots.map((s) => {
        return (s.unrealizedPL / s.totalCostBasis) * 100;
    });

    const tasiPerformance = snapshots.map((s) => {
        return ((s.tasiValue - baselineTasi) / baselineTasi) * 100;
    });

    return { dates, myPerformance, tasiPerformance };
};