import { FC, ReactNode, createContext, useState, useEffect } from "react";

export const AuthContext = createContext<AuthContextProps | null>(null);
import { User } from "../types";

interface UserCredentials {
    username: string;
    password: string;
}

interface AuthContextProps {
    login: (username: string, password: string) => void;
    register: (username: string, password: string, name: string, bio: string, file: File) => void;
    logout: () => void; 
    setUserCredentials: (credentials: UserCredentials) => void;
    credentials: UserCredentials
    user: User | null,
    isLoggedIn: boolean;
    loading: boolean;
}

interface AuthContextProviderProps {
    children: ReactNode
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
    const [credentials, setCredentials] = useState<{ username: string, password: string }>({ username: '', password: '' });

    const setUserCredentials = (creds: { username: string, password: string }) => {
        setCredentials(creds);
    };

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



    const register = async (username: string, password: string, name: string, bio: string, file: File) => {
        try {


                const formData = new FormData();
    
                formData.append('file', file);
                formData.append('upload_preset',import.meta.env.VITE_UPLOAD_PRESETS );
    
    
                        const cloudinaryFetch = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PRESESTS_NAME}/image/upload`, {
                            method: 'POST',
                            body: formData,
                        });      
                        
                        const result = await cloudinaryFetch.json();
    
    
            const pfp = result.secure_url
    
    
          


            const res = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password, profilePic: pfp, bio, name }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }


            await login(username, password)
        } catch (error) {
            console.error('Error during registration:', error);
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
        <AuthContext.Provider value={{ login, isLoggedIn, user, loading , logout, register, setUserCredentials, credentials}}>
            {loading ? <p>Loading...</p> : children} 
        </AuthContext.Provider>
    );
};
