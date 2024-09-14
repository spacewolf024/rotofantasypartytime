import { MantineProvider, Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import MainContent from './MainContent';
import NavBar from './NavBar';
import  './App.css';
import '@mantine/core/styles.css';

const App = () => {

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <MantineProvider defaultColorScheme="dark">
        <Grid grow>
          {!isMobile && ( // Render NavBar only if not on a mobile device
            <Grid.Col span={{ base: 1, md: 'content', lg: 'content' }}>
              <NavBar />
            </Grid.Col>
          )}
          <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
            <MainContent />
          </Grid.Col>
        </Grid>
      </MantineProvider>
    </>
  );
};

export default App;
