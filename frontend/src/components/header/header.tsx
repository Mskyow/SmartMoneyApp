import { Box, Typography } from "@mui/material";
import { headOfPage, logoText, sidebarStyles2 } from "./styles/style";
import React from "react";
import { CircleButton } from "./circleButton.style";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
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
            <CircleButton href="/watchlist">WatchList</CircleButton>
            <CircleButton>Settings</CircleButton>
            <CircleButton>Account</CircleButton>
            <WalletMultiButton  style={{
            height: '40px',
            padding: '0 16px',
            borderRadius: '20px',
            background: 'linear-gradient(90deg, rgba(95, 15, 255, 0.7) 0%, rgba(159, 122, 234, 0.5) 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.9rem'
        }}/>

        </Box>

    </Box>
)
}

export default VerticalHeader