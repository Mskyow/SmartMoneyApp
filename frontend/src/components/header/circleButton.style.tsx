import { Button, styled } from "@mui/material";

export const CircleButton = styled(Button)(({ theme }) => ({
    borderRadius: '30px', // Делаем кнопку круглой   
    fontFamily: "jsMath-cmti10", // Используемый шрифт
    fontWeight: '400',
    fontSize: '16px',
    color : 'rgb(255, 255, 255)',
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.52) -16.22%, rgba(82, 82, 82, 0.52) 34.92%)",
    // border: '1px solid rgba(95, 15, 255, 0.4)',
        '&:hover': {
          background: 'rgba(95, 15, 255, 0.4)',
          boxShadow: '0 0 10px rgba(95, 15, 255, 0.3)'
        }
    
}));