// SettingsMenu.tsx
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { AccountCircle, Notifications } from '@mui/icons-material';
import React from 'react';

interface SettingsMenuProps {
  activeTab: 'profile' | 'notifications';
  setActiveTab: (tab: 'profile' | 'notifications') => void;
}

const SettingsMenu = ({ activeTab, setActiveTab }: SettingsMenuProps) => {
  return (
    <Paper sx={{
      p: 2,
      borderRadius: '14px',
      border: '1px solid rgba(91, 14, 240, 0.3)',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(95, 15, 255, 0.1)'
    }}>
      <List>
        <ListItemButton
          selected={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
          sx={{
            borderRadius: '8px',
            mb: 1,
            '&.Mui-selected': {
              background: 'linear-gradient(90deg, rgba(95, 15, 255, 0.3) 0%, rgba(57, 6, 84, 0.1) 100%)',
              borderLeft: '3px solid #5F0FFF',
              '&:hover': {
                background: 'linear-gradient(90deg, rgba(95, 15, 255, 0.4) 0%, rgba(57, 6, 84, 0.2) 100%)',
              },
            },
          }}
        >
          <ListItemIcon>
            <AccountCircle sx={{ 
              color: activeTab === 'profile' ? '#5F0FFF' : 'rgba(255,255,255,0.7)' 
            }} />
          </ListItemIcon>
          <ListItemText 
            primary="Profile" 
            primaryTypographyProps={{
              fontWeight: activeTab === 'profile' ? 600 : 400,
              color: activeTab === 'profile' ? '#FFF' : 'rgba(255,255,255,0.8)'
            }} 
          />
        </ListItemButton>
        
        <ListItemButton
          selected={activeTab === 'notifications'}
          onClick={() => setActiveTab('notifications')}
          sx={{
            borderRadius: '8px',
            '&.Mui-selected': {
              background: 'linear-gradient(90deg, rgba(95, 15, 255, 0.3) 0%, rgba(57, 6, 84, 0.1) 100%)',
              borderLeft: '3px solid #5F0FFF',
              '&:hover': {
                background: 'linear-gradient(90deg, rgba(95, 15, 255, 0.4) 0%, rgba(57, 6, 84, 0.2) 100%)',
              },
            },
          }}
        >
          <ListItemIcon>
            <Notifications sx={{ 
              color: activeTab === 'notifications' ? '#5F0FFF' : 'rgba(255,255,255,0.7)' 
            }} />
          </ListItemIcon>
          <ListItemText 
            primary="Notifications" 
            primaryTypographyProps={{
              fontWeight: activeTab === 'notifications' ? 600 : 400,
              color: activeTab === 'notifications' ? '#FFF' : 'rgba(255,255,255,0.8)'
            }} 
          />
        </ListItemButton>
      </List>
    </Paper>
  );
};

export default SettingsMenu;