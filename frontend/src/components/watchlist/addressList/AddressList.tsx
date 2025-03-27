import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { instance, instanceJWT } from "../../../utils/axios_instance";
import AddAddressModal from "./addAddressModal";
import { AddressEntity } from "./AddressEntity";
import { addAddressBtn } from "./styles/addAddressBtn.style";
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
          const response = await instanceJWT.get("/watchlist/get-all-addresses", {
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
        const response = await instanceJWT.post('/watchlist/add-address', newAddress, );
        
          if (response.status === 201) {
            const response = await instanceJWT.get("/watchlist/get-all-addresses", {
            });
            localStorage.setItem('watchlist', JSON.stringify(response.data));
            //console.log(response.data.length)
            setWatchlist(response.data)
            onWatchListCurrentCount(response.data.length);
          }
      } catch (error) {
        console.error("Ошибка при добавлении адреса:", error);
      }
    };
    const handleSubscribeAddress = (address: string, subscribe: boolean) => {
      // Логика подписки/отписки (например, API запрос)
    };
  
    const handleDeleteAddress = async (account_address: string) => {
        try {
          await instanceJWT.delete("/watchlist/delete-address", {
            data: { account_address }
          });  
      
          setWatchlist(prevWatchlist => prevWatchlist.filter(address => address.account_address !== account_address));
          onWatchListCurrentCount(watchlist.length - 1); // Обновляем счетчик
        } catch (error) {
          console.error("Ошибка при удалении адреса:", error);
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
              onSubscribeAddress={handleSubscribeAddress}
              />
            ))}
          </Box>
  
          </Box>
              <AddAddressModal open={isModalOpen} onClose={handleCloseModal} onAddAddress={handleAddAddress} />
        </Box>
      );
    }
  