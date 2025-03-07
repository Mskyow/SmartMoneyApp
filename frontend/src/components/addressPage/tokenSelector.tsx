import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const tokens = ['SOL', 'ETH', 'BTC', 'USDC'];

const TokenSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedToken, setSelectedToken] = useState(tokens[0]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTokenSelect = (token: React.SetStateAction<string>) => {
    setSelectedToken(token);
    handleClose();
  };

  return (
    <Box>
      <Button
      onClick={handleClick}
        sx={{
          width: '138.073px',
          height: '31.756px',
          borderRadius: '10px',
          border: '1px solid #FFF',
          backgroundColor: '#000',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          textTransform: 'none',
        }}
      >
        {selectedToken}
        <ExpandMore sx={{ color: '#FFF', marginLeft: '5px' }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#000',
            border: '1px solid #FFF',
            borderRadius: '10px',
            marginTop: '5px',
          },
        }}
      >
        {tokens.map((token) => (
          <MenuItem
            key={token}
            onClick={() => handleTokenSelect(token)}
            sx={{
              color: '#FFF',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            {token}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TokenSelector;