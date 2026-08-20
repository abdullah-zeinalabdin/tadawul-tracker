import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider, TextField, Typography, Stack, InputAdornment } from "@mui/material";
import BuySellToggle from "./BuySellToggle";
import { hideNumberFieldSpinner, numberStyles } from "../../styles/sxStyles";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from "react";
import type { Dayjs } from "dayjs";
interface TransactionForm {
    side: "buy" | "sell",
    ticker: string,
    numberOfShares: number | "",
    PPS: number | "",
    date: Dayjs | null
}

interface Props {
    open: boolean,
    setOpen: (value: boolean) => void
}

export default function DialogTransaction({ open, setOpen }: Props) {
    const [transactionDetails, setTransactionDetails] = useState<TransactionForm>({
        side: "buy",
        ticker: "",
        numberOfShares: "",
        PPS: "",
        date: null
    });

    const toggleHandler = (_e: React.MouseEvent<HTMLElement>, newValue: "buy" | "sell" | null) => {
        if (newValue !== null) {
            setTransactionDetails({ ...transactionDetails, side: newValue })
        }
    }

    const overallPrice = Number(transactionDetails.numberOfShares) * Number(transactionDetails.PPS) || 0;
    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
            <DialogTitle >Add Transaction</DialogTitle>
            <Divider sx={{ mb: "20px", borderColor: "#171717" }} variant="middle"/>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "30px"}}>
                <BuySellToggle side={transactionDetails.side} toggleHandler={toggleHandler} />
                <Stack spacing={2}>
                    <Typography variant="h3">Stock Ticker</Typography>
                    <TextField 
                    value={transactionDetails.ticker} 
                    onChange={(e) => {setTransactionDetails({...transactionDetails, ticker: e.target.value})}}
                    variant="outlined" 
                    slotProps={{ htmlInput: { maxLength: 4 } }}
                    />
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="h3">Number of Shares</Typography>
                    <TextField 
                    value={transactionDetails.numberOfShares}
                    onChange={(e) => {
                            const val = e.target.value
                            setTransactionDetails({...transactionDetails, numberOfShares: val === "" ? "" : +val })
                    }}
                    variant="outlined" 
                    slotProps={{ htmlInput: { maxLength: 5 } }} 
                    />
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="h3">Price Per Share</Typography>
                    <TextField
                        value={transactionDetails.PPS}
                        onChange={(e) => {
                                const val = e.target.value
                                setTransactionDetails({...transactionDetails, PPS: val === "" ? "" : +val })
                        }}
                        type="number"
                        fullWidth
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">SAR</InputAdornment>,
                            },
                            htmlInput: {
                                step: "0.01",
                                min: "0",
                            },
                        }}
                        sx={hideNumberFieldSpinner}
                    />
                    <Typography variant="caption" sx={numberStyles}>The Total is: {overallPrice} SAR</Typography>
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="h3">Transaction Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="Transaction Date"
                        value={transactionDetails.date}
                        onChange={(newDate) => {setTransactionDetails({...transactionDetails, date: newDate})}}
                        />
                    </LocalizationProvider>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    )
}