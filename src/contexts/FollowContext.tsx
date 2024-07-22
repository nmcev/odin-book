import React, { createContext, ReactNode, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../types";

export const FollowContext = createContext<FollowContextProps| null>(null);
interface FollowContextProps {
    following: User[],
    setFollowing: React.Dispatch<React.SetStateAction<User[]>>,
    followers: User[],
    setFollowers: React.Dispatch<React.SetStateAction<User[]>>
}


interface FollowProviderProps {
    children: ReactNode;
}

export const FollowProvider: React.FC<FollowProviderProps> = ({ children }) => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user

    const [following, setFollowing] = useState<User[]>(user?.following || []);
    const [followers, setFollowers] = useState<User[]>(user?.followers || []);


    return (

        <FollowContext.Provider value={{ following, setFollowing, followers, setFollowers }}>
            {children}
        </FollowContext.Provider>
    )
    
} 