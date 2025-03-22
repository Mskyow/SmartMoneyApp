import * as React from 'react';
import Box from '@mui/material/Box';
import AppTheme from '../auth/theme/appTheme';
import { mainContainerStyles } from './styles/mainContainer/mainContainer.style';
import { AddressList } from './components/AddressList';
import { WatchListTitle } from './styles/mainContainer/watchListTitle.style';
import { Rectangle } from './styles/mainContainer/limits.style';
import { AddMoreButton } from './styles/mainContainer/upgraadeLimitsBtn.style';
import { Line } from './styles/mainContainer/line.style';
import VerticalFooter from '../footer/footer';
import VerticalHeader from '../header/header';



const WatchList: React.FC = () => {
  const[currentCount,setcurrentCount] = React.useState(0);
  const[planLimit,setPlanLimit] = React.useState(10);
  const[isExpanded,setIsExpanded]= React.useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded); // Переключаем состояние
  };

   const handleWatchListCurrentCount = (size:number) =>{setcurrentCount(size)}
  return (
    <>
    
    <Box
      sx={{
        minHeight: '100vh' ,
        width: '100vw',
        display: "flex",
        backgroundColor: "#000",
        flexDirection : 'column',
        margin: 0, // Убираем отступы
        padding: 0, // Убираем отступы
      }}
    >
    <VerticalHeader/>

      {/* Большой контейнер mainContainer*/}
      <Box
        sx={mainContainerStyles}
      >
          {/* Верхний блок внутри контейнера */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, padding: 2 }}>
          {/* Заголовок WatchList */}
          <WatchListTitle>WatchList</WatchListTitle>

          {/* Прямоугольник с 9/10 */}
          <Rectangle>{currentCount}/{planLimit}</Rectangle>

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
        <AddressList onWatchListCurrentCount={handleWatchListCurrentCount}/>
        </Box>
      </Box>

       
      <VerticalFooter/>
    </Box>
    
    </>
  );
};


export default WatchList;


