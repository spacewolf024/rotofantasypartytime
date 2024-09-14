import { useEffect } from 'react';
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
      sx={{
        display: 'grid',
        gridTemplateColumns: state.isMobile ? '1fr' : '1fr 1fr', // 'auto' makes the NavBar column fit its content
        gap: '16px',
      }}
      justify="center"
    >
      <Grid.Col span={{ base: 1, md: 'content', lg: 'content' }} style={{ minWidth: 'max-content' }}>
        <NavBar />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 'content', md: 'content', lg: 'content' }} >
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