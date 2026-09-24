import { Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider, TextField, Typography, Stack, InputAdornment, CircularProgress } from "@mui/material";
import BuySellToggle from "./BuySellToggle";
import { hideNumberFieldSpinner, numberStyles } from "../../styles/sxStyles";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from "react";
import type { Dayjs } from "dayjs";
import { useTransactions } from "../../context/useTransactions";
import { usePositions } from "../../context/usePositions";
import tickers from "../../data/tickers.json";
import dayjs from "dayjs";
import ErrorAlert from "../../shared/ErrorAlert";

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

const emptyForm: TransactionForm = {
    side: "buy",
    ticker: "",
    numberOfShares: "",
    PPS: "",
    date: null
}

export default function DialogTransaction({ open, setOpen }: Props) {
    const [transactionDetails, setTransactionDetails] = useState<TransactionForm>(emptyForm);
    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addTransaction } = useTransactions();
    const positions = usePositions();

    const toggleHandler = (_e: React.MouseEvent<HTMLElement>, newValue: "buy" | "sell" | null) => {
        if (newValue !== null) {
            setTransactionDetails({ ...transactionDetails, side: newValue })
        }
    }

    const fieldsFilled = 
        !!transactionDetails.ticker &&
        Number.isFinite(transactionDetails.numberOfShares) &&
        Number.isFinite(transactionDetails.PPS) && 
        dayjs(transactionDetails.date).isValid();

    const overallPrice = Number(transactionDetails.numberOfShares) * Number(transactionDetails.PPS) || 0;

    const handleSave = async() => {
        setIsSubmitting(true)
        setFormError(null);
        const selectedStock = positions.find(position => position.ticker === transactionDetails.ticker);

        const hasEnoughShares = 
            transactionDetails.side === "buy" ||
            (selectedStock !== undefined && selectedStock.shares >= Number(transactionDetails.numberOfShares));
        
        if(hasEnoughShares) {
            await addTransaction({
                side: transactionDetails.side,
                ticker: transactionDetails.ticker,
                numberOfShares: Number(transactionDetails.numberOfShares),
                PPS: Number(transactionDetails.PPS),
                date: transactionDetails.date?.toISOString() ?? new Date().toISOString(),
            });
            setTransactionDetails(emptyForm);
            setIsSubmitting(false);
            setOpen(false);
        }
        else {
            setFormError("You don't have the desired amount to sell");
            setIsSubmitting(false);
        }
    }
    const handleCancel = () => {
        setFormError(null);
        setTransactionDetails(emptyForm);
        setOpen(false);
    }
    return (
        <Dialog open={open}  onClose={handleCancel} fullWidth={true}>
            <DialogTitle >Add Transaction</DialogTitle>
            <Divider sx={{ mb: "20px", borderColor: "#171717" }} variant="middle"/>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "30px"}}>
                <BuySellToggle side={transactionDetails.side} toggleHandler={toggleHandler} />
                <ErrorAlert message={formError}/>
                <Stack spacing={2}>
                    <Typography variant="h3">Stock Ticker</Typography>
                    <Autocomplete
                        options={tickers}
                        getOptionLabel={(option) => `${option.ticker} - ${option.name}`}
                        filterOptions={(options, { inputValue }) =>
                            options.filter((option) => option.ticker.startsWith(inputValue))
                        }
                        value={tickers.find((t) => t.ticker === transactionDetails.ticker) ?? null}
                        onChange={(_, newValue) => {
                            setTransactionDetails({ ...transactionDetails, ticker: newValue?.ticker ?? "" });
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
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
                                endAdornment: <InputAdornment position="end">
                                    <span style={{ fontSize: "1.3em" }}>{"\u20C1 "}</span>
                                </InputAdornment>,
                            },
                            htmlInput: {
                                step: "0.01",
                                min: "0",
                            },
                        }}
                        sx={hideNumberFieldSpinner}
                    />
                    <Typography variant="caption" sx={numberStyles}>
                        The Total is: <span style={{ fontSize: "1.3em" }}>{"\u20C1 "}</span> {overallPrice.toFixed(2)}
                    </Typography>
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
                <Button onClick={handleCancel}>Cancel</Button>
                <Button 
                variant="contained" 
                onClick={handleSave} 
                disabled={!fieldsFilled || isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
                >Save</Button>
            </DialogActions>
        </Dialog>
    )
}