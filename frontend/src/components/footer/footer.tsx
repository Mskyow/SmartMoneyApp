import React from 'react';
import { Box, Link } from '@mui/material';
import ButtonX from './twitter.button';
import ButtonLinkedIn from './linkedin.button';
import ButtonTelegram from './telegram.button';

const VerticalFooter = () => {
  return (
    <Box
      sx={{
        padding : '12px',
        backgroundColor: '#0F0315',
        borderRadius: "25px 25px 0px 0px", // Закруглённые углы
        borderTop: '1px solid #FFF',
        boxShadow: `
          0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset,
          0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset
        `,
        backdropFilter: 'blur(24px)',
        display: 'flex',
        margin: "0px", 
        //marginTop: 'auto', // Прижимаем футер к нижней части
      }}
    >
        <Box sx={{
            display : "flex",
            flexDirection : "row",
            gap : "20px",
            ml : '20px',
            padding : '0px',
            
        }}>
            <ButtonX/>
            <ButtonLinkedIn/>
            <ButtonTelegram/>
        </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
        //   padding: '0px',
          marginLeft: 'auto', // Выравниваем эту ссылку вправо
          mr:"50px",
          alignItems: 'center', // Выравниваем элементы по центру по вертикали

            
        }}
      >
        <Link
          href="#"
          sx={{
            color: '#FFF',
            textDecoration: 'none',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          sx={{
            color: '#FFF',
            textDecoration: 'none',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Privacy
        </Link>
      </Box>
    </Box>
  );
};

export default VerticalFooter;