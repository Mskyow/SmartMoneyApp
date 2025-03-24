import { Box, Button, IconButton, Popover, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAddressEntityProps } from "./types/types";

export const AddressEntity = ({  account_name, account_address ,account_image,onDeleteAddress,onEditAddress }:IAddressEntityProps) => {
const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event : any) => {setAnchorEl(anchorEl ? null : event.currentTarget);};
  const handleClose = () => {setAnchorEl(null);};
  const [isEditing, setIsEditing] = useState(false); // Режим редактирования
  const [newName, setNewName] = useState(account_name); // Новое имя
  const [newImage, setNewImage] = useState(account_image); // Новое изображение
  const containerRef = useRef<HTMLDivElement>(null); // Ref для отслеживания кликов внутри компонента
  const navigate = useNavigate();

  const handleAddressClick = async () => {
    navigate(`/watchlist/address/${account_address}`,
      {
      state: {
        account_name,
        account_address,
        account_image,
      }
    }
    );
  }
  const handleDeleteAddress = async () => {
    try {
       await onDeleteAddress(account_address);
        } 
        catch (error) {
        console.error("Ошибка при удалении адреса:", error);
        }
  }
  const handleEditClick = () => {
    setIsEditing(true); // Включаем режим редактирования
    handleClose(); // Закрываем Popover
  };

  const handleSaveClick = async () => {
    try {
        if (newName !== account_name || newImage !== account_image) { // подумать про пустые значения
            await onEditAddress(account_address, newName, newImage); // Отправляем изменения на бэкенд
          }
        setIsEditing(false); // Возвращаемся в режим просмотра

    } catch (error) {
      console.error("Ошибка при сохранении изменений:", error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsEditing(false);
          }
    };

    // Добавляем обработчик при монтировании компонента
    document.addEventListener("mousedown", handleClickOutside);

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
    onClick={handleAddressClick}
    ref={containerRef} // Привязываем ref к контейнеру
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
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 10px 20px rgb(112, 15, 172)", // Выпадающая тень
    },
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
        /*background: `url(${isEditing ? newImage : account_image}) center/cover no-repeat`*/
      />

      {/* Имя и адрес */}
     {/* Поля для редактирования */}
     <Box sx={{ display: "flex", flexDirection: "column", gap: "2", flexGrow: 1 }}>
        {isEditing ? (
          <>
            <TextField
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              sx={{ mb: 2, width:'100px',height:'10px' }}
            />
            <TextField
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              size="small"
              fullWidth
              sx={{ mb: 2, width:'100px',height:'10px' }}
              placeholder="Введите URL изображения"
            />
          </>
        ) : (
          <>
            <Typography sx={{ color: "black !important", fontFamily: '"Inria Serif"', fontSize: "23px", fontWeight: 400 }}>
              {account_name}
            </Typography>
            <Typography sx={{ color: "#ADADAD", fontFamily: "Inter", fontSize: "16px" }}>
              {account_address}
            </Typography>
          </>
        )}
      </Box>

      {isEditing ? <IconButton
            onClick={(e) => {
              e.stopPropagation(); 
              handleSaveClick(); // Вызываем сохранение
            }}
          sx={{
            minWidth: "24px",
            minHeight: "24px",
            backgroundColor: "rgb(166, 13, 156) !important",
            border: "none",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.8536 3.85355L5.85355 11.8536C5.65829 12.0488 5.34171 12.0488 5.14645 11.8536L2.14645 8.85355C1.95118 8.65829 1.95118 8.34171 2.14645 8.14645C2.34171 7.95118 2.65829 7.95118 2.85355 8.14645L5.5 10.7929L13.1464 3.14645C13.3417 2.95118 13.6583 2.95118 13.8536 3.14645C14.0488 3.34171 14.0488 3.65829 13.8536 3.85355Z" fill="white" />
          </svg>
        </IconButton>
        : <IconButton
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
        }

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
        onClick={(e) => {
          e.stopPropagation(); 
          handleEditClick();
        }}
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
        onClick={handleDeleteAddress}
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