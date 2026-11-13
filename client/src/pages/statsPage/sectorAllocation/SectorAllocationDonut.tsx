import { Stack } from "@mui/material";
import ReactECharts from 'echarts-for-react';
import type { AllocationItem } from "../../../widgets/portfolioValueCard/types";

interface Props {
    allocationData: AllocationItem[];
}

export default function SectorAllocationDonut({ allocationData }: Props) {
    const option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: '#171717',
            borderColor: '#222222',
            textStyle: { color: '#e2e8f0' },
            valueFormatter: (value: number) => `${value.toFixed(1)}%`,
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            textStyle: { color: '#e2e8f0' },
        },
        series: [
            {
                name: 'Sector Allocation',
                type: 'pie',
                radius: ['45%', '70%'],
                center: ['40%', '50%'],
                padAngle: 3,
                itemStyle: {
                    borderRadius: 4,
                },
                data: allocationData.map((item) => ({
                    name: item.label,
                    value: item.percent,
                    itemStyle: { color: item.color },
                })),
                label: { show: false },
                emphasis: {
                    label: { show: true, fontSize: 14, fontWeight: 'bold' },
                },
            },
        ],
    };

    return (
        <Stack>
            <ReactECharts option={option} style={{ height: '300px' }} />
        </Stack>
    );
}