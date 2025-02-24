import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

// Определяем Item вне функции
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    height: '100vh', // Растянуть на всю высоту страницы
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: 'hsla(238, 65.40%, 49.80%, 0.40)',
    }),
}));

// Основной компонент SidebarMenu
export default function SideBarMenu() {
    const [active, setActive] = useState(true); // Кнопка активна по умолчанию

    return (
        <Item>
            <Typography  
                component="h1"
                align='center'
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                SolanaScout
            </Typography>
            <Button
                variant="contained" 
                onClick={() => setActive(!active)} // Переключение состояния при клике
                sx={{
                    width: '150px', // Установка фиксированной ширины
                    margin: '20px auto', // Центрирование кнопки
                    backgroundColor: active ? 'rgba(64, 70, 155, 0.7) !important' : 'rgb(140, 141, 164) !important', // Цвет фона
                    color: active ? 'rgb(0, 0, 0)' : 'rgb(0, 0, 0)', // Цвет текста
                    border: 'none', // Убираем обводку
                    '&:hover': {
                        border: 'none', // Убираем обводку
                        backgroundColor: 'rgba(64, 70, 155, 0.7)', // Эффект hover
                        color: 'rgb(0, 0, 0)', // Цвет текста при hover
                    },
                }}
            >
                WatchList
            </Button>
        </Item>
    );
}