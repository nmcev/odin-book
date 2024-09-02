import { FC, ReactNode, createContext, useState, useEffect } from "react";

export const AuthContext = createContext<AuthContextProps | null>(null);
import { User } from "../types";

interface UserCredentials {
    username: string;
    password: string;
}

const API = import.meta.env.VITE_API
interface AuthContextProps {
    login: (username: string, password: string) => void;
    register: (username: string, password: string, name: string, bio: string, file: File) => void;
    logout: () => void; 
    setUserCredentials: (credentials: UserCredentials) => void;
    credentials: UserCredentials
    user: User | null,
    isLoggedIn: boolean;
    loading: boolean;
    loginError: string
    setUser: React.Dispatch<React.SetStateAction<User | null>>;}

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
    const [loginError, setLoginError] = useState('')

    const login = async (username: string, password: string) => {
        try {
            const res = await fetch(`${API}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                const error = await res.json();
                setLoginError(error.message);
                return;
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
            const res = await fetch(`${API}/api/logout`, {
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
    
    
          


            const res = await fetch(`${API}/api/register`, {
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
                const res = await fetch(`${API}/api/auth`, {
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
        <AuthContext.Provider value={{ login, isLoggedIn, user, loading , logout, register, setUserCredentials, credentials, loginError, setUser}}>
          
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                <div
            className="inline-block h-14 w-14 animate-spin  rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
                    </div>
                </div>
            ) :
                (
                    children
          )}
        </AuthContext.Provider>
    );
};
