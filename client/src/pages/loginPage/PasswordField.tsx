import * as React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import LockOutlined from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import type { CredsType } from '../../context/Authentication/AuthContext'


interface Props {
    password: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: CredsType) => void;
}

export default function PasswordField({ password, onChange }: Props) {
    const passwordId = React.useId()
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl variant="outlined">
            <OutlinedInput
            value={password}
            onChange={(e) => {onChange(e, "password")}}
            id={`${passwordId}-input`}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            notched={false}
            startAdornment={
                <InputAdornment position="start">
                <LockOutlined fontSize="small" />
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
            }
            inputProps={{
                'aria-label': 'password',
            }}
            sx={{
                '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                },
            }}
            />
        </FormControl>
        </Box>
    )
    }