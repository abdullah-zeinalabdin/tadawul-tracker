import { Stack } from "@mui/material";
import ReactECharts from 'echarts-for-react'
export default function PerformanceChart() {
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]
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
            data: [0, 0.2, 0.15, 0.35, 0.5, 0.4, 0.55, 0.7, 0.6, 0.8, 0.9, 0.85, 1.0, 1.2]
            },
            {
            name: 'TASI',
            type: 'line',
            smooth: true,
            data: [0, 0.4, 0.8, 1.3, 0.9, 1.1, 0.6, 0.5, 0.8, 1.1, 1.5, 1.1, 1.3, 0.9]
            }
        ]
    };

    return (
        <Stack>
            <ReactECharts option={option} style={{ height: '400px' }} />
        </Stack>
    )
}