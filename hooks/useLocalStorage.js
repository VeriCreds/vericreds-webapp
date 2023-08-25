import { useState, useEffect } from "react";

export const useLocalStorage = (initialToken) => {
    const [storedToken, setStoredToken] = useState(initialToken);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenFromStorage = window.localStorage.getItem('Token');
            if (tokenFromStorage) {
                setStoredToken(tokenFromStorage);
            }
        }
    }, []);

    useEffect(() => {
        if (storedToken && typeof window !== 'undefined') {
            window.localStorage.setItem('Token', storedToken);
        }
    }, [storedToken]);

    return [storedToken, setStoredToken];
}
