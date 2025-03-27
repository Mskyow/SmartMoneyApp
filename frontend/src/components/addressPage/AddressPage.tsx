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
    
            {/* Основной контент */}
    <Box sx={{
        ...mainBoxinsidePage,
        background: 'rgba(0, 0, 0, 0.8)', // Фиолетово-черный градиент
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '1px solid rgba(155, 155, 155, 0.42)',
        boxShadow: '0 8px 32px rgba(134, 100, 143, 0.49)',
        p: 4
    }}>
        {/* Верхняя секция с аватаром и информацией */}
        <Box sx={{
        display: "flex",
        gap: 4,
        mb: 4,
        alignItems: "flex-start"
        }}>
        {/* Аватар */}
        <Box sx={{
            width: "120px",
            height: "120px",
            borderRadius: "12px",
            border: '2px solid rgba(95, 15, 255, 0.3)',
            background: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xbitvBXWXb3Z86QjvGBcdvpBn5KFgrP8-g&s") center/cover no-repeat',
            boxShadow: '0 4px 20px rgba(95, 15, 255, 0.2)',
            flexShrink: 0
        }} />

        {/* Информация об аккаунте */}
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flexGrow: 1
        }}>
            <Typography sx={{
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.5px',
            textShadow: '0 2px 8px rgba(95, 15, 255, 0.3)'
            }}>
            {account_name}
            </Typography>
            
            <Typography sx={{
            fontFamily: 'monospace',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.9rem',
            wordBreak: 'break-all'
            }}>
            {account_address}
            </Typography>
        </Box>

        {/* Блок с балансом */}
        <Box sx={{
            display: "flex",
            gap: 4,
            bgcolor: 'rgba(190, 169, 204, 0.1)',
            p: 3,
            borderRadius: '12px',
            border: '1px solid rgba(137, 136, 139, 0.2)',
            minWidth: '300px'
        }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem',
                fontWeight: 600
            }}>
                Balance
            </Typography>
            <Typography sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem',
                fontWeight: 600
            }}>
                Tokens
            </Typography>
            </Box>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{
                color: 'rgb(255, 255, 255)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textAlign: "left"
            }}>
                {loading ? <Loader  /> : balance + ' SOL'}
            </Typography>
            <TokenSelector 
                tokenList={tokenList} 
                // sx={{
                //   '& .MuiSelect-select': {
                //     py: 1,
                //     px: 2,
                //     borderRadius: '8px',
                //     background: 'rgba(95, 15, 255, 0.2)'
                //   }
                // }}
            />
            </Box>
        </Box>
        </Box>

        {/* Разделительная линия */}
        <Box sx={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(143, 141, 146, 0.3) 50%, transparent 100%)',
        my: 4
        }} />

        {/* Таблица */}
        <Box sx={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        }}>
        {loading ? (
            <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            py: 10,
            background: 'rgba(16, 8, 35, 0.5)'
            }}>
            <Loader />
            </Box>
        ) : (
            <CustomTable />
        )}
        </Box>
    </Box>
                
            <VerticalFooter/>
            </Box>
        );
}

export default AddressPage;