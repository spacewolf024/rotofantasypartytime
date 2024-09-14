import { useState } from 'react';
import { MantineProvider, Container } from '@mantine/core';
import MainContent from './MainContent';
import NavBar from './NavBar';
import  './App.css';
import '@mantine/core/styles.css';


const App = () => {
  const [colorScheme, setColorScheme] = useState('dark');

  return (
    <>
      <MantineProvider theme={{ colorScheme }} >
          <NavBar />
          <MainContent />
      </MantineProvider>
    </>
  )
}

export default App;
