import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { searchBarStyles } from '../styles/sxStyles'

export default function SearchBar() {
    return (
        <Paper component="form" sx={ searchBarStyles }>
            <IconButton type="button" sx={{ p: '10px', color: "white" }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1, color: "white" }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Paper>
    )
}
