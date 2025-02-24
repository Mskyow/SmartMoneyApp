import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import SideBarMenu from './sidebar';
import MainGrid from './maingrid';
import { red } from '../auth/theme/themePrimitives';
import AppTheme from '../auth/theme/appTheme';
import AddAddressModal from './addAddressModal';
import { useState } from 'react';
import { instance } from '../../utils/axios_instance';

interface AddressData {
  id: string;
  account_name: string;
  account_address: string;
  profile_image?: string;
}



const WatchList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [addresses, setAddresses] = React.useState<AddressData[]>([]);

  const handleAddAddress = async (newAddress: AddressData) => {
    try {
      // Отправляем данные на бэкенд через axios
      const response = await instance.post('/watchlist/add-address', {account_address :newAddress.account_address ,account_name: newAddress.account_name, account_image:'image'},{
        headers : {
          'Authorization' : `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJpYXQiOjE3NDA0Mzg2OTMsImV4cCI6MTc0MDUyNTA5M30.72yorvlLVY-IaQhoRAunLhGyNSgGGIXfVVbgUu7RLjw'}`,
          'Content-Type': 'application/json',
        }
      });

      // Обновляем состояние с новым адресом
      setAddresses((prevAddresses) => [...prevAddresses, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <AppTheme>
    <Box  sx={{ 
        flexGrow: 1, 
      
      }}>
        <AddAddressModal open={isModalOpen} onClose={handleCloseModal} onAddAddress={handleAddAddress} />
        <Grid container spacing={1} >
        <Grid size={2.5}>
          <SideBarMenu></SideBarMenu>
        </Grid>
        <Grid size={9.5}>
        <MainGrid  onAddAddressClick={handleOpenModal} addresses={addresses}/>
        </Grid>
      </Grid>
    </Box>
    </AppTheme>
  );
}


export default WatchList;


