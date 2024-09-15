import { useEffect } from 'react';
import { MantineProvider, Grid } from '@mantine/core';
import { AppProvider } from './AppContext';
import useResponsive from './useResponsive';
import useAppContext from './useAppContext';
import MainContent from './MainContent';
import NavBar from './NavBar';
import Constants from './Constants';
import './styles/App.css';
import '@mantine/core/styles.css';

const Layout = () => {
  const { state, dispatch } = useAppContext();
  const isMobileQuery = useResponsive(250);

  useEffect(() => {
    console.log(Constants.ascii)
  }, [])

  useEffect(() => {
    dispatch({ type: 'set_is_mobile', payload: isMobileQuery });
  }, [isMobileQuery, dispatch]);

  return (
    <div
      className="container"
    >
        <NavBar/>
        <MainContent 
          className="mainContent" 
        />
    </div>
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