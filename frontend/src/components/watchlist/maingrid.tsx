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
interface AddressData {
    id: string;
    account_name: string;
    account_address: string;
    profile_image?: string;
  }
interface MainGridProps {
    onAddAddressClick: () => void;
    addresses: AddressData[];
}

  
const MainGrid: React.FC<MainGridProps> = ({ onAddAddressClick, addresses }) => {
    // Пример переменных, которые могут изменяться в зависимости от тарифа
    const currentCount = addresses.length; // Замените на вашу переменную
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
            <Box>
            <Button 
                    variant="contained" 
                    onClick={onAddAddressClick}
                    color="primary" // Синий цвет
                    sx={{ marginLeft: 2,
                        background : 'rgb(74, 71, 237) !important',
                        border : 'none !important',
                        boxShadow: 'none !important',
                        transition: 'background-color 0.3s ease', // Плавный переход
                        '&:hover': {
                          backgroundColor: 'rgba(74, 71, 237, 0.8) !important', // Цвет фона при наведении
    },
                     }} 
                >
                    add Solana address
                </Button>
            </Box>
            <Box sx={{ padding: 2 }}>
                {addresses.map((address) => (
                    <Box key={address.id} sx={{ marginBottom: 2 }}>
                        <Typography>{address.account_name}</Typography>
                        <Typography>{address.profile_image}</Typography>
                    </Box>
                ))}
            </Box>
        </Item>
    );
}

export default MainGrid;
