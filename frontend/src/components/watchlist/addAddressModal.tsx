import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import { instance } from '../../utils/axios_instance';
import { Height, Padding } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 350,
  borderRadius: '30px',
  border: '1px solid #999;',
  background:' rgba(0, 0, 0, 0.77)',
  boxShadow: '0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset, 0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset',
  backdropFilter: 'blur(24px)',
  

};

interface IAddressData {
    account_name: string;
    account_address: string;
    account_image: string;
  }
  

interface AddAddressModalProps {
    open: boolean;
    onClose: () => void;
    onAddAddress: (newAddress: IAddressData) => Promise<void>; // Добавляем onAddAddress
  }

  const AddAddressModal: React.FC<AddAddressModalProps> = ({ open, onClose,onAddAddress }) => {
    const [account_name, setName] = useState<string>('');
    const [account_address, setAddress] = useState<string>('');

    const handleSubmit = () => {
      if (!account_name || !account_address) return;
  
      const newAddress = {
        account_name,
        account_address,
        account_image: '', // Пока пусто, можно добавить загрузку
      };
  
      onAddAddress(newAddress); // Отправляем данные в родительский компонент
      setName('');
      setAddress('');
      onClose();
    };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3, 
          mt:3,
          ml:3,
          color: '#FFF',
          fontFamily: "Inria Serif",
          fontSize: '28px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}>
          Add address
        </Typography>

        {/* Контейнер для полей ввода и кнопок */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3,
          mb: 3, 
          ml:3,
          mr:3
         }}>
          <TextField
            fullWidth
            label="Solana Address"
            variant="outlined"
            value={account_address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="Select a name for this address"
            variant="outlined"
            value={account_name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Кнопка выбора картинки */}
          <Button variant="contained">
            Choose image
          </Button>

          {/* Кнопка добавления адреса */}  
          <Button variant="contained" onClick={handleSubmit}
          sx = {{
            borderRadius: '10px !important',
            border: '1px solid #000 !important',
            color: 'white !important',
            background: 'linear-gradient(90deg, #12012F 1.63%, #8920EB 30.65%, #8400FF 50.33%, #8920EB 73.44%, #12012F 100%) !important',
            boxShadow: 'none !important'
           }}
          >
            Add address
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddAddressModal;
