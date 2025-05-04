import { Box, Typography, TextField, IconButton, CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useState, useCallback } from "react";
import TokenSelector from "./tokenSelector";
import CustomTable from "./CustomTable";
import { mainBoxinsidePage, mainBoxPage } from "./styles/styles"; // Используем только нужные стили
import { useLocation, useNavigate } from "react-router-dom"; // Добавлен useNavigate
import { useSelector } from "react-redux";
import { fetchBlockchainData } from "../../store/thunk";
import { useAppDispatch } from "../../utils/hook";
import { RootState } from "../../store";
import Loader from "./loader";
import VerticalHeader from "../header/header";
import VerticalFooter from "../footer/footer";
import { instanceJWT } from "../../utils/axios_instance";

// Интерфейс для данных из location.state
interface IAddressData {
    account_name: string;
    account_address: string;
    account_image?: string;
}

// --- Начало: Функция для имитации/выполнения запроса к бэкенду ---
// Замените эту функцию реальным вызовом API
const updateAccountNameOnBackend = async (address: string, newName: string): Promise<boolean> => {
  
    try {
        const response = await instanceJWT.patch(`/watchlist/update-address-name/`, {
            account_address : address,
            new_account_name : newName
        })
        
        if (response.status != 200 ) 
            {throw new Error('Server error');}
        
        return true;

    } catch (error) {
        console.error("Error with name update:", error);
        return false;
    }
};


const AddressPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate(); 

    const {
        account_name: initialAccountName = "name is undefind",
        account_address = "address is undefind",
        account_image
    }: IAddressData = location.state || {};

    const { balance, tokenList, loading, error } = useSelector(
        (state: RootState) => state.addresPage
    );

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(initialAccountName);
    const [displayedName, setDisplayedName] = useState(initialAccountName);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);


    useEffect(() => {
        setEditedName(initialAccountName);
        setDisplayedName(initialAccountName);
    }, [initialAccountName]);

    const handleEditClick = () => {
        setEditedName(displayedName);
        setIsEditing(true);
        setSaveError(null);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // setEditedName(displayedName); // Можно не сбрасывать, т.к. при следующем открытии возьмется displayedName
        setSaveError(null);
    };

    const handleSaveClick = useCallback(async () => {
        const trimmedName = editedName.trim();
        if (trimmedName === displayedName || !trimmedName) {
            setIsEditing(false);
            return;
        }

        setIsSaving(true);
        setSaveError(null);
        const success = await updateAccountNameOnBackend(account_address, trimmedName);
        setIsSaving(false);

        if (success) {
            setDisplayedName(trimmedName); // Обновляем отображаемое имя
            setIsEditing(false);
            // Обновляем state в location для консистентности
            navigate(location.pathname, {
                replace: true,
                state: { ...location.state, account_name: trimmedName }
            });
        } else {
            setSaveError("Не удалось сохранить имя.");
        }
    }, [editedName, displayedName, account_address, navigate, location.pathname, location.state]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSaveClick();
        } else if (event.key === 'Escape') {
            handleCancelClick();
        }
    };


    useEffect(() => {
        if (!account_address || account_address === "Адрес не задан") return;
        dispatch(fetchBlockchainData(account_address));
    }, [dispatch, account_address]);

    return (
        <Box sx={mainBoxPage}>
            <VerticalHeader />

            <Box sx={{
                ...mainBoxinsidePage,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: '1px solid rgba(155, 155, 155, 0.42)',
                boxShadow: '0 8px 32px rgba(134, 100, 143, 0.49)',
                p: 4
            }}>
                <Box sx={{ display: "flex", gap: 4, mb: 4, alignItems: "flex-start" }}>
                    {/* Аватар (без изменений) */}
                    <Box sx={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "12px",
                        border: '2px solid rgba(95, 15, 255, 0.3)',
                        background: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xbitvBXWXb3Z86QjvGBcdvpBn5KFgrP8-g&s) center/cover no-repeat`,
                        boxShadow: '0 4px 20px rgba(95, 15, 255, 0.2)',
                        flexShrink: 0
                    }} />

                    {/* Информация об аккаунте */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}>

                        {/* --- Начало: Блок с редактируемым именем --- */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 ,minHeight: '48px' }}>
                            {isEditing ? (
                                <>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={isSaving}
                                        autoFocus
                                        error={!!saveError}
                                        helperText={saveError}
                                        sx={{
                                            '& .MuiInputBase-root': { color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' ,height: '40px' },
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {borderColor: 'rgba(255, 255, 255, 0.5)' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a370f7' },
                                            '& .MuiInputBase-input': {width:'200px'},
                                            flexGrow: 0
                                        }}
                                    />
                                    <IconButton onClick={handleSaveClick} disabled={isSaving || !editedName.trim() || editedName.trim() === displayedName} size="small" sx={{ color: '#8aff8a' }}>
                                        {isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                    </IconButton>
                                    <IconButton onClick={handleCancelClick} disabled={isSaving} size="small" sx={{ color: '#ff8a8a' }}>
                                        <CancelIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <Typography sx={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', letterSpacing: '0.5px' , textShadow: '0 2px 8px rgba(95, 15, 255, 0.3)', mr: 1 }}>
                                        {displayedName}
                                    </Typography>
                                    <IconButton onClick={handleEditClick} size="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                      

                        {/* Адрес аккаунта (без изменений) */}
                        <Typography sx={{ fontFamily: 'monospace', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                            {account_address}
                        </Typography>
                    </Box>

                    {/* Блок с балансом (без изменений) */}
                    <Box sx={{ display: "flex", gap: 4, bgcolor: 'rgba(190, 169, 204, 0.1)', p: 3, borderRadius: '12px', border: '1px solid rgba(137, 136, 139, 0.2)', minWidth: '300px' }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', fontWeight: 600 }}>Balance</Typography>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', fontWeight: 600 }}>Tokens</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography sx={{ color: 'rgb(255, 255, 255)', fontSize: '0.9rem', fontWeight: 600, textAlign: "left", minHeight: '20px' }}>
                                {loading && !balance ? <Loader /> : (balance !== null ? `${balance} SOL` : 'N/A')}
                            </Typography>
                            {loading && tokenList.total>0 ? <Loader/> : <TokenSelector tokenList={tokenList || []} />}
                        </Box>
                    </Box>
                </Box>

                {/* Разделительная линия (без изменений) */}
                <Box sx={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(143, 141, 146, 0.3) 50%, transparent 100%)', my: 4 }} />

                {/* Таблица (без изменений) */}
                <Box sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10, background: 'rgba(16, 8, 35, 0.5)' }}> <Loader /> </Box>
                    ) : error ? (
                         <Box sx={{ display: 'flex', justifyContent: 'center', py: 10, background: 'rgba(16, 8, 35, 0.5)', color: '#ff8a8a' }}>
                             Ошибка загрузки: {typeof error === 'string' ? error : 'Неизвестная ошибка'}
                         </Box>
                    ) : (
                        <CustomTable />
                    )}
                </Box>
            </Box>

            <VerticalFooter />
        </Box>
    );
}

export default AddressPage;