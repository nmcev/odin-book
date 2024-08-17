import React, { ReactNode, useContext } from 'react';
import { Navigate,  } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const authContext = useContext(AuthContext);

    if (authContext?.isLoggedIn) {
        return children;
    } else {
        return <Navigate to="/login" replace />;
    }
};
