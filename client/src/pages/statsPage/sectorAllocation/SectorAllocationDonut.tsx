import { Stack, Typography, Box } from "@mui/material";
import ReactECharts from 'echarts-for-react';
import type { SectorBreakdown } from "./deriveTopSectorBreakdown";
import { numberStyles } from "../../../styles/sxStyles";

interface Props {
    sector: SectorBreakdown;
}

const colorArr = ["#EF9F27", "#9F77DD", "#22C55E", "#378ADD", "#6B7280"];

export default function SectorAllocationDonut({ sector }: Props) {
    const option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: '#171717',
            borderColor: '#222222',
            textStyle: { color: '#e2e8f0' },
            valueFormatter: (value: number) => `${value.toFixed(1)}%`,
        },
        series: [
            {
                type: 'pie',
                radius: ['45%', '70%'],
                padAngle: 3,
                itemStyle: { borderRadius: 4 },
                data: sector.holdings.map((h, i) => ({
                    name: h.name,
                    value: h.percent,
                    itemStyle: { color: colorArr[i % colorArr.length] },
                })),
                label: { show: false },
                emphasis: { label: { show: true, fontSize: 12, fontWeight: 'bold' } },
            },
        ],
    };

    return (
        <Stack spacing={3} sx={{alignItems: "center"}}>
            <Typography variant="body1">
                {sector.sector}
            </Typography>

            <ReactECharts option={option} style={{ height: '260px', width: '100%' }} />

            <Typography variant="h2" sx={numberStyles}>
                {"\u20C1 "} {sector.totalValue.toFixed(2)}
            </Typography>

            <Stack spacing={0.75} sx={{ width: "100%" }}>
                {sector.holdings.map((h, i) => (
                    <Stack key={h.ticker} direction="row" sx={{alignItems: "center"}} spacing={1}>
                        <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: colorArr[i % colorArr.length], flexShrink: 0 }} />
                        <Typography variant="caption" sx={{ flex: 1 }} noWrap>
                            {h.name}
                        </Typography>
                        <Typography variant="caption" sx={numberStyles}>
                            {"\u20C1 "} {h.value.toFixed(2)}
                        </Typography>
                        <Typography variant="caption">
                            | 
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                ...numberStyles,
                                display: "inline-block",
                                minWidth: 45,
                                textAlign: "right",
                            }}
                        >
                            {h.percent.toFixed(1)}%
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}