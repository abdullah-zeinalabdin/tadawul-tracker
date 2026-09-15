import { alpha, type Theme } from "@mui/material/styles"

/* App */
export const mainPageStyles = {
    height: "100vh",
    display: "flex",
    overflow: "hidden",
};

export const numberStyles = {
    fontFamily: '"JetBrains Mono", monospace',
};
/* === App ===  */

/* SideBar */
export const sideBarStyles = (theme: Theme) => ({
    height: "100%",
    width: "70px",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 16px",
    fontSize: "22px",
    backgroundColor: theme.palette.background.paper,
    borderRight: `0.5px solid ${theme.palette.divider}`,
});

export const sideBarIconsContainerStyles = {
    flex: '1', 
    justifyContent: "center", 
    '& .MuiSvgIcon-root': { fontSize: "22px", cursor: "pointer" }
};
/* === SideBar === */

/* TopBar */
export const topBarStyles = (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    height: "72px",
    borderRadius: `${theme.shape.borderRadius}px`,
});

export const searchBarStyles = (theme: Theme) => ({
    p: '2px 4px', 
    display: 'flex', 
    alignItems: 'center', 
    width: 400, 
    backgroundColor: theme.palette.background.default,
    borderRadius: "100px",
});

export const topBarIconsContainerStyles = {
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
};

export const topBarIconsStyles = {
    fontSize: '22px', 
    display: 'block',
    margin: 0,
    padding: 0,
    verticalAlign: 'middle'
};

export const topBarButtonStyles ={
    color: "#fff",
    textTransform: "none",
    borderRadius: "8px",
    paddingX: "16px",
};

export const dialogToggleBuySellStyles = (activeBg: string, activeHoverBg: string) => ({
    borderRadius: '999px',
    p: 0.5,
    bgcolor: '#171717',
    gap: 0.5,
    '& .MuiToggleButtonGroup-grouped': {
        border: 0,
        borderRadius: '999px !important',
        px: 3,
        py: 1,
        textTransform: 'none',
        fontWeight: 600,
        minWidth: "50%",
        color: '#6b7a9a',
        '&.Mui-selected': {
            bgcolor: activeBg,
            color: '#fff',
            '&:hover': {
                bgcolor: activeHoverBg,
            },
        },
        '&:hover': {
            bgcolor: '#222222',
        },
    },
});

export const hideNumberFieldSpinner = {
    '& input[type=number]': {
        MozAppearance: 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
};
/* === TopBar === */

/* Widgets */
export const widgetsBaseStyles = (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    padding: "25px",
    borderRadius: `${theme.shape.borderRadius}px`,
    minHeight: "500px",
});

export const pillIndicator = (theme: Theme, isPositive: boolean) => ({
    backgroundColor:  alpha(isPositive ? theme.palette.success.main : theme.palette.error.main, 0.4),
    padding: "2px 10px",
    borderRadius: "6px",
    color: "white",
    display: "inline-block",
});

export const allocationRowStyles = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20px",
};

export const todaysPerformanceCardStyles = (theme: Theme) =>  ({
    padding: "20px", 
    borderRadius: "8px",
    minWidth: "200px",
    backgroundColor: theme.palette.background.default,
});
/* === Widgets === */

/* Pages */
export const credsPageStyles = (theme: Theme) => ({
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    bgcolor: theme.palette.background.default,
});

export const credsFormStyles = (theme: Theme) => ({
    alignItems: "center",
    bgcolor: theme.palette.background.paper,
    padding: "30px",
    borderRadius: `${theme.shape.borderRadius}px`,
});
/* === Pages === */