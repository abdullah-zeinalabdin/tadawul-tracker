/* App */
export const mainPageStyles = {
    height: "100vh",
    display: "flex",
    backgroundColor: "#0d0d0d",
    color: "white",
}
/* === App ===  */

/* SideBar */
export const sideBarStyles = {
    height: "100%",
    width: "70px",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 16px",
    fontSize: "22px",
    backgroundColor: "#171717",
    borderRight: "0.5px solid #222222"
}

export const sideBarIconsContainerStyles = {
    flex: '1', 
    justifyContent: "center", 
    '& .MuiSvgIcon-root': { fontSize: "22px", cursor: "pointer" }
} 
/* === SideBar === */

/* TopBar */
export const topBarStyles = {
    backgroundColor: "#171717", 
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    height: "72px",
    borderRadius: "12px",
}

export const searchBarStyles = {
    p: '2px 4px', 
    display: 'flex', 
    alignItems: 'center', 
    width: 400, 
    backgroundColor: "#0d0d0d", 
    borderRadius: "100px",
}

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