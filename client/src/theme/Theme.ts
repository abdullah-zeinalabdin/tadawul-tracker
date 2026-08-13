import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#0d0d0d",
            paper: "#171717",
        },
        success: {
            main: '#22C55E',
        },
        error: {
            main: '#EF4444',
        },
        text: {
            primary: '#e2e8f0',
            secondary: '#6b7a9a',
        },
        divider: '#222222',
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
        h1: {
            fontSize: '28px',
            fontWeight: 600,
        },
        h2: {
            fontSize: '22px',
            fontWeight: 600,
        },
        h3: {
            fontSize: '16px',
            fontWeight: 500,
        },
        body1: {
            fontSize: '14px',
            fontWeight: 400,
        },
        body2: {
            fontSize: '12px',
            fontWeight: 400,
            color: '#6b7a9a',
        },
        caption: {
            fontSize: '12px',
            fontWeight: 400,
            color: '#6b7a9a',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
    MuiTableCell: {
        styleOverrides: {
            root: {
                borderColor: '#222222',
                color: '#e2e8f0',
                fontSize: '13px',
                padding: '20px 12px',
            },
            head: {
                color: '#6b7a9a',
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
            },
        },
    },
},
});

export default theme;