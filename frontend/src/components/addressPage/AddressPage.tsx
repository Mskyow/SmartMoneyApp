import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CircleButton } from "../header/circleButton.style";
import { Line } from "../watchlist/styles/mainContainer/line.style";
import TokenSelector from "./tokenSelector";
import CustomTable from "./CustomTable";
import { accountAddress, accountInfoPanle, accountName, balanceText, headOfPage, logoText, mainBoxinsidePage, mainBoxPage, sidebarStyles2, tokensText } from "./styles/styles";
import { useLocation } from "react-router-dom";
import {  useSelector } from "react-redux";
import { fetchBlockchainData } from "../../store/thunk";
import { useAppDispatch } from "../../utils/hook";
import { RootState } from "../../store";
import Loader from "./loader";
import VerticalHeader from "../header/header";
import VerticalFooter from "../footer/footer";

const AddressPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { account_name, account_address, account_image } :IAddressData = location.state || {};
    // const [balance,setBalance] = useState(null)
    // const [tokenList,setTokenList] = useState<ITokenListObject[]>([])
    const { balance, tokenList, loading, error } = useSelector(
        (state:RootState) => state.addresPage
      );
     useEffect(() => {
        if (!account_address) return; 
        dispatch(fetchBlockchainData(account_address));
        }, [dispatch]);

        // if (loading) return (<Loader/>);
        // if (error) return <div>Error: error</div>;
    
    return (
        <Box
          sx={mainBoxPage}
        >
            <VerticalHeader/>
    
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
                            >{
                                loading === true ? <Loader/> : balance
                            }
                            </Typography>
                            <TokenSelector tokenList={tokenList}/>
                        </Box>
                    </Box>    
                </Box>
                <Line/>
                <Box sx={{display:"flex"}}>
                {
                    loading === true ? <Loader/> : 
                    <CustomTable />
                }
                </Box>
                  
            </Box>
             
           <VerticalFooter/>
        </Box>
    );
}

export default AddressPage;