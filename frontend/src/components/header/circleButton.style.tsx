import { Button, styled } from "@mui/material";

export const CircleButton = styled(Button)(({ theme }) => ({
    borderRadius: '20%', // Делаем кнопку круглой
    minWidth: '30px', // Минимальная ширина
    backgroundColor: 'rgb(255, 255, 255)', // Фон кнопки
    fontFamily: "jsMath-cmti10", // Используемый шрифт
    fontWeight: '900',
    fontSize: '16px',
    color: 'rgb(0,0,0) !important', // Цвет текста
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Эффект при наведении
    },
}));