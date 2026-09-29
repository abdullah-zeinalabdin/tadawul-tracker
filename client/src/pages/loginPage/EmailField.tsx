import * as React from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import MailOutlined from '@mui/icons-material/MailOutlined'
import type { CredsType } from '../../context/Authentication/AuthContext'

interface Props {
    email: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: CredsType) => void,
}

export default function EmailField({ email, onChange }: Props) {
    const emailId = React.useId()

    const noHoverSx = {
        '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
        },
        '&:hover.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
        },
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl variant="outlined">
            <OutlinedInput
            value={email}
            onChange={(e) => {onChange(e, "email")}}
            id={`${emailId}-input`}
            placeholder="Email"
            type="email"
            notched={false}
            startAdornment={
                <InputAdornment position="start">
                <MailOutlined fontSize="small" />
                </InputAdornment>
            }
            inputProps={{
                'aria-label': 'email',
            }}
            sx={noHoverSx}
            />
        </FormControl>
        </Box>
    )
}