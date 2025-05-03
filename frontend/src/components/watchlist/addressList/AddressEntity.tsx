import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addressEntityAccountName, addressEntityPanel, addressEntityPhoto } from "./styles/addressEntity.style";
import DeleteButton from "./DeleteBtn";
import Switch from "./SubscribeButton";

export const AddressEntity = ({ account_name, account_address, account_image, onDeleteAddress, onSubscribeAddress }: IAddressEntityProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  
  const truncateAddress = (address: string, startChars: number, endChars: number) => {
    if (address.length <= startChars + endChars) return address; 
    return `${address.slice(0, startChars)}...`;
  };

  const truncatedAddress = truncateAddress(account_address, 12, 0);

  const handleAddressClick = async () => {
    navigate(`/watchlist/address/${account_address}`, {
      state: { account_name, account_address, account_image }
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteAddress(account_address);
  };

  return (
    <Box
      onClick={handleAddressClick}
      sx={addressEntityPanel}
    >
      {/* Фото */}
      <Box
        sx={{
          ...addressEntityPhoto,
          background: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xbitvBXWXb3Z86QjvGBcdvpBn5KFgrP8-g&s") center/cover no-repeat',
        }}
      />

      {/* Имя и адрес */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2", flexGrow: 1 }}>
        <Typography sx={addressEntityAccountName}>
          {account_name}
        </Typography>
        <Typography sx={{ color: "#ADADAD", fontFamily: "Inter", fontSize: "16px" }}>
          {truncatedAddress}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: 'column' }}>
        <Box onClick={handleDeleteClick} sx={{ mb: '7px', alignSelf: 'flex-end' }}>
          <DeleteButton/>
        </Box>
        
              
        {/* Измененный Switch - без дополнительного Box */}
        <Switch 
          isActive={isSubscribed} 
          onChange={(newState) => {
            setIsSubscribed(newState);
            onSubscribeAddress(account_address, newState);
          }}
          // sx={{ alignSelf: 'flex-end' }}
        />
      </Box>
    </Box>
  );
};