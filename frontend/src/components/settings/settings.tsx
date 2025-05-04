// Settings.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  CssBaseline, 
  Divider, 
  Grid, 
  Paper, 
  Typography,
  PaletteMode, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import SettingsMenu from './SettingsMenu';
import NotificationsTab from './notifications/NotificationsTab';
import ProfileTab from './profile/ProfileTab';


const Settings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications'>('profile');

  const theme = createTheme({
    palette: {
      mode: 'dark' as PaletteMode,
      primary: {
        main: '#5F0FFF', // яркий фиолетовый как в примере
      },
      secondary: {
        main: '#9c27b0',
      },
      background: {
        default: '#0A0A0A', // более темный фон
        paper: 'rgba(15, 15, 15, 0.8)',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  const renderTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'notifications':
        return <NotificationsTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ 
          color: 'rgba(255,255,255,0.9)',
          maxWidth: 1200,
          mx: 'auto'
        }}>
          {/* Заголовок с неоновым эффектом */}
          <Typography variant="h5" sx={{
            mb: 4,
            fontWeight: 700,
            letterSpacing: '0.5px',
            textShadow: '0 0 8px rgba(95, 15, 255, 0.5)',
            '&::before': {
              content: '""',
              display: 'inline-block',
              width: '10px',
              height: '10px',
              background: '#5F0FFF',
              borderRadius: '50%',
              mr: 1.5,
              boxShadow: '0 0 10px #5F0FFF'
            }
          }}>
            Settings
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <SettingsMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            </Grid>
            <Grid item xs={12} md={9}>
              <Paper sx={{
                p: 3,
                borderRadius: '14px',
                border: '1px solid rgba(91, 14, 240, 0.3)',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(95, 15, 255, 0.1)',
                minHeight: '60vh'
              }}>
                {renderTab()}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Settings;