import { Stack } from "@mui/material";
import ReactECharts from 'echarts-for-react'
import type { ChartDataProps } from "./PerformanceChartContainer";

export default function PerformanceChart({ chartData }: ChartDataProps) {
    const option = {
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#171717',
            borderColor: '#222222',
            textStyle: {
                color: '#e2e8f0'
            }
        },
        legend: {
            data: ['Your Performance', 'TASI'],
            textStyle: { color: '#e2e8f0' },
            top: 0,         
            left: 'center',  
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: chartData.dates,
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            }
        },
        color: ['#378ADD', '#6b7a9a'],
        series: [
            {
            name: 'Your Performance',
            type: 'line',
            smooth: true,
            data: chartData.myPerformance,
            },
            {
            name: 'TASI',
            type: 'line',
            smooth: true,
            data: chartData.tasiPerformance,
            }
        ]
    };

    return (
        <Stack>
            <ReactECharts option={option} style={{ height: '400px' }} />
        </Stack>
    )
}