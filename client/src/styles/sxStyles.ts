import type { Theme } from "@mui/material/styles"

/* App */
export const mainPageStyles = {
    height: "100vh",
    display: "flex",
}

export const numberStyles = {
    fontFamily: '"JetBrains Mono", monospace',
}
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
})

export const sideBarIconsContainerStyles = {
    flex: '1', 
    justifyContent: "center", 
    '& .MuiSvgIcon-root': { fontSize: "22px", cursor: "pointer" }
} 
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
})

export const searchBarStyles = (theme: Theme) => ({
    p: '2px 4px', 
    display: 'flex', 
    alignItems: 'center', 
    width: 400, 
    backgroundColor: theme.palette.background.default,
    borderRadius: "100px",
})

export const topBarIconsContainerStyles = {
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
}

export const topBarIconsStyles = {
    fontSize: '22px', 
    display: 'block',
    margin: 0,
    padding: 0,
    verticalAlign: 'middle'
}
/* === TopBar === */