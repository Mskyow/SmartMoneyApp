import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

// Определяем Item вне функции
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    height: '100vh', // Растянуть на всю высоту страницы
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
                    alignSelf : 'center',  
                    width: '150px', // Установка фиксированной ширины
                    margin: 'auto', // Центрирование кнопки
                    backgroundColor: active ? 'primary.main' : 'rgba(114, 114, 114, 0.5)', // Цвет для активного состояния
                    '&:hover': {
                        backgroundColor: active ? 'primary.dark' : 'rgba(16, 27, 193, 0.7)', // Цвет при наведении
                    },
                }}
            >
                WatchList
            </Button>
        </Item>
    );
}