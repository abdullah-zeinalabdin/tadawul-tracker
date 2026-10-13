import { useMemo, useState } from "react";
import { Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { useTransactions } from "../../context/useTransactions";
import { numberStyles, widgetsBaseStyles } from "../../styles/sxStyles";
import CompanyLogo from "../../shared/CompanyLogo";
import tickersData from "../../data/tickers.json";

const domainByTicker = new Map(
    tickersData.map((t) => [t.ticker, t.domain ?? null])
);

export default function TransactionHistoryPage() {
    const theme = useTheme();
    const { transactions } = useTransactions();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const sorted = useMemo(() => {
        return [...transactions].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, [transactions]);

    const visibleRows = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Stack sx={widgetsBaseStyles(theme)}>
            <Typography variant="h2">Transaction History</Typography>
            {sorted.length === 0 ? (
                <Typography>No transactions yet</Typography>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Ticker</TableCell>
                                    <TableCell>Shares</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {visibleRows.map((t, i) => (
                                    <TableRow key={t._id ?? `${t.ticker}-${t.date}-${i}`}>
                                        <TableCell>{dayjs(t.date).format("DD MMM YYYY")}</TableCell>
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                variant="outlined"
                                                label={t.side === "buy" ? "Buy" : "Sell"}
                                                color={t.side === "buy" ? "success" : "error"}
                                            />
                                        </TableCell>
                                        <TableCell sx={numberStyles}>
                                            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                                <CompanyLogo domain={domainByTicker.get(t.ticker) ?? ""} ticker={t.ticker} />
                                                <span>{t.ticker}</span>
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={numberStyles}>{t.numberOfShares}</TableCell>
                                        <TableCell sx={numberStyles}>
                                            <span style={{ fontSize: "1.3em" }}>{"\u20C1 "}</span>
                                            {t.PPS.toFixed(2)}
                                        </TableCell>
                                        <TableCell sx={numberStyles}>
                                            <span style={{ fontSize: "1.3em" }}>{"\u20C1 "}</span>
                                            {(t.numberOfShares * t.PPS).toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={sorted.length}
                        page={page}
                        onPageChange={(_e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[10, 25, 50]}
                    />
                </>
            )}
        </Stack>
    )
}