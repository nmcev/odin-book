import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';


type ErrorState = {
    username?: string;
    pw?: string;
};
export const SignupPage: React.FC = () => {
    const [pw, setPw] = useState('');
    const [username, setUsername] = useState('');
    const authContext = useContext(AuthContext)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({username: '', pw: ''})


    const checkUsername = async (username: string): Promise<boolean> => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${username}`);
            if (res.ok) {
                const user = await res.json();
                return !!user; 
            } else {
                throw new Error('Failed to check username');
            }
        } catch (error) {
            console.error('Error checking username:', error);
            return false;
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const errors: ErrorState = {};

        if (username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        } else {
            const isUsernameTaken = await checkUsername(username);
            if (isUsernameTaken) {
                errors.username = 'Username already taken';
            }
        }
        
        if (pw.length < 6) {
            errors.pw = 'Password must be at least 6 characters';
        }

        checkUsername(username)
        if (Object.keys(errors).length > 0 ) {
            setErrors(errors);
            return;
        }

        try {
            authContext?.setUserCredentials({ username, password: pw });
    
            navigate('/profile-setup');
        } catch (error) {
            console.error('Error setting user credentials:', error);
        }

   
    };


    if (authContext?.isLoggedIn) {
        return (
            <Navigate to={'/'}/>
        )
    }

    return (
        
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {!authContext?.isLoggedIn &&
                <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    Create your account
                </h2>
            </div>

                
                
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                autoComplete="username"
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900  dark:text-neutral-100 px-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                onChange={(e) => setPw(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-neutral-100 px-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                    
                    {errors && <p className=' text-red-500 text-sm p-2'>{errors.username}</p>}
                    {errors && <p className=' text-red-500 text-sm p-2'>{errors.pw}</p>}

                <p className="mt-10 text-center text-sm text-gray-500">
                     already have an account?{' '}
                    <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                    </a>
                </p>
            </div>
                </>
}
        </div>
    );
};
