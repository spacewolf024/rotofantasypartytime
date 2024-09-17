import { useEffect } from 'react';
import { 
  MantineProvider, 

} from '@mantine/core';
import { AppProvider } from './Utilities/AppContext';
import useResponsive from './Hooks/useResponsive';
import useAppContext from './Hooks/useAppContext';
import MainContent from './MainContent';
import NavBar from './NavBar';
import Constants from './Utilities/Constants';
import './Styles/App.css';
import '@mantine/core/styles.css';

const Layout = () => {
  const { dispatch } = useAppContext();
  const isMobileQuery = useResponsive(250);

  useEffect(() => {

    const styles = [
      'background: rgba(129, 24, 221, 1)',
      'color: white'
  ].join(';');

    console.log(`%c${Constants.ascii}`, styles)

  }, [])

  useEffect(() => {
    dispatch({ type: 'set_is_mobile', payload: isMobileQuery });
  }, [isMobileQuery, dispatch]);

  return (
    <div
      className="container"
    >
        <NavBar/>
        <MainContent/>
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