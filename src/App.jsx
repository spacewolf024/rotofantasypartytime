import { MantineProvider } from '@mantine/core';
import NavBar from './navbar';
import './App.css';
import '@mantine/core/styles.css';


function App() {

  return (
    <>
      <MantineProvider >
        <div className={"page-container"}>
          <NavBar />
        </div>
      </MantineProvider>
    </>
  )
}

export default App;
