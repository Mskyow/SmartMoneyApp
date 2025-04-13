import { Box, Typography } from "@mui/material";
import { ButtonsLanding, headOfPage, logoText, sidebarStyles2 } from "./styles/style";
import React from "react";
import {  CircleButtonLanding } from "./circleButton.style";
const VerticalHeaderLanding = ()=>{
    return(
    <Box sx={headOfPage}>
        <Box
        sx={logoText}
        >
        SolanaScout
        </Box>

        {/* Маленький контейнер SideBar */}
        <Box
        sx={{...ButtonsLanding}} 
        >              
            <CircleButtonLanding href="/login">Get Started</CircleButtonLanding>
           

        </Box>

    </Box>
)
}

export default VerticalHeaderLanding