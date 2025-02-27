import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import { instance } from '../../utils/axios_instance';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface AddressData {
    id: string;
    account_name: string;
    account_address: string;
    profile_image?: string;
  }
  
  
interface AddAddressModalProps {
    open: boolean;
    onClose: () => void;
    onAddAddress: (address: AddressData) => void;
  }

  const AddAddressModal: React.FC<AddAddressModalProps> = ({ open, onClose, onAddAddress }) => {
    const [account_name, setName] = useState<string>('');
    const [account_address, setAddress] = useState<string>('');

    const handleSubmit = () => {
    const newAddress: AddressData = {
      id: Math.random().toString(),
      account_name,
      account_address,
    };
    onAddAddress(newAddress);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add new Solana address
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Solana Address"
          variant="outlined"
        />
        <TextField
          margin="normal"
          fullWidth
          label="Select a name for this address"
          variant="outlined"
        />
        <Button variant="contained" sx={{ mt: 2 }}>
          Choose image
        </Button>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Add address
        </Button>
      </Box>
    </Modal>
  );
}

export default AddAddressModal;
