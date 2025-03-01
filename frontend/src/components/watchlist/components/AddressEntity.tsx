import { Box, Typography, IconButton, Popover, Button } from "@mui/material";
import React, { useState } from "react";

export const AddressEntity = ({  account_name, account_address ,account_image }:INewAddress) => {
    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event : any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "15vw",
        height: "8vh",
        flexShrink: 0,
        borderRadius: "10px",
        background: "#FFF",
        display: "flex",
        alignItems: "center",
        padding: "8px",
        gap: "12px",
        position: "relative",
      }}
    >
      {/* Фото */}
      <Box
        sx={{
          width: "3.5vw",
          height: "7vh",
          flexShrink: 0,
          borderRadius: "10px",
          background:
            'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xbitvBXWXb3Z86QjvGBcdvpBn5KFgrP8-g&s") center/cover no-repeat',
        }}
      />

      {/* Имя и адрес */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Typography
          sx={{
            color: "black !important",
            fontFamily: '"Inria Serif"',
            fontSize: "23px",
            fontWeight: 400,
          }}
        >
          {account_name}
        </Typography>
        <Typography sx={{ color: "#ADADAD", fontFamily: "Inter", fontSize: "16px" }}>
          {account_address}
        </Typography>
      </Box>

      {/* Кнопка с тремя точками */}
      <IconButton
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: "10px",
          right: "0px",
          padding: "4px",
          minWidth: "24px",
          minHeight: "24px",
          backgroundColor: "transparent !important",
          border: "none",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 6 25" fill="none">
          <circle cx="2" cy="2" r="2" fill="black" />
          <circle cx="2" cy="8" r="2" fill="black" />
          <circle cx="2" cy="14" r="2" fill="black" />
        </svg>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: "67px",
            height: "55px",
            borderRadius: "10px",
            background: "#565656",
            display: "flex",
            flexDirection: "column",
            padding: "4px 6px",
          },
        }}
      >
        <Button
          sx={{
            color: "#FFF",
            fontFamily: "Inria Serif",
            fontSize: "12px",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 4px",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M0 6.42688V7.77781C0 7.90224 0.0977642 8 0.222191 8H1.57311C1.63088 8 1.68865 7.97778 1.72865 7.93334L6.58131 3.08513L4.91487 1.41869L0.0666575 6.26691C0.0222192 6.31135 0 6.36467 0 6.42688ZM7.87002 1.79642C8.04333 1.62311 8.04333 1.34315 7.87002 1.16984L6.83016 0.129982C6.65685 -0.0433273 6.37689 -0.0433273 6.20358 0.129982L5.39036 0.943202L7.0568 2.60964L7.87002 1.79642Z" fill="white" />
          </svg>
          Edit
        </Button>
        <Button
          sx={{
            color: "#FFF",
            fontFamily: "Inria Serif",
            fontSize: "12px",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 4px",
          }}
        >
          <svg width="7" height="9" viewBox="0 0 7 9" fill="none">
            <path d="M0.7 8.00224C0.7 8.55108 1.11996 9 1.63334 9H5.36668C5.88004 9 6.3 8.55108 6.3 8.00224V2.25H0.7V8.00224ZM7 0.75H5.25L4.66408 0H2.33594L1.75 0.75H0V1.5H7V0.75Z" fill="white" />
          </svg>
          Delete
        </Button>
      </Popover>
    </Box>
  );
};