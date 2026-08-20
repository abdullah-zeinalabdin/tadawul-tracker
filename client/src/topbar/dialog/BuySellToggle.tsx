import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Box from '@mui/material/Box'
import { dialogToggleBuySellStyles } from '../../styles/sxStyles';
import { Typography } from '@mui/material';

type Side = 'buy' | 'sell' | null;
interface Props {
    side: Side,
    toggleHandler(e: React.MouseEvent<HTMLElement>, newValue: Side) : void,
}

export default function BuySellToggle( { side, toggleHandler }: Props) {
    const isBuy = side === 'buy'
    const activeBg = isBuy ? '#22C55E' : '#EF4444'
    const activeHoverBg = isBuy ? '#1ea350' : '#d93c3c'

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: "16px" }}>
            <Typography variant="h3">Transaction Type</Typography>
            <ToggleButtonGroup
                value={side}
                exclusive
                onChange={toggleHandler}
                aria-label="Buy or sell"
                sx={ dialogToggleBuySellStyles(activeBg, activeHoverBg) }
            >
                <ToggleButton value="buy" aria-label="Buy">
                Buy
                </ToggleButton>
                <ToggleButton value="sell" aria-label="Sell">
                Sell
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    )
    }