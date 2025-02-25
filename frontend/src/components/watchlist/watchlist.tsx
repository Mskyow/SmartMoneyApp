import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { AddMoreButton, AddressStructure, Line, Rectangle, WatchListTitle } from './maingrid';
import { red } from '../auth/theme/themePrimitives';
import AppTheme from '../auth/theme/appTheme';
import AddAddressModal from './addAddressModal';
import { useState } from 'react';
import { instance } from '../../utils/axios_instance';
import { Typography } from '@mui/material';
import CircleButton from './sidebar';
import { LineAxis } from '@mui/icons-material';



const WatchList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <AppTheme>
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#000", // Чёрный фон на всю страницу
      }}
    >
      {/* Левая колонка: Ss + Маленький контейнер */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1, // Отступ между "Ss" и маленьким контейнером
        }}
      >
        <Typography
          sx={{
            color: "#FFF",
            fontFamily: "jsMath-cmti10", // Используемый шрифт
            fontSize: "64px", // Размер шрифта
            fontStyle: "Italic",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          Ss
        </Typography>

        {/* Маленький контейнер */}
        <Box
          sx={{
            width: "49px", // Фиксированная ширина
            height: "600px", // Высота, можно адаптировать
            borderRadius: "30px", // Закруглённые углы
            border: "1px solid #FFF", // Белая рамка
            background: `linear-gradient(
              180deg, 
              rgba(255, 255, 255, 0.10) 0%, 
              rgba(137, 32, 235, 0.40) 24.5%, 
              rgba(137, 32, 235, 0.40) 77.5%, 
              rgba(255, 255, 255, 0.10) 100%
            )`, // Градиентный фон
            boxShadow: `
              0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset, 
              0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset
            `, // Тени (внутренние)
            backdropFilter: "blur(24px)", // Размытие
          }}
        >
          {/* Контейнер для кнопок */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop : '20px',
              gap: "6px", // Отступ между кнопками
              
            }}
          >
            <CircleButton>1</CircleButton>
            <CircleButton>W</CircleButton>
            <CircleButton>S</CircleButton>
          </Box>
        </Box>
        
      </Box>

      {/* Большой контейнер */}
      <Box
        sx={{
          flex: 1, // Занимает всё оставшееся пространство
          height: "100vh", // Высота, можно адаптировать
          borderRadius: "30px", // Закруглённые углы
          border: "1px solid #FFF", // Белая рамка
          // opacity : '0.6',
          background: `radial-gradient(
            333.47% 130.9% at 10.74% 15.23%, 
            rgba(0, 0, 0, 0.77) 0%, 
            rgba(255, 255, 255, 0.18) 57.98%, 
            rgb(255, 255, 255) 93.9%
          )`, // Градиентный фон
          boxShadow: `
            0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset, 
            0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset
          `, // Тени (внутренние)
          backdropFilter: "blur(24px)", // Размытие
          marginLeft: 2, // Расстояние между контейнерами
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          padding: 2,
        }}
      >
          {/* Верхний блок внутри контейнера */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, padding: 2 }}>
          {/* Заголовок WatchList */}
          <WatchListTitle>WatchList</WatchListTitle>

          {/* Прямоугольник с 9/10 */}
          <Rectangle>9/10</Rectangle>

          {/* Кнопка "+ add more" */}
          <AddMoreButton>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1V14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M1 7.5L14 7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            &nbsp; add more
          </AddMoreButton> 
        </Box>
        <Line/>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, padding: 2 }}>
        <AddressStructure/>
        </Box>
        </Box>
    </Box>
    </AppTheme>
  );
};


export default WatchList;


