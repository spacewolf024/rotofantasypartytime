import { createContext, useReducer } from 'react';
import appReducer from './AppReducer';
import { Title } from '@mantine/core';

const AppContext = createContext();

const AppProvider = ({children}) => {

    const initialState = {
        isMobile: false,
        leagueIndex: 3
    };
    
    const [state, dispatch] = useReducer(appReducer, initialState);

    const value = { state, dispatch };

    return (
        <AppContext.Provider value={value}>
            <Title>The Commissioner's Fantasy Circuit</Title>
            {children}
        </AppContext.Provider>
    );
};


export { AppContext, AppProvider }

