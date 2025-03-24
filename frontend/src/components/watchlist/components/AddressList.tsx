import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { instance } from "../../../utils/axios_instance";
import { addAddressBtn } from "../styles/mainContainer/addressList/addAddressBtn.style";
import AddAddressModal from "./addAddressModal";
import { AddressEntity } from "./AddressEntity";
import { IAddressData, IWatchList } from "./types/types";
interface ChildComponentProps {
    onWatchListCurrentCount: (size: number) => void;
  }
export const AddressList :  React.FC<ChildComponentProps>=  ({onWatchListCurrentCount}) => {
  
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
          onWatchListCurrentCount(response.data.length);
        } catch (error) {
          console.error("Ошибка при загрузке watchlist:", error);
        }
      };
  
      fetchWatchlist(); 
    }, []); 
  
    const handleAddAddress = async (newAddress : IAddressData) => {
      try {
        const token = localStorage.getItem("token"); // Достаем токен
        const response = await instance.post('/watchlist/add-address', newAddress, 
          { headers: { Authorization: `Bearer ${token}` } });
        
          if (response.status === 201) {
            const response = await instance.get("/watchlist/get-all-addresses", {
              headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.setItem('watchlist', JSON.stringify(response.data));
            console.log(response.data.length)
            setWatchlist(response.data)
            onWatchListCurrentCount(response.data.length);
          }
      } catch (error) {
        console.error("Ошибка при добавлении адреса:", error);
      }
    };
  
    const handleDeleteAddress = async (account_address: string) => {
        try {
          const token = localStorage.getItem("token");
          await instance.delete("/watchlist/delete-address", {
            headers: { Authorization: `Bearer ${token}` },
            data: { account_address }
          });  
      
          // Обновляем состояние watchlist, удаляя удаленный адрес
          setWatchlist(prevWatchlist => prevWatchlist.filter(address => address.account_address !== account_address));
          onWatchListCurrentCount(watchlist.length - 1); // Обновляем счетчик
        } catch (error) {
          console.error("Ошибка при удалении адреса:", error);
        }
      };

      const handleEditAddress = async (account_address: string, newName: string, newImage: string) => {
        try {
          const token = localStorage.getItem("token");
          const response = await instance.patch(
            "/watchlist/update-address",
            {  account_address, new_account_name: newName, new_account_image: newImage },
            { headers: { Authorization: `Bearer ${token}` } }
          );
      
          if (response.status === 200) {
            // Обновляем состояние watchlist
            setWatchlist(prevWatchlist =>
              prevWatchlist.map(address =>
                address.account_address === account_address
                  ? { ...address, account_name: newName, profile_image: newImage }
                  : address
              )
            );
          }
        } catch (error) {
          console.error("Ошибка при обновлении адреса:", error);
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
              onDeleteAddress={handleDeleteAddress} // Передаем функцию удаления
              onEditAddress={handleEditAddress}
              />
            ))}
          </Box>
  
          </Box>
              <AddAddressModal open={isModalOpen} onClose={handleCloseModal} onAddAddress={handleAddAddress} />
        </Box>
      );
    }
  