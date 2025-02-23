import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import SideBarMenu from './sidebar';
import MainGrid from './maingrid';
import { red } from '../auth/theme/themePrimitives';
import AppTheme from '../auth/theme/appTheme';


export default function WatchList() {
  return (
    <AppTheme>
    <Box  sx={{ 
        flexGrow: 1, 
      
      }}>
      <Grid container spacing={1} >
        <Grid size={2.5}>
          <SideBarMenu></SideBarMenu>
        </Grid>
        <Grid size={9.5}>
          <MainGrid></MainGrid>
        </Grid>
      </Grid>
    </Box>
    </AppTheme>
  );
}
