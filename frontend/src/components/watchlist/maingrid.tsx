import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { Typography, Box, Button, TextField, IconButton } from '@mui/material';
import AddAddressModal from './addAddressModal';
import { instance } from '../../utils/axios_instance';

export const Line = styled(Box)({
    background: 'linear-gradient(90deg, #FFF 20.6%, rgba(137, 32, 235, 0.66) 40.6%, #272727 90%)',
    height: '1px',  /* Высота линии */
    width: '98%',  /* Ширина на всю доступную ширину */
    marginLeft: '15px'
})


export const WatchListTitle = styled(Typography)({
    color: "rgb(255, 255, 255) !important",
    fontFamily: "Inria Serif",
    fontSize: "42px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
  });
  
  // Стили для прямоугольника с текстом (9/10)
  export const Rectangle = styled(Box)({
    width: "59px",
    height: "37px",
    borderRadius: "20px",
    // opacity: 0.5,
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.29) 0%, rgba(144, 144, 144, 0.00) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "jsMath-cmti10",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 500,
    color: "#FFF",
  });
  
  // Стили для кнопки "+ add more"
  export const AddMoreButton = styled(Button)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    // opacity: 0.5,
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.52) -16.22%, rgba(0, 0, 0, 0.52) 34.92%)",
    padding: "5px 12px",
    color: "#FFF",
    fontFamily: "jsMath-cmti10",
    fontSize: "16px",
    fontWeight: 500,
    textTransform: "none",
  });

interface INewAddress {

    account_address: string 

    account_name: string 

    account_image: string 
}


  // const AddressEntity = ({ name  , address, image }) => {
  //   return (
  //       <Box
  //         sx={{
  //           width: '15vw',
  //           height: '8vh',
  //           flexShrink: 0,
  //           borderRadius: '10px',
  //           background: '#FFF',
  //           display: 'flex',
  //           alignItems: 'center',
  //           padding: '8px',
  //           gap: '12px',
  //           position: 'relative',
  //         }}
  //       >
  //         {/* Фото */}
  //         <Box
  //           sx={{
  //             width: '3.5vw',
  //             height: '7vh',
  //             flexShrink: 0,
  //             borderRadius: '10px',
  //             background: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xbitvBXWXb3Z86QjvGBcdvpBn5KFgrP8-g&s") center 50% / cover no-repeat',
  //           }}
  //         />
    
  //         {/* Имя и адрес */}
  //         <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
  //           <Typography
  //             sx={{
  //               color: '#000',
  //               fontFamily: '"Inria Serif"',
  //               fontSize: '23px',
  //               fontStyle: 'normal',
  //               fontWeight: 400,
  //               lineHeight: 'normal',
  //             }}
  //           >
  //           {name}
  //           </Typography>
  //           <Typography
  //             sx={{
  //               color: '#ADADAD',
  //               fontFamily: 'Inter',
  //               fontSize: '16px',
  //               fontStyle: 'normal',
  //               fontWeight: 400,
  //               lineHeight: 'normal',
  //             }}
  //           >
  //           {address}
  //           </Typography>
  //         </Box>
    
  //         {/* Три точки (кнопка) */}
  //         <IconButton
  //           sx={{
  //             position: 'absolute',
  //             top: '10px',
  //             right: '0px',
  //             padding: '4px',
  //             minWidth: "24px",
  //             minHeight: "24px",
  //             backgroundColor: 'transparent !important', // Отключаем фоновый цвет
  //             border: 'none'

  //           }}
  //         >
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             width="24"
  //             height="24"
  //             viewBox="0 0 6 25"
  //             fill="none"
  //             style={{ display: "block" }} 
  //           >
  //             <circle cx="2" cy="2" r="2" fill="black" />
  //             <circle cx="2" cy="8" r="2" fill="black" />
  //             <circle cx="2" cy="14" r="2" fill="black" />
  //           </svg>
  //         </IconButton>
  //       </Box>
  //     );
  //   };

  export const AddressStructure = () => {
    // const dispatch = useDispatch();
    // const trackedAccounts = useSelector((state) => state.user.trackedAccounts);

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddAddress = async (newAddress : INewAddress) => {
    try {
      const response = await instance.post('/watchlist/add-address', newAddress);
      
      if (response.status === 200) {
        // Обновляем Redux store
        // dispatch(addTrackedAccount(response.data));
        console.log('good')
      }
    } catch (error) {
      console.error("Ошибка при отправке:", error);
    }
  };


    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 2 }}>
        {/* Кнопка */}
        <Button 
        onClick={handleOpenModal}
        variant="contained"
        color="primary"
        sx={{
            width:'220px',
            height : '50px',
            borderRadius : '15px',
            background : 'radial-gradient(82.47% 50% at 50% 50%, rgba(25, 20, 30, 0.38) 48.6%, rgba(137, 32, 235, 0.38) 100%)',
            color : "#FFF",
            fontFamily : "Inria Serif",
            fontSize:  '20px',
            fontStyle: 'normal',
            fontWeight: '200',
            lineHeight: 'normal',
        }}
        >
          + add Solana address
        </Button>
  
        {/* Динамически добавляемые элементы */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3,
                    flexWrap: 'wrap', // Добавлено для переноса на нов
         }}>
          
        

        </Box>
            <AddAddressModal open={isModalOpen} onClose={handleCloseModal} onAddAddress={handleAddAddress} />
      </Box>
    );
  };

 