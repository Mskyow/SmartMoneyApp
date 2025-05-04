import { Box, Button, FormControlLabel, Switch, Typography, Link, CircularProgress } from '@mui/material';
import { NotificationsActive, Email, Telegram } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../../store';
import { instanceJWT } from '../../../utils/axios_instance';

const NotificationsTab = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [telegramEnabled, setTelegramEnabled] = useState(user?.telegramNotify || false);
  const [botLink, setBotLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTelegramToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = e.target.checked;
    setLoading(true);
    
    try {
      // 1. Обновляем состояние на бэкенде
      const updateResponse = await instanceJWT.patch('/notification/update-tg-notification', {
        enabled: isEnabled
      });

      if (updateResponse.data) {
        setTelegramEnabled(isEnabled);
        
        // 2. Если включаем - генерируем новую ссылку
        if (isEnabled) {
          const linkResponse = await instanceJWT.get('/notification/getTg-bot-link');
          if (linkResponse.data) {
            setBotLink(linkResponse.data);
          }
        } else {
          setBotLink('');
        }
      }
    } catch (err) {
      console.error('Error updating Telegram notifications:', err);
      setError('Failed to update Telegram settings');
      // Откатываем состояние в случае ошибки
      setTelegramEnabled(!isEnabled);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <NotificationsActive fontSize="medium" />
        Notification Settings
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <Box sx={{ 
        '& .MuiFormControlLabel-root': { 
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          ml: 0,
          mr: 0,
          p: 1.5,
          borderRadius: '8px',
          background: 'rgba(30, 30, 30, 0.5)',
          '&:hover': {
            background: 'rgba(95, 15, 255, 0.1)'
          }
        } 
      }}>
        {/* ... другие настройки уведомлений ... */}
        <Typography variant="subtitle1" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
          General Notifications
        </Typography>
        
        <FormControlLabel
          control={<Switch color="primary" checked={user?.emailNotify || false} />}
          label="Email notifications"
          labelPlacement="start"
        />
        
        <FormControlLabel
          control={<Switch color="primary" defaultChecked />}
          label="Push notifications"
          labelPlacement="start"
        />
        
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, color: 'rgba(255,255,255,0.7)' }}>
          Integration Notifications
        </Typography>
        <FormControlLabel
          control={
            <Switch 
              color="primary" 
              checked={telegramEnabled}
              onChange={handleTelegramToggle}
              disabled={loading}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Telegram />
              Telegram bot
              {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
            </Box>
          }
          labelPlacement="start"
        />
        
        {telegramEnabled && botLink && (
          <Box sx={{ 
            mt: 2,
            p: 2,
            borderRadius: '8px',
            background: 'rgba(95, 15, 255, 0.1)',
            border: '1px solid rgba(95, 15, 255, 0.3)'
          }}>
            <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255,255,255,0.7)' }}>
              To connect Telegram bot:
            </Typography>
            <Link 
              href={botLink} 
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-block',
                p: 1,
                borderRadius: '4px',
                background: 'rgba(95, 15, 255, 0.2)',
                color: '#5F0FFF',
                textDecoration: 'none',
                '&:hover': {
                  background: 'rgba(95, 15, 255, 0.3)',
                  textDecoration: 'underline'
                }
              }}
            >
              Connect Telegram Bot
            </Link>
            <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}>
              After connecting, send <strong>/start</strong> command to the bot
            </Typography>
          </Box>
        )}

        {telegramEnabled && user?.telegramId && (
          <Typography variant="body2" sx={{ mt: 1, color: '#4caf50' }}>
            ✅ Telegram connected (ID: {user.telegramId})
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default NotificationsTab;