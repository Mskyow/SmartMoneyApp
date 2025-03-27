import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const tokens = ['SOL', 'ETH', 'BTC', 'USDC'];


const TokenSelector = ({ tokenList }: { tokenList: ITokenList }) => {
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
          border: '1px solid rgb(146, 146, 146)',
          backgroundColor: 'rgba(59, 59, 59, 0.49)',
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
        {tokenList.tokens.map((token) => (
          <MenuItem
            key={token.symbol}
            onClick={() => handleTokenSelect(token.symbol)}
            sx={{
              color: '#FFF',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
          <Box sx={{display:"flex",flexDirection : "row", padding:'10px'}}>
            <Box
              sx={{
              width: "20vw",
              height: "5vh",
              borderRadius: "10px",
                background:
              `url(${token.image})  no-repeat`,
                }}
                /*background: `url(${isEditing ? newImage : account_image}) center/cover no-repeat`*/
              />
            <Box sx={{mr:"500px"}}>
            {token.name}
            </Box>
            <Box>
              {token.balance + '$'}
            </Box>
          </Box>

          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TokenSelector;