import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import type { AssetsPerformanceProps } from './types';
import { numberStyles, pillIndicator } from '../../styles/sxStyles';
import { Typography, useTheme } from '@mui/material';

export default function AssetsTable({ rows }: AssetsPerformanceProps ) {
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
                                <TableCell sx={numberStyles}>{(row.weight).toFixed(2)}%</TableCell>
                                <TableCell>
                                    <Typography align="center" sx={ [numberStyles, pillIndicator(theme, row.gain >= 0)] }>
                                        { row.gain >= 0 ? "+" : "" }{ (row.gain).toFixed(2) }%
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