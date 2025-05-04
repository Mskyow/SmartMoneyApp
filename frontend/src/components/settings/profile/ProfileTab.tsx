// ProfileTab.tsx
import { Box, Button, TextField, Typography } from '@mui/material';
import { AccountCircle, Email, Language, Public } from '@mui/icons-material';
import React from 'react';

const ProfileTab = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <AccountCircle fontSize="medium" />
        Profile Settings
      </Typography>
      
      <Box component="form" sx={{ 
        '& .MuiTextField-root': { 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(95, 15, 255, 0.5)',
            },
          },
        } 
      }}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          InputProps={{
            startAdornment: <AccountCircle sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }} />,
          }}
          sx={{
            '& .MuiInputLabel-root': {
              color: 'rgba(255,255,255,0.7)',
            },
            '& .MuiOutlinedInput-input': {
              color: '#FFF',
            },
          }}
        />
        
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          InputProps={{
            startAdornment: <Email sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }} />,
          }}
          sx={{
            '& .MuiInputLabel-root': {
              color: 'rgba(255,255,255,0.7)',
            },
            '& .MuiOutlinedInput-input': {
              color: '#FFF',
            },
          }}
        />
        
        <TextField
          fullWidth
          label="Website"
          variant="outlined"
          InputProps={{
            startAdornment: <Language sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }} />,
          }}
          sx={{
            '& .MuiInputLabel-root': {
              color: 'rgba(255,255,255,0.7)',
            },
            '& .MuiOutlinedInput-input': {
              color: '#FFF',
            },
          }}
        />
        
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          InputProps={{
            startAdornment: <Public sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }} />,
          }}
          sx={{
            '& .MuiInputLabel-root': {
              color: 'rgba(255,255,255,0.7)',
            },
            '& .MuiOutlinedInput-input': {
              color: '#FFF',
            },
          }}
        />
        
        <Button 
          variant="contained" 
          size="large"
          sx={{ 
            mt: 1,
            background: 'linear-gradient(90deg, #5F0FFF 0%, #9c27b0 100%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #5F0FFF 0%, #7b1fa2 100%)',
              boxShadow: '0 0 15px rgba(95, 15, 255, 0.5)'
            }
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileTab;