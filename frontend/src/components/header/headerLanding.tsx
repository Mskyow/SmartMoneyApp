import { Box, Typography } from "@mui/material";
import { ButtonsLanding, headOfPage, logoText, sidebarStyles2 } from "./styles/style";
import React from "react";
import {  CircleButtonLanding } from "./circleButton.style";
import { Logo } from "../logo/logo";
import ButtonLanding from "./buttonLanding";
const VerticalHeaderLanding = ()=>{
    return(
    <Box sx={headOfPage}>
        <Logo/>

        {/* Маленький контейнер SideBar */}
        <Box
        >              
           <ButtonLanding />
        </Box>

    </Box>
)
}

export default VerticalHeaderLanding