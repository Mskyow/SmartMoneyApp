import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import { instance } from '../../../utils/axios_instance';
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
          fontSize: '24px',
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
            value={account_address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '& fieldset': {
                  borderColor: '#8920EB',
                },
                '&:hover fieldset': {
                  borderColor: '#B065FF',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8400FF',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgb(166, 166, 166)',
              },
              '& .MuiInputBase-input': {
                color: 'rgb(255, 255, 255)',
              },
              '& .MuiOutlinedInput-input': {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '10px',
              },
            }}
          />
          <TextField
            fullWidth
            label="Select a name for this address"
            variant="outlined"
            value={account_name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '& fieldset': {
                  borderColor: '#8920EB',
                },
                '&:hover fieldset': {
                  borderColor: '#B065FF',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8400FF',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.61)',
              },
              '& .MuiInputBase-input': {
                color: '#FFF',
              },
              '& .MuiOutlinedInput-input': {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '10px',
              },
            }}
          />

          {/* Кнопка выбора картинки */}
          <Button variant="contained"
            sx={{
              borderRadius: '10px !important',
              border: '1px solid #8920EB !important',
              color: 'white !important',
              background: 'rgba(137, 32, 235, 0.2) !important',
              '&:hover': {
                background: 'rgba(137, 32, 235, 0.4) !important',
              }
            }}>
            Choose image
          </Button>

          {/* Кнопка добавления адреса */}  
          <Button variant="contained" onClick={handleSubmit}
          sx = {{
            borderRadius: '10px !important',
            border: '1px solid #000 !important',
            color: 'white !important',
            background: 'linear-gradient(90deg, #12012F 1.63%, #8920EB 30.65%, #8400FF 50.33%, #8920EB 73.44%, #12012F 100%) !important',
            boxShadow: 'none !important',
            '&:hover': {
              background: 'linear-gradient(90deg, #12012F 1.63%, #9B4AFF 30.65%, #9D00FF 50.33%, #9B4AFF 73.44%, #12012F 100%) !important',
            }
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