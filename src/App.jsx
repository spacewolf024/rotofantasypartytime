import { useState } from 'react';
import { MantineProvider, Container } from '@mantine/core';
import MainContent from './MainContent';
import NavBar from './NavBar';
import  './App.css';
import '@mantine/core/styles.css';


// TODO: 
// * create global context for switching Tier variable for calls and displaying content
// * decide what info to show on each page
// * expand menus
// * make responsive
// * light mode toggle button


const App = () => {
  const [colorScheme, setColorScheme] = useState('dark');

  return (
    <>
      <MantineProvider defaultColorScheme="dark" theme={{ colorScheme }} >
        <Container>
          <NavBar />
          <MainContent />
        </Container>
         
      </MantineProvider>
    </>
  )
}

export default App;
