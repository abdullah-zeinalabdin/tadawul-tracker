import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import type { AssetsPerformanceItem } from './types';

const rows: AssetsPerformanceItem[] = [
    { code: "2280", name: "Almarai", weight: 21, gain: 6.5 },
    { code: "7202", name: "Solutions STC", weight: 8, gain: 2.1 },
    { code: "4013", name: "Al Habib", weight: 8, gain: 1.8 },
    { code: "4264", name: "Flynas", weight: 10, gain: -0.5 },
];

export default function AssetsTable() {
    return (
        <Stack>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticker</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Weight</TableCell>
                            <TableCell align="right">Gain</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.code}>
                                <TableCell component="th" scope="row">
                                    {row.code}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.weight}%</TableCell>
                                <TableCell align="right">{row.gain}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}