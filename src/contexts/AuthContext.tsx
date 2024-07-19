import { FC, ReactNode, createContext, useState, useEffect } from "react";

export const AuthContext = createContext<AuthContextProps | null>(null);

interface User {
    username: string,
    bio: string,
    profilePic: string,
    name: string,
    _id: string,
}

interface AuthContextProps {
    login: (username: string, password: string) => void;
    logout: () => void; 

    user: User | null,
    isLoggedIn: boolean;
    loading: boolean;
}

interface AuthContextProviderProps {
    children: ReactNode
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | false>(false);
    const [loading, setLoading] = useState(true);

    const login = async (username: string, password: string) => {
        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setUser(data.user);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };


    const logout = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            setUser(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };



    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/auth', {
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user || null);
                    setIsLoggedIn(!!data.user);
                } else {
                    setUser(null);
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking session:', error);
                setUser(null);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    return ( 
        <AuthContext.Provider value={{ login, isLoggedIn, user, loading , logout}}>
            {loading ? <p>Loading...</p> : children} 
        </AuthContext.Provider>
    );
};
