import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import type { AssetsPerformanceItem } from './types';
import { numberStyles, pillIndicator } from '../../styles/sxStyles';
import { Typography, useTheme } from '@mui/material'
const rows: AssetsPerformanceItem[] = [
    { code: "2280", name: "Almarai", weight: 21, gain: 6.5, contribution: 560 },
    { code: "7202", name: "Solutions STC", weight: 8, gain: 2.1, contribution: 258 },
    { code: "4013", name: "Al Habib", weight: 8, gain: 1.8, contribution: 632, },
    { code: "4264", name: "Flynas", weight: 10, gain: - 0.5, contribution: 87},
];

export default function AssetsTable() {
    const theme = useTheme();
    return (
        <Stack>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticker</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>P/L</TableCell>
                            <TableCell>Contribution</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.code}>
                                <TableCell component="th" scope="row" sx={numberStyles}>
                                    {row.code}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell sx={numberStyles}>{row.weight}%</TableCell>
                                <TableCell>
                                    <Typography align="center" sx={ [numberStyles, pillIndicator(theme, row.gain >= 0)] }>
                                        { row.gain >= 0 ? "+" : "" }{ row.gain }%
                                    </Typography>
                                </TableCell>
                                <TableCell  sx={numberStyles}>{row.contribution} SAR</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}