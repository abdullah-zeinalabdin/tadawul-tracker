import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, TableSortLabel } from '@mui/material';
import type { AssetsPerformanceProps, SortColumn, SortDirection } from './types';
import { numberStyles } from '../../styles/sxStyles';
import PercentPill from '../../shared/PercentPill';
import { useMemo, useState } from 'react';

export default function AssetsTable({ rows }: AssetsPerformanceProps ) {
    const [sortColumn, setSortColumn] = useState<SortColumn>("weight");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

    const handleSort = (column: SortColumn) => {
        if(sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        }
        else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    }

    const sortedRows = useMemo(() => {
        return [...rows].sort((itemA, itemB) => {
            return sortDirection === "asc" ? itemA[sortColumn] - itemB[sortColumn] :  itemB[sortColumn] - itemA[sortColumn];
        })
    },[rows, sortColumn, sortDirection]);

    return (
        <Stack>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticker</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === "weight"}
                                    direction={sortColumn === "weight" ? sortDirection : "asc"}
                                    onClick={() => handleSort("weight")}
                                >
                                    Weight
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === "gain"}
                                    direction={sortColumn === "gain" ? sortDirection : "asc"}
                                    onClick={() => handleSort("gain")}
                                >
                                    P/L
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortColumn === "contribution"}
                                    direction={sortColumn === "contribution" ? sortDirection : "asc"}
                                    onClick={() => handleSort("contribution")}
                                >
                                    Contribution
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.map((row) => (
                            <TableRow key={row.code}>
                                <TableCell component="th" scope="row" sx={numberStyles}>
                                    {row.code}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell sx={numberStyles}>{(row.weight).toFixed(2)}%</TableCell>
                                <TableCell>
                                    <PercentPill value={row.gain}/>
                                </TableCell>
                                <TableCell  sx={numberStyles}>{(row.contribution).toFixed(2)} SAR</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}