import { createContext, useReducer } from 'react';
import appReducer from './AppReducer';

const AppContext = createContext();

const AppProvider = ({children}) => {

    const initialState = {
        isMobile: false,
        leagueIndex: 0
    };
    
    const [state, dispatch] = useReducer(appReducer, initialState);

    const value = { state, dispatch };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};


export { AppContext, AppProvider }

