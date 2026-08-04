import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { searchBarStyles } from '../styles/sxStyles'
import { useTheme } from '@mui/material'

export default function SearchBar() {
    const theme = useTheme();
    return (
        <Paper component="form" sx={ searchBarStyles(theme) }>
            <IconButton type="button" sx={{ p: '10px', color: theme.palette.text.primary }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1, color: theme.palette.text.primary }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Paper>
    )
}
