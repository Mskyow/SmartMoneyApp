import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { instance } from "../../../utils/axios_instance";
import AddAddressModal from "./addAddressModal";
import { AddressEntity } from "./AddressEntity";
import { addAddressBtn } from "../styles/mainContainer/addressList/addAddressBtn.style";

export const AddressList =  () => {
  
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [watchlist, setWatchlist] = useState<IWatchList[]>([]);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
  
    useEffect(() => {
      const fetchWatchlist = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await instance.get("/watchlist/get-all-addresses", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          setWatchlist(response.data); // Обновляем состояние
        } catch (error) {
          console.error("Ошибка при загрузке watchlist:", error);
        }
      };
  
      fetchWatchlist(); // Вызываем функцию при монтировании компонента
    }, []); // Пустой массив зависимостей → выполняется 1 раз при рендере
  
    const handleAddAddress = async (newAddress : INewAddress) => {
      try {
        const token = localStorage.getItem("token"); // Достаем токен
        const response = await instance.post('/watchlist/add-address', newAddress, 
          { headers: { Authorization: `Bearer ${token}` } });
        
          if (response.status === 201) {
            const response = await instance.get("/watchlist/get-all-addresses", {
              headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.setItem('watchlist', JSON.stringify(response.data));
            setWatchlist(response.data)
          }
      } catch (error) {
        console.error("Ошибка при отправке:", error);
      }
    };
  
  
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'start' }}>
          {/* Кнопка */}
          <Box sx={{ display: 'flex', gridTemplateColumns: '220px auto', gap: 3 }}>
          
    
          {/* Динамически добавляемые элементы */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, flexDirection: 'row' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '239px' }}>
          <Button 
           onClick={handleOpenModal}
           variant="contained"
            color="primary"
            sx={addAddressBtn}
            >
              + add Solana address
            </Button>
            </Box>
            {watchlist.map((address) => (
              <AddressEntity 
              key={address.id ?? address.account_address}
              account_name={address.account_name} 
              account_address={address.account_address} 
              account_image={address.profile_image} 
              
              />
            ))}
          </Box>
  
          </Box>
              <AddAddressModal open={isModalOpen} onClose={handleCloseModal} onAddAddress={handleAddAddress} />
        </Box>
      );
    }
  