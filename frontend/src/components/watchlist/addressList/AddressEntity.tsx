import { Box, Typography, IconButton, TextField, Checkbox } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addressEntityAccountName, addressEntityPanel, addressEntityPhoto, addressEntitySaveBtn } from "./styles/addressEntity.style";
import DeleteButton from "./DeleteBtn";
import Switch from "./SubscribeButton";

export const AddressEntity = ({ account_name, account_address, account_image, onDeleteAddress,onSubscribeAddress }: IAddressEntityProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const navigate = useNavigate();
  
  const truncateAddress = (address: string, startChars: number, endChars: number) => {
    if (address.length <= startChars + endChars) {
      return address; 
    }
    return `${address.slice(0, startChars)}...`;
  };

  const truncatedAddress = truncateAddress(account_address, 12, 0);

  const handleAddressClick = async () => {
    navigate(`/watchlist/address/${account_address}`, {
      state: {
        account_name,
        account_address,
        account_image,
      }
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события, чтобы не срабатывал handleAddressClick
    onDeleteAddress(account_address);
  };

  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSubscriptionStatus = !isSubscribed;
    setIsSubscribed(newSubscriptionStatus);
    onSubscribeAddress(account_address, newSubscriptionStatus);
  }

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
      <Box sx={{ display: "flex" , flexDirection : 'column'}}>
      < Box
          onClick={handleDeleteClick}
          sx={{mb:'7px',  alignSelf: 'flex-end'}}>
          <DeleteButton/>
        </Box>
        <Box 
          onClick={handleSubscribeClick}
        
        >
        <Switch isActive={isSubscribed} /> {/* Передаем состояние в Switch */}
        </Box>
        
        
      </Box>
      
    </Box>
  );
};