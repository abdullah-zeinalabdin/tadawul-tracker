import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { errorAlertStyles } from '../styles/sxStyles';
import { useTheme } from '@mui/material';

interface Props {
    message: string | null,
}

export default function ErrorAlert({ message }: Props) {
    const theme = useTheme();
    
    if(!message) {
        return null;
    }

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error" variant="outlined" sx={errorAlertStyles(theme)}>{message}</Alert>
        </Stack>
    );
}