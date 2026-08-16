import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider, TextField, Typography, Stack, InputAdornment } from "@mui/material";
import BuySellToggle from "./BuySellToggle";
import { hideNumberFieldSpinner, numberStyles } from "../../styles/sxStyles";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface Props {
    open: boolean,
    setOpen: (value: boolean) => void
}

export default function DialogTransaction({ open, setOpen }: Props) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
            <DialogTitle >Add Transaction</DialogTitle>
            <Divider sx={{ mb: "20px", borderColor: "#171717" }} variant="middle"/>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "30px"}}>
                <BuySellToggle />
                <Stack spacing={2}>
                    <Typography variant="h3">Stock Ticker</Typography>
                    <TextField variant="outlined" slotProps={{ htmlInput: { maxLength: 4 } }} />
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="h3">Number of Shares</Typography>
                    <TextField variant="outlined" slotProps={{ htmlInput: { maxLength: 5 } }} />
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="h3">Price Per Share</Typography>
                    <TextField
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
                    <Typography variant="caption" sx={numberStyles}>{/* Placeholder Value */} The Total is: 451.3 SAR</Typography>
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="h3">Transaction Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Transaction Date" />
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