import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Typography, Box, Button, TextField, IconButton } from '@mui/material';

export const Line = styled(Box)({
    background: 'linear-gradient(90deg, #FFF 20.6%, rgba(137, 32, 235, 0.66) 40.6%, #272727 90%)',
    height: '1px',  /* Высота линии */
    width: '98%',  /* Ширина на всю доступную ширину */
    marginLeft: '15px'
})


export const WatchListTitle = styled(Typography)({
    color: "rgb(255, 255, 255) !important",
    fontFamily: "Inria Serif",
    fontSize: "42px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
  });
  
  // Стили для прямоугольника с текстом (9/10)
  export const Rectangle = styled(Box)({
    width: "59px",
    height: "37px",
    borderRadius: "20px",
    // opacity: 0.5,
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.29) 0%, rgba(144, 144, 144, 0.00) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "jsMath-cmti10",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#FFF",
  });
  
  // Стили для кнопки "+ add more"
  export const AddMoreButton = styled(Button)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    // opacity: 0.5,
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.52) -16.22%, rgba(0, 0, 0, 0.52) 34.92%)",
    padding: "5px 12px",
    color: "#FFF",
    fontFamily: "jsMath-cmti10",
    fontSize: "16px",
    fontWeight: 500,
    textTransform: "none",
  });
  export const AddressEntity = () => {
    return (
        <Box
          sx={{
            width: '240px',
            height: '70px',
            flexShrink: 0,
            borderRadius: '10px',
            background: '#FFF',
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            gap: '12px',
            position: 'relative',
          }}
        >
          {/* Фото */}
          <Box
            sx={{
              width: '64px',
              height: '53px',
              flexShrink: 0,
              borderRadius: '10px',
              background: 'url("C:/Users/dimah/Downloads/images (1).jpg") lightgray 50% / cover no-repeat',
            }}
          />
    
          {/* Имя и адрес */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography
              sx={{
                color: '#000',
                fontFamily: '"Inria Serif"',
                fontSize: '26px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              Mytrader1
            </Typography>
            <Typography
              sx={{
                color: '#ADADAD',
                fontFamily: 'Inter',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
              }}
            >
              0x13fdsadess...
            </Typography>
          </Box>
    
          {/* Три точки (кнопка) */}
          <IconButton
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '4px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="16"
              viewBox="0 0 4 16"
              fill="none"
            >
              <circle cx="2" cy="2" r="2" fill="black" />
              <circle cx="2" cy="8" r="2" fill="black" />
              <circle cx="2" cy="14" r="2" fill="black" />
            </svg>
          </IconButton>
        </Box>
      );
    };

  export const AddressStructure = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 2 }}>
        {/* Кнопка */}
        <Button 
        variant="contained"
        color="primary"
        sx={{
            width:'270px',
            height : '70px',
            borderRadius : '20px',
            background : 'radial-gradient(82.47% 50% at 50% 50%, rgba(25, 20, 30, 0.38) 48.6%, rgba(137, 32, 235, 0.38) 100%)',
            color : "#FFF",
            fontFamily : "Inria Serif",
            fontSize:  '24px',
            fontStyle: 'normal',
            fontWeight: '200',
            lineHeight: 'normal',
        }}
        >
          + add Solana address
        </Button>
  
        {/* Динамически добавляемые элементы */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3,
                    flexWrap: 'wrap', // Добавлено для переноса на нов
         }}>
          
          <AddressEntity/>
          <AddressEntity/>
          <AddressEntity/>
          <AddressEntity/>
          <AddressEntity/>
          <AddressEntity/>

          {/* Добавьте больше элементов по мере необходимости */}
        </Box>
      </Box>
    );
  };

 