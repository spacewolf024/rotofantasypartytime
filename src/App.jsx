import { useEffect, useState } from 'react';
import { MantineProvider, Grid } from '@mantine/core';
import { AppProvider } from './AppContext';
import useResponsive from './useResponsive';
import useAppContext from './useAppContext';
import MainContent from './MainContent';
import NavBar from './NavBar';
import './App.css';
import '@mantine/core/styles.css';

const Layout = () => {
  const { state, dispatch } = useAppContext();
  const isMobileQuery = useResponsive(250); 

  useEffect(() => {
    dispatch({ type: 'set_is_mobile', payload: isMobileQuery });
  }, [isMobileQuery, dispatch]);

  return (
    <Grid
      grow
      sx={{
        display: 'grid',
        gridTemplateColumns: state.isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px',
      }}
    >
      <Grid.Col span={{ base: 1, md: 'content', lg: 'content' }}>
        <NavBar />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 'content', lg: 'content' }}>
        <MainContent />
      </Grid.Col>
    </Grid>
  );
};

const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AppProvider>
        <Layout />
      </AppProvider>
    </MantineProvider>
  );
};

export default App;