import { 
  MantineProvider, 
  Grid,
  Table, 
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import MainContent from './MainContent';
import NavBar from './NavBar';
import  './App.css';
import '@mantine/core/styles.css';

const App = () => {

  const isMobile = !useMediaQuery('(max-width: 800px)');

  return (
    <>
      <MantineProvider defaultColorScheme="dark">
        <Grid 
          grow
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', // Stack if isMobile
            gap: '16px',
          }}
        >

          <Grid.Col span={{ base: 1, md: 'content', lg: 'content' }}>
            <NavBar
              isMobile={isMobile} 
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 'content', lg: 'content' }}>
            <MainContent isMobile={isMobile} />
          </Grid.Col>
        </Grid>
      </MantineProvider>
    </>
  );
};

export default App;
