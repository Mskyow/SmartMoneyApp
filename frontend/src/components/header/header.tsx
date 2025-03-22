import { Box, Typography } from "@mui/material";
import { headOfPage, logoText, sidebarStyles2 } from "./styles/style";
import React from "react";
import { CircleButton } from "./circleButton.style";
const VerticalHeader = ()=>{
    return(
    <Box sx={headOfPage}>
        <Typography
        sx={logoText}
        >
        SolanaScout
        </Typography>

        {/* Маленький контейнер SideBar */}
        <Box
        sx={{...sidebarStyles2}} 
        >              
            <CircleButton>WatchList</CircleButton>
            <CircleButton>Settings</CircleButton>
            <CircleButton>Account</CircleButton>
        </Box>

    </Box>
)}

export default VerticalHeader