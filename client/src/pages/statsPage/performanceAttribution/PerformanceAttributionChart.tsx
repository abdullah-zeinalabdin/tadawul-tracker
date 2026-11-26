import { Stack } from "@mui/material";
import ReactECharts from 'echarts-for-react';
import type { ContributionItem } from "./deriveContributionToReturn";

interface Props {
    data: ContributionItem[];
}

export default function PerformanceAttributionChart({ data }: Props) {
    const chartData = [...data].reverse();

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: '#171717',
            borderColor: '#222222',
            textStyle: { color: '#e2e8f0' },
            valueFormatter: (value: number) => `${value.toFixed(2)}%`,
        },
        grid: {
            left: '3%',
            right: '6%',
            bottom: '3%',
            top: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: (value: number) => `${value}%`,
                color: '#94a3b8',
            },
            splitLine: {
                lineStyle: { color: '#222222' },
            },
        },
        yAxis: {
            type: 'category',
            data: chartData.map((item) => item.name),
            axisLabel: {
                color: '#e2e8f0',
                width: 160,
                overflow: 'truncate',
            },
        },
        series: [
            {
                type: 'bar',
                data: chartData.map((item) => ({
                    value: Number(item.contributionPercent.toFixed(2)),
                    itemStyle: {
                        color: item.contributionPercent >= 0 ? '#22C55E' : '#EF4444',
                        borderRadius: 3,
                    },
                })),
                barWidth: '60%',
            },
        ],
    };

    const chartHeight = Math.max(300, chartData.length * 35);

    return (
        <Stack>
            <ReactECharts option={option} style={{ height: `${chartHeight}px`, width: '100%' }} />
        </Stack>
    );
}