const appReducer = (state, action) => {
    switch (action.type) {
        case 'set_is_mobile':
            return { ...state, isMobile: action.payload };
        case 'set_league': 
            return { ...state, leagueId: action.payload };
        default:
            return state;
    }
};

export default appReducer;