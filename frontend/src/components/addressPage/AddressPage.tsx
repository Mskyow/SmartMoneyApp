import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../../utils/axios_instance";
import { IAddressData } from "../watchlist/components/types/types";
import { Line } from "../watchlist/styles/mainContainer/line.style";
import { CircleButton } from "../watchlist/styles/sidebar/circleButton.style";
import CustomTable from "./CustomTable";
import { accountAddress, accountInfoPanle, accountName, balanceText, headOfPage, logoText, mainBoxinsidePage, mainBoxPage, sidebarStyles2, tokensText } from "./styles/styles";
import TokenSelector from "./tokenSelector";

const AddressPage = () => {
    const location = useLocation();
    const { account_name, account_address, account_image } :IAddressData = location.state || {};
    const [balance,setBalance] = useState(null)
     useEffect(() => {
        if (!account_address) return; 
        const fetchData = async () => { 
          try {
            const token = localStorage.getItem("token");
            const responseBalance = await instance.post("/block-chain/get-balance",{account_address},
              { headers: { Authorization: `Bearer ${token}` }});
            setBalance(responseBalance.data)
          } catch (err) {
          } finally {
          }
        }; 
       
        fetchData();
      }, []); 
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
                        {account_name}
                        </Typography>
                        <Typography
                        sx={accountAddress}
                        >
                        {account_address}
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
                                {balance}
                            </Typography>
                            <TokenSelector/>
                        </Box>
                    </Box>    
                </Box>
                <Line/>

                <Box sx={{display:"flex"}}>
                    <CustomTable />
                </Box>
            </Box>
           
        </Box>
    );
}

export default AddressPage;