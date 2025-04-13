import { Button, styled } from "@mui/material";

export const CircleButton = styled(Button)(({ theme }) => ({
  fontFamily: "",
  fontWeight: '400',
  fontSize: '1.10rem',
  textTransform: 'none',
  color: 'rgb(255, 255, 255)',
  background: 'transparent',
  border: 'none',
  padding: '4px 16px',
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
  
  '&:hover': {
      color: 'rgb(112, 15, 172)',
      //background: 'rgba(95, 15, 255, 0.7)',
      //boxShadow: '0 0 10px rgba(95, 15, 255, 0.5)',
      //transform: 'scale(1.05)'
  },
  

}));

export const CircleButtonLanding = styled(Button)(({ theme }) => ({
    // Добавляем стили, чтобы сделать ее 'основной'
    backgroundColor: '#8a2be2', // Фиолетовый фон (пример)
    color: '#ffffff',          // Белый текст
    borderRadius : '40px',
    border: '1px solid #8a2be2', // Можно добавить рамку в цвет фона
    '&:hover': {
        color: 'rgb(112, 15, 172)',
        //background: 'rgba(95, 15, 255, 0.7)',
        //boxShadow: '0 0 10px rgba(95, 15, 255, 0.5)',
        //transform: 'scale(1.05)'
    },
  

}));