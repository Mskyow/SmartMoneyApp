import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Typography, Box, Button, rgbToHex } from '@mui/material';

// Определяем Item вне функции
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    color: theme.palette.text.secondary,
    height: '100vh', // Растянуть на всю высоту страницы
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

// Основной компонент MainGrid
export default function MainGrid() {
    // Пример переменных, которые могут изменяться в зависимости от тарифа
    const currentCount = 0; // Замените на вашу переменную
    const maxCount = 10;    // Замените на вашу переменную

    return (
        <Item>
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', // Вертикальное выравнивание по центру
                    padding: 2, // Отступы для удобства
                    justifyContent: 'space-between' // Распределяем элементы по краям
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography  
                        component="h1"
                        variant="h4"
                        sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        WatchList
                    </Typography>
                    <Typography  
                        component="h1"
                        variant="h4"
                        sx={{ 
                            fontSize: 'clamp(1.5rem, 1vw, 2.15rem)', 
                            marginLeft: 2 ,// Добавляем отступ слева
                            color : 'rgb(108, 128, 255)'
                        }}
                    >
                        {currentCount}/{maxCount}
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" // Синий цвет
                    sx={{ marginLeft: 2 }} // Отступ слева для кнопки
                >
                    User
                </Button>
            </Box>
        </Item>
    );
}