import { Box, Typography } from "@mui/material";
import React from "react";
import { CircleButton } from "../watchlist/styles/sidebar/circleButton.style";
import { Line } from "../watchlist/styles/mainContainer/line.style";
import TokenSelector from "./tokenSelector";
import CustomTable from "./CustomTable";
import { accountAddress, accountInfoPanle, accountName, balanceText, headOfPage, logoText, mainBoxinsidePage, mainBoxPage, sidebarStyles2, tokensText } from "./styles/styles";

const AddressPage = () => {
    console.log('sdsd')
    return (
        <Box
          sx={mainBoxPage}
        >
            <Box
                sx={headOfPage}
            >
                <Typography
                sx={logoText}
                >
                SolanaScout
                </Typography>
        
                {/* Маленький контейнер SideBar */}
                <Box
                sx={{...sidebarStyles2}} 
                >              
                    <CircleButton>1</CircleButton>
                    <CircleButton>W</CircleButton>
                    <CircleButton>S</CircleButton>
                </Box>
                
            </Box>
    
                {/*main huynya*/}
            <Box 
                sx={mainBoxinsidePage}>
                 {/*для того что сверху, картинка имя адрес и т.п.*/}
                <Box sx={{display: "flex",gap:1,flexDirection : "row",}}>
                    {/*первая колонка*/}
                    <Box sx={{display: "flex",gap:1,flexDirection : "column",}}>
                        <Box
                            sx={{
                            width: "7vw",
                            height: "14vh",
                            borderRadius: "10px",
                            background:
                            'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xbitvBXWXb3Z86QjvGBcdvpBn5KFgrP8-g&s") center/cover no-repeat',
                                }}
                                /*background: `url(${isEditing ? newImage : account_image}) center/cover no-repeat`*/
                        />

                        <Typography
                        sx={accountName}
                        >
                        MyTrader
                        </Typography>
                        <Typography
                        sx={accountAddress}
                        >
                        0x12fsadf162f6dvvd7g321f1ctccegf
                        </Typography>
                    </Box>
                    {/*Вторая колонка*/}
                    <Box 
                    sx={accountInfoPanle}>
                        <Box
                         sx={{
                            display: "flex",
                            flexDirection :"column",
                            gap:2
                         }}>
                            <Typography
                                sx={balanceText}
                            >
                                Balance
                            </Typography>
                            <Typography
                                sx={tokensText}
                                >
                                    Tokens
                                </Typography>
                        </Box>
                        <Box
                         sx={{
                            display: "flex",
                            flexDirection :"column",
                            gap:2,
                         }}>
                            <Typography
                            sx={{...tokensText,textAlign: "left",}}
                            >
                                $200
                            </Typography>
                            <TokenSelector/>
                        </Box>
                    </Box>    
                </Box>
                <Line/>

                <Box sx={{display:"flex"}}>
                    <CustomTable/>
                </Box>
            </Box>
           
        </Box>
    );
}

export default AddressPage;