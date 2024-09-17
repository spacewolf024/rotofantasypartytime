import { 
    useState, 
    useEffect, 
    useCallback 
} from 'react';
import useDebounce from './useDebounce';

const useResponsive = (debounceDelay = 300) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1150);

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 1150);
    }, []);

    useDebounce(handleResize, debounceDelay);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
    
    return isMobile;
};

export default useResponsive;